import React, { Component } from 'react';

import Select from './Select';
import { handleInputChange } from './utils';
import manageState, {
  Props as SelectStateProps,
  SelectComponentType,
} from './stateManager';
import {
  OptionsType,
  InputActionMeta,
  OptionTypeBase,
  GroupTypeBase,
  GroupsType,
} from './types';
import { makeCreatableSelect } from './Creatable';

export interface AsyncProps<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>
> {
  /* The default set of options to show before the user starts searching. When
     set to `true`, the results for loadOptions('') will be autoloaded. */
  defaultOptions:
    | OptionsType<OptionType>
    | GroupsType<OptionType, GroupType>
    | boolean;
  /* If cacheOptions is truthy, then the loaded data will be cached. The cache
    will remain until `cacheOptions` changes value. */
  cacheOptions: boolean;
  /* Function that returns a promise, which is the set of options to be used
     once the promise resolves. */
  loadOptions: (
    inputValue: string,
    callback: (
      options: OptionsType<OptionType> | GroupsType<OptionType, GroupType>
    ) => void
  ) => Promise<
    OptionsType<OptionType> | GroupsType<OptionType, GroupType>
  > | void;
  /* Will cause the select to be displayed in the loading state, even if the
     Async select is not currently waiting for loadOptions to resolve */
  isLoading: boolean;
}

export type Props<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean,
  BaseComponentType extends
    | typeof Select
    | ReturnType<typeof makeCreatableSelect>
> = JSX.LibraryManagedAttributes<
  ReturnType<typeof manageState>,
  SelectStateProps<OptionType, GroupType, IsMultiType, BaseComponentType>
> &
  AsyncProps<OptionType, GroupType>;

export interface AsyncComponentType<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>
  extends Component<
    Props<OptionType, GroupType, IsMultiType, typeof Select>,
    State<OptionType, GroupType>
  > {
  focus(): void;
  blur(): void;
}

export interface AsyncCreatableComponentType<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>
  extends Component<
    Props<
      OptionType,
      GroupType,
      IsMultiType,
      ReturnType<typeof makeCreatableSelect>
    >,
    State<OptionType, GroupType>
  > {
  focus(): void;
  blur(): void;
}

export const defaultProps = {
  cacheOptions: false,
  defaultOptions: false,
  filterOption: null,
  isLoading: false,
};

export interface State<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>
> {
  defaultOptions?: OptionsType<OptionType> | GroupsType<OptionType, GroupType>;
  inputValue: string;
  isLoading: boolean;
  loadedInputValue?: string;
  loadedOptions: OptionsType<OptionType> | GroupsType<OptionType, GroupType>;
  passEmptyOptions: boolean;
}

export const makeAsyncSelect = <
  BaseComponentType extends
    | typeof Select
    | ReturnType<typeof makeCreatableSelect>
>(
  SelectComponent: ReturnType<typeof manageState>
) =>
  class Async<
    OptionType extends OptionTypeBase,
    GroupType extends GroupTypeBase<OptionType>,
    IsMultiType extends boolean = false
  > extends Component<
    Props<OptionType, GroupType, IsMultiType, BaseComponentType>,
    State<OptionType, GroupType>
  > {
    static defaultProps = defaultProps;
    select?: InstanceType<ReturnType<typeof manageState>> | null;
    lastRequest?: {};
    mounted: boolean = false;
    optionsCache: {
      [inputValue: string]:
        | OptionsType<OptionType>
        | GroupsType<OptionType, GroupType>;
    } = {};
    constructor(
      props: Props<OptionType, GroupType, IsMultiType, BaseComponentType>
    ) {
      super(props);
      this.state = {
        defaultOptions: Array.isArray(props.defaultOptions)
          ? props.defaultOptions
          : undefined,
        inputValue:
          typeof props.inputValue !== 'undefined' ? props.inputValue : '',
        isLoading: props.defaultOptions === true,
        loadedOptions: [],
        passEmptyOptions: false,
      };
    }
    componentDidMount() {
      this.mounted = true;
      const { defaultOptions } = this.props;
      const { inputValue } = this.state;
      if (defaultOptions === true) {
        this.loadOptions(inputValue, (options) => {
          if (!this.mounted) return;
          const isLoading = !!this.lastRequest;
          this.setState({ defaultOptions: options || [], isLoading });
        });
      }
    }
    UNSAFE_componentWillReceiveProps(
      nextProps: Props<OptionType, GroupType, IsMultiType, BaseComponentType>
    ) {
      // if the cacheOptions prop changes, clear the cache
      if (nextProps.cacheOptions !== this.props.cacheOptions) {
        this.optionsCache = {};
      }
      if (nextProps.defaultOptions !== this.props.defaultOptions) {
        this.setState({
          defaultOptions: Array.isArray(nextProps.defaultOptions)
            ? nextProps.defaultOptions
            : undefined,
        });
      }
    }
    componentWillUnmount() {
      this.mounted = false;
    }
    focus() {
      this.select!.focus();
    }
    blur() {
      this.select!.blur();
    }
    loadOptions(
      inputValue: string,
      callback: (
        options?: OptionsType<OptionType> | GroupsType<OptionType, GroupType>
      ) => void
    ) {
      const { loadOptions } = this.props;
      if (!loadOptions) return callback();
      const loader = loadOptions(inputValue, callback);
      if (loader && typeof loader.then === 'function') {
        loader.then(callback, () => callback());
      }
    }
    handleInputChange = (newValue: string, actionMeta: InputActionMeta) => {
      const { cacheOptions, onInputChange } = this.props;
      // TODO
      const inputValue = handleInputChange(newValue, actionMeta, onInputChange);
      if (!inputValue) {
        delete this.lastRequest;
        this.setState({
          inputValue: '',
          loadedInputValue: '',
          loadedOptions: [],
          isLoading: false,
          passEmptyOptions: false,
        });
        return;
      }
      if (cacheOptions && this.optionsCache[inputValue]) {
        this.setState({
          inputValue,
          loadedInputValue: inputValue,
          loadedOptions: this.optionsCache[inputValue],
          isLoading: false,
          passEmptyOptions: false,
        });
      } else {
        const request = (this.lastRequest = {});
        this.setState(
          {
            inputValue,
            isLoading: true,
            passEmptyOptions: !this.state.loadedInputValue,
          },
          () => {
            this.loadOptions(inputValue, (options) => {
              if (!this.mounted) return;
              if (options) {
                this.optionsCache[inputValue] = options;
              }
              if (request !== this.lastRequest) return;
              delete this.lastRequest;
              this.setState({
                isLoading: false,
                loadedInputValue: inputValue,
                loadedOptions: options || [],
                passEmptyOptions: false,
              });
            });
          }
        );
      }
      return inputValue;
    };
    render() {
      const { loadOptions, isLoading: isLoadingProp, ...props } = this.props;
      const {
        defaultOptions,
        inputValue,
        isLoading,
        loadedInputValue,
        loadedOptions,
        passEmptyOptions,
      } = this.state;
      const options = passEmptyOptions
        ? []
        : inputValue && loadedInputValue
        ? loadedOptions
        : defaultOptions || [];
      const SelectComponentCasted = (SelectComponent as unknown) as typeof SelectComponentType;
      return (
        <SelectComponentCasted
          {...props}
          ref={(ref) => {
            this.select = (ref as unknown) as InstanceType<
              ReturnType<typeof manageState>
            >;
          }}
          options={options}
          isLoading={isLoading || isLoadingProp}
          onInputChange={this.handleInputChange}
        />
      );
    }
  };

const SelectState = manageState(Select);

export default makeAsyncSelect<typeof Select>(SelectState);
