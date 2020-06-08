/** @jsx jsx */
import { CSSProperties, ReactNode } from 'react';
import { jsx } from '@emotion/core';
import {
  CommonProps,
  CSSPropertiesWithLabel,
  GroupTypeBase,
  OptionTypeBase,
} from '../types';

export interface PlaceholderClassNamesState {
  placeholder: true;
}

export interface PlaceholderProps<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
> extends CommonProps<OptionType, GroupType, IsMultiType> {
  className?: string;
  /** The children to be rendered. */
  children: ReactNode;
  isDisabled: boolean;
  isFocused: boolean;
  innerProps: { style: CSSProperties };
}

export const placeholderCSS = <
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>({
  theme: { spacing, colors },
}: PlaceholderProps<
  OptionType,
  GroupType,
  IsMultiType
>): CSSPropertiesWithLabel => ({
  label: 'placeholder',
  color: colors.neutral50,
  marginLeft: spacing.baseUnit / 2,
  marginRight: spacing.baseUnit / 2,
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
});

const Placeholder = <
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>(
  props: PlaceholderProps<OptionType, GroupType, IsMultiType>
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
