/** @jsx jsx */
import { KeyboardEventHandler, ReactNode } from 'react';
import { jsx } from '@emotion/core';
import { CommonProps, OptionTypeBase } from '../types';

// ==============================
// Root Container
// ==============================

export interface ContainerProps<OptionType extends OptionTypeBase>
  extends CommonProps<OptionType> {
  className?: string;
  /** Inner props to be passed down to the container. */
  innerProps: { id?: string; onKeyDown: KeyboardEventHandler<HTMLDivElement> };
  /** Whether the select is disabled. */
  isDisabled: boolean;
  isFocused: boolean;
  /** The children to be rendered. */
  children: ReactNode;
}

export const containerCSS = <OptionType extends OptionTypeBase>({
  isDisabled,
  isRtl,
}: ContainerProps<OptionType>) => ({
  label: 'container',
  direction: isRtl ? 'rtl' : null,
  pointerEvents: isDisabled ? 'none' : null, // cancel mouse events when disabled
  position: 'relative',
});

export const SelectContainer = <OptionType extends OptionTypeBase>(
  props: ContainerProps<OptionType>
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

export interface ValueContainerProps<OptionType extends OptionTypeBase>
  extends CommonProps<OptionType> {
  isDisabled: boolean;
  /** The children to be rendered. */
  children: ReactNode;
}

export const valueContainerCSS = <OptionType extends OptionTypeBase>({
  theme: { spacing },
}: ValueContainerProps<OptionType>) => ({
  alignItems: 'center',
  display: 'flex',
  flex: 1,
  flexWrap: 'wrap',
  padding: `${spacing.baseUnit / 2}px ${spacing.baseUnit * 2}px`,
  WebkitOverflowScrolling: 'touch',
  position: 'relative',
  overflow: 'hidden',
});

export const ValueContainer = <OptionType extends OptionTypeBase>(
  props: ValueContainerProps<OptionType>
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

interface IndicatorContainerClassNamesState {
  indicators: true;
}

export interface IndicatorContainerProps<OptionType extends OptionTypeBase>
  extends CommonProps<OptionType> {
  isDisabled: boolean;
  /** The children to be rendered. */
  children: ReactNode;
}

export const indicatorsContainerCSS = () => ({
  alignItems: 'center',
  alignSelf: 'stretch',
  display: 'flex',
  flexShrink: 0,
});

export const IndicatorsContainer = <OptionType extends OptionTypeBase>(
  props: IndicatorContainerProps<OptionType>
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
