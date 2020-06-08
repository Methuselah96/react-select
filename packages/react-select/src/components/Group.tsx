/** @jsx jsx */
import { ComponentType, ReactNode } from 'react';
import { Interpolation, jsx } from '@emotion/core';

import { CommonProps, GroupTypeBase, OptionTypeBase } from '../types';

interface PassedHeadingProps {
  id: string;
}
type ForwardedHeadingProps<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
> = Pick<
  GroupProps<OptionType, GroupType, IsMultiType>,
  'selectProps' | 'theme' | 'getStyles' | 'cx'
>;

export interface GroupClassNamesState {
  group: true;
}

export interface GroupProps<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
> extends CommonProps<OptionType, GroupType, IsMultiType> {
  // TODO Spread Group type?
  /** Component to wrap the label, receives headingProps. */
  Heading: ComponentType<
    PassedHeadingProps &
      ForwardedHeadingProps<OptionType, GroupType, IsMultiType>
  >;
  /** Props to pass to Heading. */
  headingProps: PassedHeadingProps;
  /** Label to be displayed in the heading component. */
  label: ReactNode;
  /** The children to be rendered. */
  children: ReactNode;
}

export const groupCSS = <
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>({
  theme: { spacing },
}: GroupProps<OptionType, GroupType, IsMultiType>): Interpolation => ({
  paddingBottom: spacing.baseUnit * 2,
  paddingTop: spacing.baseUnit * 2,
});

const Group = <
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>(
  props: GroupProps<OptionType, GroupType, IsMultiType>
) => {
  const {
    children,
    className,
    cx,
    getStyles,
    Heading,
    headingProps,
    label,
    theme,
    selectProps,
  } = props;
  return (
    <div
      css={getStyles('group', props)}
      className={cx({ group: true }, className)}
    >
      <Heading
        {...headingProps}
        selectProps={selectProps}
        theme={theme}
        getStyles={getStyles}
        cx={cx}
      >
        {label}
      </Heading>
      <div>{children}</div>
    </div>
  );
};

export type GroupHeadingProps<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
> = ForwardedHeadingProps<OptionType, GroupType, IsMultiType> &
  JSX.IntrinsicElements['div'];

export const groupHeadingCSS = <
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>({
  theme: { spacing },
}: GroupHeadingProps<OptionType, GroupType, IsMultiType>): Interpolation => ({
  label: 'group',
  color: '#999',
  cursor: 'default',
  display: 'block',
  fontSize: '75%',
  fontWeight: 500,
  marginBottom: '0.25em',
  paddingLeft: spacing.baseUnit * 3,
  paddingRight: spacing.baseUnit * 3,
  textTransform: 'uppercase',
});

export const GroupHeading = <
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>(
  props: GroupHeadingProps<OptionType, GroupType, IsMultiType>
) => {
  const { className, cx, getStyles, theme, selectProps, ...cleanProps } = props;
  return (
    <div
      css={getStyles('groupHeading', { theme, ...cleanProps })}
      className={cx({ 'group-heading': true }, className)}
      {...cleanProps}
    />
  );
};

export default Group;
