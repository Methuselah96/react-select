/** @jsx jsx */
import { MouseEventHandler, ReactNode, TouchEventHandler } from 'react';
import { Interpolation, jsx, keyframes } from '@emotion/core';

import { CommonProps, OptionTypeBase } from '../types';

// ==============================
// Dropdown & Clear Icons
// ==============================

const Svg = ({
  size,
  ...props
}: { size: number } & JSX.IntrinsicElements['svg']) => (
  <svg
    height={size}
    width={size}
    viewBox="0 0 20 20"
    aria-hidden="true"
    focusable="false"
    css={{
      display: 'inline-block',
      fill: 'currentColor',
      lineHeight: 1,
      stroke: 'currentColor',
      strokeWidth: 0,
    }}
    {...props}
  />
);

export const CrossIcon = (props: JSX.IntrinsicElements['svg']) => (
  <Svg size={20} {...props}>
    <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z" />
  </Svg>
);
export const DownChevron = (props: JSX.IntrinsicElements['svg']) => (
  <Svg size={20} {...props}>
    <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z" />
  </Svg>
);

// ==============================
// Dropdown & Clear Buttons
// ==============================

export interface DropdownIndicatorProps<OptionType extends OptionTypeBase>
  extends CommonProps<OptionType> {
  innerProps: {
    onMouseDown: MouseEventHandler<HTMLDivElement>;
    onTouchEnd: TouchEventHandler<HTMLDivElement>;
    'aria-hidden': 'true';
  };
  /** The focused state of the select. */
  isDisabled: boolean;
  isFocused: boolean;
  /** The children to be rendered inside the indicator. */
  children: ReactNode;
}

const baseCSS = <OptionType extends OptionTypeBase>({
  isFocused,
  theme: {
    spacing: { baseUnit },
    colors,
  },
}:
  | DropdownIndicatorProps<OptionType>
  | ClearIndicatorProps<OptionType>): Interpolation => ({
  label: 'indicatorContainer',
  color: isFocused ? colors.neutral60 : colors.neutral20,
  display: 'flex',
  padding: baseUnit * 2,
  transition: 'color 150ms',

  ':hover': {
    color: isFocused ? colors.neutral80 : colors.neutral40,
  },
});

export const dropdownIndicatorCSS = baseCSS;
export const DropdownIndicator = <OptionType extends OptionTypeBase>(
  props: DropdownIndicatorProps<OptionType>
) => {
  const { children, className, cx, getStyles, innerProps } = props;
  return (
    <div
      {...innerProps}
      css={getStyles('dropdownIndicator', props)}
      className={cx(
        {
          indicator: true,
          'dropdown-indicator': true,
        },
        className
      )}
    >
      {children || <DownChevron />}
    </div>
  );
};

export interface ClearIndicatorProps<OptionType extends OptionTypeBase>
  extends CommonProps<OptionType> {
  innerProps: {
    onMouseDown: MouseEventHandler<HTMLDivElement>;
    onTouchEnd: TouchEventHandler<HTMLDivElement>;
    'aria-hidden': 'true';
  };
  isFocused: boolean;
  /** The children to be rendered inside the indicator. */
  children: ReactNode;
}

export const clearIndicatorCSS = baseCSS;
export const ClearIndicator = <OptionType extends OptionTypeBase>(
  props: ClearIndicatorProps<OptionType>
) => {
  const { children, className, cx, getStyles, innerProps } = props;
  return (
    <div
      {...innerProps}
      css={getStyles('clearIndicator', props)}
      className={cx(
        {
          indicator: true,
          'clear-indicator': true,
        },
        className
      )}
    >
      {children || <CrossIcon />}
    </div>
  );
};

// ==============================
// Separator
// ==============================

export interface IndicatorSeparatorProps<OptionType extends OptionTypeBase>
  extends CommonProps<OptionType> {
  isDisabled: boolean;
  isFocused: boolean;
}

export const indicatorSeparatorCSS = <OptionType extends OptionTypeBase>({
  isDisabled,
  theme: {
    spacing: { baseUnit },
    colors,
  },
}: IndicatorSeparatorProps<OptionType>): Interpolation => ({
  label: 'indicatorSeparator',
  alignSelf: 'stretch',
  backgroundColor: isDisabled ? colors.neutral10 : colors.neutral20,
  marginBottom: baseUnit * 2,
  marginTop: baseUnit * 2,
  width: 1,
});

export const IndicatorSeparator = <OptionType extends OptionTypeBase>(
  props: IndicatorSeparatorProps<OptionType>
) => {
  const { className, cx, getStyles, innerProps } = props;
  return (
    <span
      {...innerProps}
      css={getStyles('indicatorSeparator', props)}
      className={cx({ 'indicator-separator': true }, className)}
    />
  );
};

// ==============================
// Loading
// ==============================

const loadingDotAnimations = keyframes`
  0%, 80%, 100% { opacity: 0; }
  40% { opacity: 1; }
`;

export interface LoadingIndicatorProps<OptionType extends OptionTypeBase>
  extends CommonProps<OptionType> {
  /** Props that will be passed on to the children. */
  innerProps: { 'aria-hidden': 'true' };
  isDisabled: boolean;
  /** The focused state of the select. */
  isFocused: boolean;
}

export const loadingIndicatorCSS = <OptionType extends OptionTypeBase>({
  isFocused,
  size,
  theme: {
    colors,
    spacing: { baseUnit },
  },
}: LoadingIndicatorProps<OptionType>): Interpolation => ({
  label: 'loadingIndicator',
  color: isFocused ? colors.neutral60 : colors.neutral20,
  display: 'flex',
  padding: baseUnit * 2,
  transition: 'color 150ms',
  alignSelf: 'center',
  fontSize: size,
  lineHeight: 1,
  marginRight: size,
  textAlign: 'center',
  verticalAlign: 'middle',
});

interface LoadingDotProps {
  delay: number;
  offset: boolean;
}
const LoadingDot = ({ delay, offset }: LoadingDotProps) => (
  <span
    css={{
      animation: `${loadingDotAnimations} 1s ease-in-out ${delay}ms infinite;`,
      backgroundColor: 'currentColor',
      borderRadius: '1em',
      display: 'inline-block',
      marginLeft: offset ? '1em' : undefined,
      height: '1em',
      verticalAlign: 'top',
      width: '1em',
    }}
  />
);

export const LoadingIndicator = <OptionType extends OptionTypeBase>(
  props: LoadingIndicatorProps<OptionType>
) => {
  const { className, cx, getStyles, innerProps, isRtl } = props;

  return (
    <div
      {...innerProps}
      css={getStyles('loadingIndicator', props)}
      className={cx(
        {
          indicator: true,
          'loading-indicator': true,
        },
        className
      )}
    >
      <LoadingDot delay={0} offset={isRtl} />
      <LoadingDot delay={160} offset />
      <LoadingDot delay={320} offset={!isRtl} />
    </div>
  );
};
LoadingIndicator.defaultProps = { size: 4 };
