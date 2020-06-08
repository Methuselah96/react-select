// import type { Ref } from 'react';

import { CSSObject } from '@emotion/core';
import { StylesProps } from './styles';
import { Props as SelectProps } from './Select';
import {
  ContainerClassNamesState,
  IndicatorsClassNamesState,
  ValueContainerClassNamesState,
} from './components/containers';
import { ControlClassNamesState } from './components/Control';
import {
  GroupClassNamesState,
  GroupHeadingClassNamesState,
} from './components/Group';
import {
  ClearIndicatorClassNamesState,
  DropdownIndicatorClassNamesState,
  IndicatorSeparatorClassNamesState,
  LoadingIndicatorClassNamesState,
} from './components/indicators';
import { InputClassNamesState } from './components/Input';
import {
  LoadingMessageClassNamesState,
  MenuClassNamesState,
  MenuListClassNamesState,
  NoOptionsMessageClassNamesState,
} from './components/Menu';
import {
  MultiValueClassNamesState,
  MultiValueLabelClassNamesState,
  MultiValueRemoveClassNamesState,
} from './components/MultiValue';
import { OptionClassNamesState } from './components/Option';
import { PlaceholderClassNamesState } from './components/Placeholder';
import { SingleValueClassNamesState } from './components/SingleValue';

export interface OptionTypeBase {
  label?: string;
  value?: string;
  isDisabled?: boolean;
}

export type OptionsType<
  OptionType extends OptionTypeBase
> = readonly OptionType[];

export interface GroupTypeBase<OptionType extends OptionTypeBase> {
  label?: string;
  options: OptionsType<OptionType>;
}

export type GroupsType<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>
> = readonly GroupType[];

export function isGroup<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>
>(item: OptionType | GroupType): item is GroupType {
  return (item as GroupType).options !== undefined;
}

export type SingleValueType<
  OptionType extends OptionTypeBase
> = OptionType | null;
export type MultiValueType<OptionType extends OptionTypeBase> = OptionsType<
  OptionType
>;

export type ValueType<
  OptionType extends OptionTypeBase,
  IsMultiType extends boolean
> = IsMultiType extends true ? OptionsType<OptionType> : OptionType | null;

export function valueTernary<
  OptionType extends OptionTypeBase,
  IsMultiType extends boolean
>(
  isMulti: IsMultiType,
  multiValue: MultiValueType<OptionType>,
  singleValue: SingleValueType<OptionType>
): ValueType<OptionType, IsMultiType> {
  return (isMulti ? multiValue : singleValue) as ValueType<
    OptionType,
    IsMultiType
  >;
}

export function multiValueAsValue<
  OptionType extends OptionTypeBase,
  IsMultiType extends boolean
>(multiValue: MultiValueType<OptionType>) {
  return multiValue as ValueType<OptionType, IsMultiType>;
}

export function singleValueAsValue<
  OptionType extends OptionTypeBase,
  IsMultiType extends boolean
>(singleValue: SingleValueType<OptionType>) {
  return singleValue as ValueType<OptionType, IsMultiType>;
}

// export function isMulti<
//   OptionType extends OptionTypeBase,
//   IsMultiType extends boolean
// >(
//   isMulti: IsMultiType,
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   value: ValueType<OptionType, IsMultiType>
// ): value is OptionsType<OptionType> & ValueType<OptionType, IsMultiType> {
//   return isMulti;
// }

// export type FocusEventHandler = (SyntheticFocusEvent<HTMLElement>) => void;
// export type MouseEventHandler = (SyntheticMouseEvent<HTMLElement>) => void;
// export type KeyboardEventHandler = (
//   SyntheticKeyboardEvent<HTMLElement>
// ) => void;
//
// export type InnerRef = Ref<*>;
// export type PropsWithInnerRef = {
//   /** The inner reference. */
//   innerRef: Ref<*>,
// };

interface Colors {
  primary: string;
  primary75: string;
  primary50: string;
  primary25: string;

  danger: string;
  dangerLight: string;

  neutral0: string;
  neutral5: string;
  neutral10: string;
  neutral20: string;
  neutral30: string;
  neutral40: string;
  neutral50: string;
  neutral60: string;
  neutral70: string;
  neutral80: string;
  neutral90: string;
}

interface ThemeSpacing {
  baseUnit: number;
  controlHeight: number;
  menuGutter: number;
}

