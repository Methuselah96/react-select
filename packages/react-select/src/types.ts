// import type { Ref } from 'react';

import { Interpolation } from '@emotion/core';

export interface OptionTypeBase {
  isDisabled?: boolean;
}

export type OptionsType<
  OptionType extends OptionTypeBase
> = readonly OptionType[];

// export type GroupType = {
//   options: OptionsType,
//   [string]: any,
// };

// export type ValueType = OptionType | OptionsType | null | void;
//
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
//
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
  colors: { [key: string]: string };
  spacing: ThemeSpacing;
}

// export type PropsWithStyles = {
//   /**
//     Get the styles of a particular part of the select. Pass in the name of the
//     property as the first argument, and the current props as the second argument.
//     See the `styles` object for the properties available.
//   */
//   getStyles: (string, any) => {},
//   theme: Theme,
// };
//
// export type ClassNameList = Array<string>;
// export type ClassNamesState = { [string]: boolean } | void;

export interface CommonProps<
  OptionType extends OptionTypeBase,
  ClassNamesState,
  GetStylesKey extends string,
  GetStylesProps
> {
  clearValue: () => void;
  className?: string;
  cx: (state: ClassNamesState, className?: string) => string;
  /**
    Get the styles of a particular part of the select. Pass in the name of the
    property as the first argument, and the current props as the second argument.
    See the `styles` object for the properties available.
  */
  getStyles: (key: GetStylesKey, props: GetStylesProps) => Interpolation;
  theme: Theme;
  // getValue: () => ValueType;
  hasValue: boolean;
  isMulti: boolean;
  options: OptionsType<OptionType>;
  // selectOption: OptionType => void,
  // selectProps: any,
  // setValue: (ValueType, ActionTypes) => void,
}
//
// export type ActionTypes =
//   | 'select-option'
//   | 'deselect-option'
//   | 'remove-value'
//   | 'pop-value'
//   | 'set-value'
//   | 'clear'
//   | 'create-option';
//
// export type ActionMeta = {
//   action: ActionTypes,
// };
//
// export type InputActionTypes =
//   | 'set-value'
//   | 'input-change'
//   | 'input-blur'
//   | 'menu-close';
//
// export type InputActionMeta = {|
//   action: InputActionTypes,
// |};
//
// export type MenuPlacement = 'auto' | 'bottom' | 'top';
// export type MenuPosition = 'absolute' | 'fixed';
//
// export type FocusDirection =
//   | 'up'
//   | 'down'
//   | 'pageup'
//   | 'pagedown'
//   | 'first'
//   | 'last';
//
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
