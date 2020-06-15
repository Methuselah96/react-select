import React, {
  Component,
  ComponentClass,
  ComponentProps,
  ComponentType,
} from 'react';

import {
  ActionMeta,
  GroupTypeBase,
  InputActionMeta,
  OptionTypeBase,
  ValueType,
} from './types';
import Select from './Select';
import { makeCreatableSelect } from './Creatable';

type BaseComponentProps<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean,
  BaseComponentType extends
    | typeof Select
    | ReturnType<typeof makeCreatableSelect>
> = Omit<
  JSX.LibraryManagedAttributes<
    BaseComponentType,
    ComponentProps<BaseComponentType>
  >,
  | 'inputValue'
  | 'menuIsOpen'
  | 'onChange'
  | 'onInputChange'
  | 'onMenuClose'
  | 'onMenuOpen'
  | 'value'
>;

export interface StateMangerProps<
  OptionType extends OptionTypeBase,
  IsMultiType extends boolean
> {
  defaultInputValue: string;
  defaultMenuIsOpen: boolean;
  defaultValue: ValueType<OptionType, IsMultiType>;
  inputValue?: string;
  menuIsOpen?: boolean;
  onChange?: (
    value: ValueType<OptionType, IsMultiType>,
    actionMeta: ActionMeta<OptionType>
  ) => void;
  onInputChange?: (newValue: string, actionMeta: InputActionMeta) => void;
  onMenuClose?: () => void;
  onMenuOpen?: () => void;
  value?: ValueType<OptionType, IsMultiType>;
}

export type Props<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean,
  BaseComponentType extends
    | typeof Select
    | ReturnType<typeof makeCreatableSelect>
> = BaseComponentProps<OptionType, GroupType, IsMultiType, BaseComponentType> &
  StateMangerProps<OptionType, IsMultiType>;

export interface State<
  OptionType extends OptionTypeBase,
  IsMultiType extends boolean
> {
  inputValue: string;
  menuIsOpen: boolean;
  value: ValueType<OptionType, IsMultiType>;
}

export interface SelectElementRef<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>
  extends ComponentClass<
    Props<OptionType, GroupType, IsMultiType, typeof Select>,
    State<OptionType, IsMultiType>
  > {}

export const defaultProps = {
  defaultInputValue: '',
  defaultMenuIsOpen: false,
  defaultValue: null,
};

const manageState = <
  BaseComponentType extends
    | typeof Select
    | ReturnType<typeof makeCreatableSelect>
>(
  SelectComponent: BaseComponentType
) =>
  class StateManager<
    OptionType extends OptionTypeBase,
    GroupType extends GroupTypeBase<OptionType>,
    IsMultiType extends boolean
  > extends Component<
    Props<OptionType, GroupType, IsMultiType, BaseComponentType>,
    State<OptionType, IsMultiType>
  > {
    static defaultProps = defaultProps;

    select?: Select<OptionType, GroupType, IsMultiType> | null;

    state: State<OptionType, IsMultiType> = {
      inputValue:
        this.props.inputValue !== undefined
          ? this.props.inputValue
          : this.props.defaultInputValue,
      menuIsOpen: (this.props.menuIsOpen !== undefined
        ? this.props.menuIsOpen
        : this.props.defaultMenuIsOpen) as boolean,
      value:
        this.props.value !== undefined
          ? this.props.value
          : this.props.defaultValue,
    };
    focus() {
      this.select!.focus();
    }
    blur() {
      this.select!.blur();
    }
    getProp<Key extends keyof State<OptionType, IsMultiType>>(
      key: Key
    ): State<OptionType, IsMultiType>[Key];
    getProp<
      Key extends
        | keyof Props<OptionType, GroupType, IsMultiType, BaseComponentType>
        | keyof State<OptionType, IsMultiType>
    >(key: Key) {
      return this.props[key] !== undefined
        ? this.props[key]
        : this.state[key as keyof State<OptionType, IsMultiType>];
    }
    callProp<
      Key extends keyof Props<
        OptionType,
        GroupType,
        IsMultiType,
        BaseComponentType
      >
    >(name: Key, ...args: any) {
      if (typeof this.props[name] === 'function') {
        return (this.props[name] as any)(...args);
      }
    }
    onChange = (
      value: ValueType<OptionType, IsMultiType>,
      actionMeta: ActionMeta<OptionType>
    ) => {
      this.callProp('onChange', value, actionMeta);
      this.setState({ value });
    };
    onInputChange = (value: string, actionMeta: InputActionMeta) => {
      // TODO: for backwards compatibility, we allow the prop to return a new
      // value, but now inputValue is a controllable prop we probably shouldn't
      const newValue = this.callProp('onInputChange', value, actionMeta);
      this.setState({
        inputValue: newValue !== undefined ? newValue : value,
      });
    };
    onMenuOpen = () => {
      this.callProp('onMenuOpen');
      this.setState({ menuIsOpen: true });
    };
    onMenuClose = () => {
      this.callProp('onMenuClose');
      this.setState({ menuIsOpen: false });
    };
    render() {
      const {
        defaultInputValue,
        defaultMenuIsOpen,
        defaultValue,
        ...props
      } = this.props;
      const CastedSelectComponent = SelectComponent as ComponentType<any>;
      return (
        <CastedSelectComponent
          {...props}
          ref={(ref: Select<OptionType, GroupType, IsMultiType> | null) => {
            this.select = ref;
          }}
          inputValue={this.getProp('inputValue')}
          menuIsOpen={this.getProp('menuIsOpen')}
          onChange={this.onChange}
          onInputChange={this.onInputChange}
          onMenuClose={this.onMenuClose}
          onMenuOpen={this.onMenuOpen}
          value={this.getProp('value')}
        />
      );
    }
  };

export default manageState;
