import type { Ref, FocusEventHandler } from 'react';

export interface OptionType {
  [key: string]: any,
}

export type OptionsType = Array<OptionType>;

export interface GroupType {
  options: OptionsType,
  [key: string]: any,
}

export type ValueType = OptionType | OptionsType | null | void;

// export type FocusEventHandler = (SyntheticFocusEvent<HTMLElement>) => void;
// export type MouseEventHandler = (SyntheticMouseEvent<HTMLElement>) => void;
// export type KeyboardEventHandler = (
//   SyntheticKeyboardEvent<HTMLElement>
// ) => void;
//
// export type InnerRef = Ref<*>;
// export interface PropsWithInnerRef {
//   /** The inner reference. */
//   innerRef: Ref<*>;
// }

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

export interface PropsWithStyles {
  /**
    Get the styles of a particular part of the select. Pass in the name of the
    property as the first argument, and the current props as the second argument.
    See the `styles` object for the properties available.
  */
  getStyles: (name: string, props: any) => {};
  theme: Theme;
}

export type ClassNameList = Array<string>;
export type ClassNamesState = { [key: string]: boolean } | undefined;

export interface CommonProps {
  clearValue: () => void;
  className?: string;
  cx: (
    state: ClassNamesState | undefined,
    className: string | undefined
  ) => string | undefined;
  /**
    Get the styles of a particular part of the select. Pass in the name of the
    property as the first argument, and the current props as the second argument.
    See the `styles` object for the properties available.
  */
  getStyles: (string: string, props: any) => {};
  theme: Theme;
  getValue: () => ValueType;
  hasValue: boolean;
  isMulti: boolean;
  options: OptionsType;
  selectOption: (option: OptionType) => void;
  selectProps: any;
  setValue: (value: ValueType, action: ActionTypes) => void;
}

export type ActionTypes =
  | 'select-option'
  | 'deselect-option'
  | 'remove-value'
  | 'pop-value'
  | 'set-value'
  | 'clear'
  | 'create-option';

export interface ActionMeta {
  action: ActionTypes,
}

export type InputActionTypes =
  | 'set-value'
  | 'input-change'
  | 'input-blur'
  | 'menu-close';

export interface InputActionMeta {
  action: InputActionTypes
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