export interface Theme {
  borderRadius: number;
  colors: Colors;
  spacing: ThemeSpacing;
}

// export type ClassNameList = Array<string>;
// export type ClassNamesState = { [string]: boolean } | void;

export type ClassNamesState =
  | ContainerClassNamesState
  | ValueContainerClassNamesState
  | IndicatorsClassNamesState
  | ControlClassNamesState
  | GroupClassNamesState
  | GroupHeadingClassNamesState
  | DropdownIndicatorClassNamesState
  | ClearIndicatorClassNamesState
  | IndicatorSeparatorClassNamesState
  | LoadingIndicatorClassNamesState
  | InputClassNamesState
  | MenuClassNamesState
  | MenuListClassNamesState
  | NoOptionsMessageClassNamesState
  | LoadingMessageClassNamesState
  | MultiValueClassNamesState
  | MultiValueLabelClassNamesState
  | MultiValueRemoveClassNamesState
  | OptionClassNamesState
  | PlaceholderClassNamesState
  | SingleValueClassNamesState;

export interface CommonProps<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
> {
  cx: (state: ClassNamesState, className?: string) => string;
  clearValue: () => void;
  /**
    Get the styles of a particular part of the select. Pass in the name of the
    property as the first argument, and the current props as the second argument.
    See the `styles` object for the properties available.
  */
  getStyles: <
    PropertyName extends keyof StylesProps<OptionType, GroupType, IsMultiType>
  >(
    propertyName: PropertyName,
    props: StylesProps<OptionType, GroupType, IsMultiType>[PropertyName]
  ) => CSSPropertiesWithLabel;
  getValue: () => OptionsType<OptionType>;
  /** Whether the value container currently holds a value. */
  hasValue: boolean;
  /** Set when the value container should hold multiple values */
  isMulti: boolean;
  /** Whether the text is right to left */
  isRtl: boolean;
  options: OptionsType<OptionType> | GroupsType<OptionType, GroupType>;
  selectOption: (newValue: OptionType) => void;
  setValue: (
    newValue: ValueType<OptionType, IsMultiType>,
    action: 'select-option' | 'deselect-option',
    option: OptionType
  ) => void;
  selectProps: SelectProps<OptionType, GroupType, IsMultiType>;
  theme: Theme;
}

export interface SelectOptionActionMeta<OptionType extends OptionTypeBase> {
  action: 'select-option';
  option: OptionType;
  name?: string;
}

export interface DeselectOptionActionMeta<OptionType extends OptionTypeBase> {
  action: 'deselect-option';
  option: OptionType;
  name?: string;
}

export interface RemoveValueActionMeta<OptionType extends OptionTypeBase> {
  action: 'remove-value';
  removedValue: OptionType;
  name?: string;
}

export interface PopValueActionMeta<OptionType extends OptionTypeBase> {
  action: 'pop-value';
  removedValue: OptionType;
  name?: string;
}

export interface ClearActionMeta {
  action: 'clear';
  name?: string;
}

export interface CreateOptionActionMeta {
  action: 'create-option';
  name?: string;
}

export type ActionMeta<OptionType extends OptionTypeBase> =
  | SelectOptionActionMeta<OptionType>
  | DeselectOptionActionMeta<OptionType>
  | RemoveValueActionMeta<OptionType>
  | PopValueActionMeta<OptionType>
  | ClearActionMeta
  | CreateOptionActionMeta;

export type InputActionTypes =
  | 'set-value'
  | 'input-change'
  | 'input-blur'
  | 'menu-close';

export interface InputActionMeta {
  action: InputActionTypes;
}

export type MenuPlacement = 'auto' | 'bottom' | 'top';
export type MenuPosition = 'absolute' | 'fixed';

export type FocusDirection =
  | 'up'
  | 'down'
  | 'pageup'
  | 'pagedown'
  | 'first'
  | 'last';

// export type OptionProps = PropsWithInnerRef & {
//   data: any,
//   id: number,
//   index: number,
//   isDisabled: boolean,
//   isFocused: boolean,
//   isSelected: boolean,
//   label: string,
//   onClick: MouseEventHandler,
//   onMouseOver: MouseEventHandler,
//   value: any,
// };

type Truthy<T> = T extends false | '' | 0 | null | undefined ? never : T;

export function truthy<T>(value: T): value is Truthy<T> {
  return !!value;
}

export type CSSPropertiesWithLabel = CSSObject & { label?: string };
