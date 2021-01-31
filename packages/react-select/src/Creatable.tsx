import React, { Component, ReactNode } from 'react';
import Select, { Props as SelectProps } from './Select';
import {
  ActionMeta,
  CleanValue,
  GroupBase,
  OnChangeValue,
  Options,
  OptionBase,
} from './types';
import { cleanValue } from './utils';
import manageState from './stateManager';

export interface CreatableProps<
  Option extends OptionBase,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>
  extends JSX.LibraryManagedAttributes<
    typeof Select,
    SelectProps<Option, IsMulti, Group>
  > {
  /**
   * Allow options to be created while the `isLoading` prop is true. Useful to
   * prevent the "create new ..." option being displayed while async results are
   * still being loaded. */
  allowCreateWhileLoading: boolean;
  /** Sets the position of the createOption element in your options list. Defaults to 'last' */
  createOptionPosition: 'first' | 'last';
  /**
   * Gets the label for the "create new ..." option in the menu. Is given the
   * current input value.
   */
  formatCreateLabel: (inputValue: string) => ReactNode;
  /**
   * Determines whether the "create new ..." option should be displayed based on
   * the current input value, select value and options array.
   */
  isValidNewOption: (
    inputValue: string,
    value: CleanValue<Option>,
    options: Options<Option, Group>
  ) => boolean;
  /**
   * Returns the data for the new option when it is created. Used to display the
   * value, and is passed to `onChange`.
   */
  getNewOptionData: (inputValue: string, optionLabel: ReactNode) => Option;
  /**
   * If provided, this will be called with the input value when a new option is
   * created, and `onChange` will **not** be called. Use this when you need more
   * control over what happens when new options are created.
   */
  onCreateOption?: (inputValue: string) => void;
  isLoading?: boolean;
}

const compareOption = (inputValue = '', option: OptionBase) => {
  const candidate = String(inputValue).toLowerCase();
  const optionValue = String(option.value).toLowerCase();
  const optionLabel = String(option.label).toLowerCase();
  return optionValue === candidate || optionLabel === candidate;
};

const builtins = {
  formatCreateLabel: (inputValue: string) => `Create "${inputValue}"`,
  isValidNewOption: (
    inputValue: string,
    selectValue: CleanValue<OptionBase>,
    selectOptions: Options<OptionBase, GroupBase<OptionBase>>
  ) =>
    !(
      !inputValue ||
      selectValue.some(option => compareOption(inputValue, option)) ||
      selectOptions.some(option => compareOption(inputValue, option))
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

interface State<Option extends OptionBase, Group extends GroupBase<Option>> {
  newOption: Option | undefined;
  options: Options<Option, Group>;
}

export const makeCreatableSelect = (SelectComponent: typeof Select) =>
  class Creatable<
    Option extends OptionBase,
    IsMulti extends boolean,
    Group extends GroupBase<Option>
  > extends Component<
    CreatableProps<Option, IsMulti, Group>,
    State<Option, Group>
  > {
    static defaultProps = defaultProps;
    select?: Select<Option, IsMulti, Group> | null;
    state: State<Option, Group> = {
      newOption: undefined,
      options: this.props.options || [],
    };
    static getDerivedStateFromProps(
      props: CreatableProps<OptionBase, boolean, GroupBase<OptionBase>>,
      state: State<OptionBase, GroupBase<OptionBase>>
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
      } = props;
      const options = props.options || [];
      let { newOption } = state;
      if (isValidNewOption(inputValue, cleanValue(value), options)) {
        newOption = getNewOptionData(inputValue, formatCreateLabel(inputValue));
      } else {
        newOption = undefined;
      }
      return {
        newOption: newOption,
        options:
          (allowCreateWhileLoading || !isLoading) && newOption
            ? createOptionPosition === 'first'
              ? [newOption, ...options]
              : [...options, newOption]
            : options,
      };
    }
    onChange = (
      newValue: OnChangeValue<Option, IsMulti>,
      actionMeta: ActionMeta<Option>
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
          const newActionMeta = { action: 'create-option', name };
          if (isMulti) {
            onChange([...cleanValue(value), newOptionData], newActionMeta);
          } else {
            onChange(newOptionData, newActionMeta);
          }
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
          ref={ref => {
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
