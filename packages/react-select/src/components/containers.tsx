/** @jsx jsx */
import { KeyboardEventHandler, ReactNode } from 'react';
import { jsx } from '@emotion/core';

import {
  CommonProps,
  CSSPropertiesWithLabel,
  GroupTypeBase,
  OptionTypeBase,
} from '../types';

// ==============================
// Root Container
// ==============================

export interface ContainerClassNamesState {
  '--is-disabled': boolean;
  '--is-rtl': boolean;
}

export interface ContainerProps<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
> extends CommonProps<OptionType, GroupType, IsMultiType> {
  className?: string;
  /** Inner props to be passed down to the container. */
  innerProps: { id?: string; onKeyDown: KeyboardEventHandler<HTMLDivElement> };
  /** Whether the select is disabled. */
  isDisabled: boolean;
  isFocused: boolean;
  /** The children to be rendered. */
  children: ReactNode;
}

export const containerCSS = <
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>({
  isDisabled,
  isRtl,
}: ContainerProps<
  OptionType,
  GroupType,
  IsMultiType
>): CSSPropertiesWithLabel => ({
  label: 'container',
  direction: isRtl ? 'rtl' : undefined,
  pointerEvents: isDisabled ? 'none' : undefined, // cancel mouse events when disabled
  position: 'relative',
});

export const SelectContainer = <
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>(
  props: ContainerProps<OptionType, GroupType, IsMultiType>
) => {
  const {
    children,
    className,
    cx,
    getStyles,
    innerProps,
    isDisabled,
    isRtl,
  } = props;
  return (
    <div
      css={getStyles('container', props)}
      className={cx(
        {
          '--is-disabled': isDisabled,
          '--is-rtl': isRtl,
        },
        className
      )}
      {...innerProps}
    >
      {children}
    </div>
  );
};

// ==============================
// Value Container
// ==============================

export interface ValueContainerClassNamesState {
  'value-container': true;
  'value-container--is-multi': boolean;
  'value-container--has-value': boolean;
}

export interface ValueContainerProps<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
> extends CommonProps<OptionType, GroupType, IsMultiType> {
  className?: string;
  isDisabled: boolean;
  /** The children to be rendered. */
  children: ReactNode;
}

export const valueContainerCSS = <
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>({
  theme: { spacing },
}: ValueContainerProps<
  OptionType,
  GroupType,
  IsMultiType
>): CSSPropertiesWithLabel => ({
  alignItems: 'center',
  display: 'flex',
  flex: 1,
  flexWrap: 'wrap',
  padding: `${spacing.baseUnit / 2}px ${spacing.baseUnit * 2}px`,
  WebkitOverflowScrolling: 'touch',
  position: 'relative',
  overflow: 'hidden',
});

export const ValueContainer = <
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>(
  props: ValueContainerProps<OptionType, GroupType, IsMultiType>
) => {
  const { children, className, cx, isMulti, getStyles, hasValue } = props;

  return (
    <div
      css={getStyles('valueContainer', props)}
      className={cx(
        {
          'value-container': true,
          'value-container--is-multi': isMulti,
          'value-container--has-value': hasValue,
        },
        className
      )}
    >
      {children}
    </div>
  );
};

// ==============================
// Indicator Container
// ==============================

export interface IndicatorsClassNamesState {
  indicators: true;
}

export interface IndicatorsContainerProps<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
> extends CommonProps<OptionType, GroupType, IsMultiType> {
  className?: string;
  isDisabled: boolean;
  /** The children to be rendered. */
  children: ReactNode;
}

export const indicatorsContainerCSS = (): CSSPropertiesWithLabel => ({
  alignItems: 'center',
  alignSelf: 'stretch',
  display: 'flex',
  flexShrink: 0,
});

export const IndicatorsContainer = <
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>(
  props: IndicatorsContainerProps<OptionType, GroupType, IsMultiType>
) => {
  const { children, className, cx, getStyles } = props;

  return (
    <div
      css={getStyles('indicatorsContainer', props)}
      className={cx(
        {
          indicators: true,
        },
        className
      )}
    >
      {children}
    </div>
  );
};
