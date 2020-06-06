/** @jsx jsx */
import { ReactNode } from 'react';
import type { CommonProps, OptionTypeBase } from '../types';
import { jsx } from '@emotion/core';

interface SingleValueProps<OptionType extends OptionTypeBase>
  extends CommonProps<OptionType> {
  /** The children to be rendered. */
  children: ReactNode;
  /** The data of the selected option rendered in the Single Value component. */
  data: OptionType;
  /** Whether this is disabled. */
  isDisabled: boolean;
}

export const css = <OptionType extends OptionTypeBase>({
  isDisabled,
  theme: { spacing, colors },
}: SingleValueProps<OptionType>) => ({
  label: 'singleValue',
  color: isDisabled ? colors.neutral40 : colors.neutral80,
  marginLeft: spacing.baseUnit / 2,
  marginRight: spacing.baseUnit / 2,
  maxWidth: `calc(100% - ${spacing.baseUnit * 2}px)`,
  overflow: 'hidden',
  position: 'absolute',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  top: '50%',
  transform: 'translateY(-50%)',
});

const SingleValue = <OptionType extends OptionTypeBase>(
  props: SingleValueProps<OptionType>
) => {
  const { children, className, cx, getStyles, isDisabled, innerProps } = props;
  return (
    <div
      css={getStyles('singleValue', props)}
      className={cx(
        {
          'single-value': true,
          'single-value--is-disabled': isDisabled,
        },
        className
      )}
      {...innerProps}
    >
      {children}
    </div>
  );
};

export default SingleValue;
