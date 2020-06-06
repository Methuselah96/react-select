/** @jsx jsx */
import { ReactNode } from 'react';
import { Interpolation, jsx } from '@emotion/core';
import { CommonProps, OptionTypeBase } from '../types';

export interface PlaceholderProps<OptionType extends OptionTypeBase>
  extends CommonProps<OptionType> {
  /** The children to be rendered. */
  children: ReactNode;
  isDisabled: boolean;
  isFocused: boolean;
}

export const placeholderCSS = <OptionType extends OptionTypeBase>({
  theme: { spacing, colors },
}: PlaceholderProps<OptionType>): Interpolation => ({
  label: 'placeholder',
  color: colors.neutral50,
  marginLeft: spacing.baseUnit / 2,
  marginRight: spacing.baseUnit / 2,
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
});

const Placeholder = <OptionType extends OptionTypeBase>(
  props: PlaceholderProps<OptionType>
) => {
  const { children, className, cx, getStyles, innerProps } = props;
  return (
    <div
      css={getStyles('placeholder', props)}
      className={cx(
        {
          placeholder: true,
        },
        className
      )}
      {...innerProps}
    >
      {children}
    </div>
  );
};

export default Placeholder;
