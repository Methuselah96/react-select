/** @jsx jsx */
import { ReactNode } from 'react';
import type { CommonProps, OptionTypeBase } from '../types';
import { Interpolation, jsx } from '@emotion/core';
import { GroupTypeBase } from '../types';

export interface SingleValueClassNamesState {
  'single-value': true;
  'single-value--is-disabled': boolean;
}

export interface SingleValueProps<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
> extends CommonProps<OptionType, GroupType, IsMultiType> {
  /** The children to be rendered. */
  children: ReactNode;
  /** The data of the selected option rendered in the Single Value component. */
  data: OptionType;
  /** Whether this is disabled. */
  isDisabled: boolean;
}

export const css = <
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>({
  isDisabled,
  theme: { spacing, colors },
}: SingleValueProps<OptionType, GroupType, IsMultiType>): Interpolation => ({
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

const SingleValue = <
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>(
  props: SingleValueProps<OptionType, GroupType, IsMultiType>
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
