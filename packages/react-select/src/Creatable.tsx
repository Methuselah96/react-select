import React, {
  Component,
  ReactNode,
  // type Config,
  // type Node,
  // type AbstractComponent,
  // type ElementRef,
  // type ElementConfig,
} from 'react';
import Select, { Props as SelectProps } from './Select';
import type {
  OptionsType,
  ValueType,
  ActionMeta,
  OptionTypeBase,
  GroupTypeBase,
  GroupsType,
} from './types';
import { cleanValue } from './utils';
import manageState from './stateManager';
import { valueTernary } from './types';

export interface CreatableProps<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>
  extends JSX.LibraryManagedAttributes<
    typeof Select,
    SelectProps<OptionType, GroupType, IsMultiType>
  > {
  /* Allow options to be created while the `isLoading` prop is true. Useful to
     prevent the "create new ..." option being displayed while async results are
     still being loaded. */
  allowCreateWhileLoading: boolean;
  /* Sets the position of the createOption element in your options list. Defaults to 'last' */
  createOptionPosition: 'first' | 'last';
  /* Gets the label for the "create new ..." option in the menu. Is given the
     current input value. */
  formatCreateLabel: (inputValue: string) => ReactNode;
  /* Determines whether the "create new ..." option should be displayed based on
     the current input value, select value and options array. */
  isValidNewOption: (
    inputValue: string,
    selectValue: OptionsType<OptionType>,
    selectOptions: OptionsType<OptionType> | GroupsType<OptionType, GroupType>
  ) => boolean;
  /* Returns the data for the new option when it is created. Used to display the
     value, and is passed to `onChange`. */
  getNewOptionData: (inputValue: string, optionLabel: ReactNode) => OptionType;
  /* If provided, this will be called with the input value when a new option is
     created, and `onChange` will **not** be called. Use this when you need more
     control over what happens when new options are created. */
  onCreateOption?: (inputValue: string) => void;
  /* Name of the HTML Input (optional - without this, no input will be rendered) */
  name?: string;
  options?: OptionsType<OptionType> | GroupsType<OptionType, GroupType>;
  inputValue: string;
  value: ValueType<OptionType, IsMultiType>;
  isLoading?: boolean;
  isMulti?: IsMultiType;
  onChange: (
    newValue: ValueType<OptionType, IsMultiType>,
    actionMeta: ActionMeta<OptionType>
  ) => void;
}

const compareOption = <OptionType extends OptionTypeBase>(
  inputValue = '',
  option: OptionType
) => {
  const candidate = String(inputValue).toLowerCase();
  const optionValue = String(option.value).toLowerCase();
  const optionLabel = String(option.label).toLowerCase();
  return optionValue === candidate || optionLabel === candidate;
};

const builtins = {
  formatCreateLabel: (inputValue: string) => `Create "${inputValue}"`,
  isValidNewOption: <OptionType extends OptionTypeBase>(
    inputValue: string,
    selectValue: OptionsType<OptionType>,
    selectOptions: OptionsType<OptionType>
  ) =>
    !(
      !inputValue ||
      selectValue.some((option) => compareOption(inputValue, option)) ||
      selectOptions.some((option) => compareOption(inputValue, option))
    ),
  getNewOptionData: (inputValue: string, optionLabel: ReactNode) => ({
    label: optionLabel,
    value: inputValue,
    __isNew__: true,
  }),
};

export const defaultProps = {
  allowCreateWhileLoading: false,
  createOptionPosition: 'last',
  ...builtins,
};

interface State<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>
> {
  newOption: OptionType | GroupType | void;
  options: OptionsType<OptionType> | GroupsType<OptionType, GroupType>;
}

export const makeCreatableSelect = <
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>(
  SelectComponent: typeof Select
) =>
  class Creatable extends Component<
    CreatableProps<OptionType, GroupType, IsMultiType>,
    State<OptionType, GroupType>
  > {
    static defaultProps = defaultProps;
    select?: Select<OptionType, GroupType, IsMultiType>;
    constructor(props: CreatableProps<OptionType, GroupType, IsMultiType>) {
      super(props);
      const options = props.options || [];
      this.state = {
        newOption: undefined,
        options: options,
      };
    }
    UNSAFE_componentWillReceiveProps(
      nextProps: CreatableProps<OptionType, GroupType, IsMultiType>
    ) {
      const {
        allowCreateWhileLoading,
        createOptionPosition,
        formatCreateLabel,
        getNewOptionData,
        inputValue,
        isLoading,
        isValidNewOption,
        value,
      } = nextProps;
      const options = nextProps.options || [];
      let { newOption } = this.state;
      if (isValidNewOption(inputValue, cleanValue(value), options)) {
        newOption = getNewOptionData(inputValue, formatCreateLabel(inputValue));
      } else {
        newOption = undefined;
      }
      this.setState({
        newOption: newOption,
        options:
          (allowCreateWhileLoading || !isLoading) && newOption
            ? createOptionPosition === 'first'
              ? [newOption, ...options]
              : [...options, newOption]
            : options,
      });
    }
    onChange = (
      newValue: ValueType<OptionType, IsMultiType>,
      actionMeta: ActionMeta<OptionType>
    ) => {
      const {
        getNewOptionData,
        inputValue,
        isMulti,
        onChange,
        onCreateOption,
        value,
        name,
      } = this.props;
      if (actionMeta.action !== 'select-option') {
        return onChange(newValue, actionMeta);
      }
      const { newOption } = this.state;
      const valueArray = Array.isArray(newValue) ? newValue : [newValue];

      if (valueArray[valueArray.length - 1] === newOption) {
        if (onCreateOption) onCreateOption(inputValue);
        else {
          const newOptionData = getNewOptionData(inputValue, inputValue);
          const newActionMeta: ActionMeta<OptionType> = {
            action: 'create-option',
            name,
          };
          onChange(
            valueTernary<OptionType, IsMultiType>(
              isMulti!,
              [...cleanValue(value), newOptionData],
              newOptionData
            ),
            newActionMeta
          );
        }
        return;
      }
      onChange(newValue, actionMeta);
    };
    focus() {
      this.select!.focus();
    }
    blur() {
      this.select!.blur();
    }
    render() {
      const { options } = this.state;
      return (
        <SelectComponent
          {...this.props}
          ref={(ref) => {
            this.select = ref;
          }}
          options={options}
          onChange={this.onChange}
        />
      );
    }
  };

// TODO: do this in package entrypoint
const SelectCreatable = makeCreatableSelect(Select);

export default manageState(SelectCreatable);
