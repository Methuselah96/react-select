/** @jsx jsx */
import { jsx } from '@emotion/core';
import AutosizeInput, { AutosizeInputProps } from 'react-input-autosize';

import {
  ClassNamesState,
  CSSPropertiesWithLabel,
  GroupTypeBase,
  OptionTypeBase,
  Theme,
} from '../types';
import { StylesProps } from '../styles';
import { Props as SelectProps } from '../Select';

export interface InputClassNamesState {
  input: true;
}

export type InputStylesProps<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
> = Omit<
  InputProps<OptionType, GroupType, IsMultiType>,
  'className' | 'cx' | 'getStyles' | 'innerRef' | 'isHidden' | 'selectProps'
> & { theme: Theme };

export interface InputProps<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
> extends AutosizeInputProps {
  className?: string;
  cx: (state: ClassNamesState, className?: string) => string;
  getStyles: <
    PropertyName extends keyof StylesProps<OptionType, GroupType, IsMultiType>
  >(
    propertyName: PropertyName,
    props: StylesProps<OptionType, GroupType, IsMultiType>[PropertyName]
  ) => CSSPropertiesWithLabel;
  /** Reference to the internal element */
  innerRef: (instance: HTMLInputElement | null) => void;
  /** Whether the input is disabled */
  isDisabled: boolean;
  /** Set whether the input should be visible. Does not affect input size. */
  isHidden: boolean;
  selectProps: SelectProps<OptionType, GroupType, IsMultiType>;
  theme: Theme;
}

export const inputCSS = <
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>({
  isDisabled,
  theme: { spacing, colors },
}: InputStylesProps<
  OptionType,
  GroupType,
  IsMultiType
>): CSSPropertiesWithLabel => ({
  margin: spacing.baseUnit / 2,
  paddingBottom: spacing.baseUnit / 2,
  paddingTop: spacing.baseUnit / 2,
  visibility: isDisabled ? 'hidden' : 'visible',
  color: colors.neutral80,
});
const inputStyle = (isHidden: boolean) => ({
  label: 'input',
  background: 0,
  border: 0,
  fontSize: 'inherit',
  opacity: isHidden ? 0 : 1,
  outline: 0,
  padding: 0,
  color: 'inherit',
});

const AutosizeInputAsAny: any = AutosizeInput;

const Input = <
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>({
  className,
  cx,
  getStyles,
  innerRef,
  isHidden,
  isDisabled,
  theme,
  selectProps,
  ...props
}: InputProps<OptionType, GroupType, IsMultiType>) => (
  <div css={getStyles('input', { theme, isDisabled, ...props })}>
    <AutosizeInputAsAny
      className={cx({ input: true }, className)}
      inputRef={innerRef}
      inputStyle={inputStyle(isHidden)}
      disabled={isDisabled}
      {...props}
    />
  </div>
);

export default Input;