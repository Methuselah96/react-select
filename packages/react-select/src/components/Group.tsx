/** @jsx jsx */
import { ComponentType, ReactNode } from 'react';
import { Interpolation, jsx } from '@emotion/core';

import { CommonProps, OptionTypeBase, Theme } from '../types';

interface GroupClassNamesState {
  group: true;
}

export interface GroupProps<OptionType extends OptionTypeBase, HeadingProps>
  extends CommonProps<
    OptionType,
    GroupClassNamesState,
    'group',
    GroupProps<OptionType, HeadingProps>
  > {
  /** The children to be rendered. */
  children: ReactNode;
  /** Component to wrap the label, receives headingProps. */
  Heading: ComponentType<
    HeadingProps &
      Pick<
        GroupProps<OptionType, HeadingProps>,
        'selectProps' | 'theme' | 'getStyles' | 'cx'
      >
  >;
  /** Props to pass to Heading. */
  headingProps: HeadingProps;
  /** Label to be displayed in the heading component. */
  label: ReactNode;
}

export const groupCSS = <OptionType extends OptionTypeBase, HeadingProps>({
  theme: { spacing },
}: GroupProps<OptionType, HeadingProps>) => ({
  paddingBottom: spacing.baseUnit * 2,
  paddingTop: spacing.baseUnit * 2,
});

const Group = <OptionType extends OptionTypeBase, HeadingProps>(
  props: GroupProps<OptionType, HeadingProps>
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

interface GroupHeadingClassNamesState {
  'group-heading': true;
}

interface GroupHeadingPassedProps {
  selectProps: unknown;
  theme: Theme;
  getStyles: (
    key: 'groupHeading',
    props: { theme: Theme } & JSX.IntrinsicElements['div']
  ) => Interpolation;
  cx: (state: GroupHeadingClassNamesState, className?: string) => string;
  className?: string;
}
export type GroupHeadingProps = GroupHeadingPassedProps &
  JSX.IntrinsicElements['div'];

export const groupHeadingCSS = <OptionType extends OptionTypeBase>({
  theme: { spacing },
}: GroupHeadingProps) => ({
  label: 'group',
  color: '#999',
  cursor: 'default',
  display: 'block',
  fontSize: '75%',
  fontWeight: '500',
  marginBottom: '0.25em',
  paddingLeft: spacing.baseUnit * 3,
  paddingRight: spacing.baseUnit * 3,
  textTransform: 'uppercase',
});

export const GroupHeading = (props: GroupHeadingProps) => {
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
