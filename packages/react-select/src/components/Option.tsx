/** @jsx jsx */
import { ReactNode } from 'react';
import { jsx } from '@emotion/core';

import {
  CommonProps,
  OptionTypeBase,
  GroupTypeBase,
  CSSPropertiesWithLabel,
} from '../types';
import { OptionRenderType } from '../Select';

export interface OptionClassNamesState {
  option: true;
  'option--is-disabled': boolean;
  'option--is-focused': boolean;
  'option--is-selected': boolean;
}

export interface OptionProps<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>
  extends CommonProps<OptionType, GroupType, IsMultiType>,
    OptionRenderType<OptionType> {
  className?: string;
  /** Whether the option is focused. */
  isFocused: boolean;
  children: ReactNode;
}

export const optionCSS = <
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>({
  isDisabled,
  isFocused,
  isSelected,
  theme: { spacing, colors },
}: OptionProps<
  OptionType,
  GroupType,
  IsMultiType
>): CSSPropertiesWithLabel => ({
  label: 'option',
  backgroundColor: isSelected
    ? colors.primary
    : isFocused
    ? colors.primary25
    : 'transparent',
  color: isDisabled
    ? colors.neutral20
    : isSelected
    ? colors.neutral0
    : 'inherit',
  cursor: 'default',
  display: 'block',
  fontSize: 'inherit',
  padding: `${spacing.baseUnit * 2}px ${spacing.baseUnit * 3}px`,
  width: '100%',
  userSelect: 'none',
  WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',

  // provide some affordance on touch devices
  ':active': {
    backgroundColor: !isDisabled
      ? isSelected
        ? colors.primary
        : colors.primary50
      : undefined,
  },
});

const Option = <
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>(
  props: OptionProps<OptionType, GroupType, IsMultiType>
) => {
  const {
    children,
    className,
    cx,
    getStyles,
    isDisabled,
    isFocused,
    isSelected,
    innerRef,
    innerProps,
  } = props;
  return (
    <div
      css={getStyles('option', props)}
      className={cx(
        {
          option: true,
          'option--is-disabled': isDisabled,
          'option--is-focused': isFocused,
          'option--is-selected': isSelected,
        },
        className
      )}
      ref={innerRef}
      {...innerProps}
    >
      {children}
    </div>
  );
};

export default Option;
