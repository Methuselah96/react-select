/** @jsx jsx */
import { MouseEventHandler, ReactNode, Ref, TouchEventHandler } from 'react';
import { jsx } from '@emotion/core';

import { CommonProps, OptionTypeBase } from '../types';

export interface ControlProps<OptionType extends OptionTypeBase>
  extends CommonProps<OptionType> {
  innerRef: Ref<HTMLDivElement>;
  /** The mouse down event and the innerRef to pass down to the controller element. */
  innerProps: {
    onMouseDown: MouseEventHandler<HTMLDivElement>;
    onTouchEnd: TouchEventHandler<HTMLDivElement>;
  };
  /** Whether the select is disabled. */
  isDisabled: boolean;
  /** Whether the select is focused. */
  isFocused: boolean;
  /** Whether the select is expanded. */
  menuIsOpen: boolean;
  /** Children to render. */
  children: ReactNode;
}

export const css = <OptionType extends OptionTypeBase>({
  isDisabled,
  isFocused,
  theme: { colors, borderRadius, spacing },
}: ControlProps<OptionType>) => ({
  label: 'control',
  alignItems: 'center',
  backgroundColor: isDisabled ? colors.neutral5 : colors.neutral0,
  borderColor: isDisabled
    ? colors.neutral10
    : isFocused
    ? colors.primary
    : colors.neutral20,
  borderRadius: borderRadius,
  borderStyle: 'solid',
  borderWidth: 1,
  boxShadow: isFocused ? `0 0 0 1px ${colors.primary}` : null,
  cursor: 'default',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  minHeight: spacing.controlHeight,
  outline: '0 !important',
  position: 'relative',
  transition: 'all 100ms',

  '&:hover': {
    borderColor: isFocused ? colors.primary : colors.neutral30,
  },
});

const Control = <OptionType extends OptionTypeBase>(
  props: ControlProps<OptionType>
) => {
  const {
    children,
    cx,
    getStyles,
    className,
    isDisabled,
    isFocused,
    innerRef,
    innerProps,
    menuIsOpen,
  } = props;
  return (
    <div
      ref={innerRef}
      css={getStyles('control', props)}
      className={cx(
        {
          control: true,
          'control--is-disabled': isDisabled,
          'control--is-focused': isFocused,
          'control--menu-is-open': menuIsOpen,
        },
        className
      )}
      {...innerProps}
    >
      {children}
    </div>
  );
};

export default Control;
