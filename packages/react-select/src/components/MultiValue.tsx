/** @jsx jsx */
import {
  ComponentType,
  MouseEventHandler,
  ReactNode,
  TouchEventHandler,
} from 'react';
import { jsx, ClassNames } from '@emotion/core';

import { CrossIcon } from './indicators';
import {
  CommonProps,
  CSSPropertiesWithLabel,
  GroupTypeBase,
  OptionTypeBase,
} from '../types';
import { Props as SelectProps } from '../Select';

export interface MultiValueClassNamesState {
  'multi-value': true;
  'multi-value--is-disabled': boolean;
}

export interface MultiValueLabelClassNamesState {
  'multi-value__label': true;
}

export interface MultiValueRemoveClassNamesState {
  'multi-value__remove': true;
}

export interface MultiValueProps<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
> extends CommonProps<OptionType, GroupType, IsMultiType> {
  className?: string;
  components: {
    Container: ComponentType<
      MultiValueGenericProps<OptionType, GroupType, IsMultiType>
    >;
    Label: ComponentType<
      MultiValueGenericProps<OptionType, GroupType, IsMultiType>
    >;
    Remove: ComponentType<
      MultiValueRemoveProps<OptionType, GroupType, IsMultiType>
    >;
  };
  isFocused: boolean;
  isDisabled: boolean;
  index: number;
  removeProps: {
    onClick: MouseEventHandler<HTMLDivElement>;
    onTouchEnd: TouchEventHandler<HTMLDivElement>;
    onMouseDown: MouseEventHandler<HTMLDivElement>;
  };
  data: OptionType;
  cropWithEllipsis: boolean;
  innerProps?: {};
  children: ReactNode;
}

export const multiValueCSS = <
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>({
  theme: { spacing, borderRadius, colors },
}: MultiValueProps<
  OptionType,
  GroupType,
  IsMultiType
>): CSSPropertiesWithLabel => ({
  label: 'multiValue',
  backgroundColor: colors.neutral10,
  borderRadius: borderRadius / 2,
  display: 'flex',
  margin: spacing.baseUnit / 2,
  minWidth: 0, // resolves flex/text-overflow bug
});

export const multiValueLabelCSS = <
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>({
  theme: { borderRadius, colors },
  cropWithEllipsis,
}: MultiValueProps<
  OptionType,
  GroupType,
  IsMultiType
>): CSSPropertiesWithLabel => ({
  borderRadius: borderRadius / 2,
  color: colors.neutral80,
  fontSize: '85%',
  overflow: 'hidden',
  padding: 3,
  paddingLeft: 6,
  textOverflow: cropWithEllipsis ? 'ellipsis' : undefined,
  whiteSpace: 'nowrap',
});

export const multiValueRemoveCSS = <
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>({
  theme: { spacing, borderRadius, colors },
  isFocused,
}: MultiValueProps<
  OptionType,
  GroupType,
  IsMultiType
>): CSSPropertiesWithLabel => ({
  alignItems: 'center',
  borderRadius: borderRadius / 2,
  backgroundColor: isFocused ? colors.dangerLight : undefined,
  display: 'flex',
  paddingLeft: spacing.baseUnit,
  paddingRight: spacing.baseUnit,
  ':hover': {
    backgroundColor: colors.dangerLight,
    color: colors.danger,
  },
});

export interface MultiValueGenericProps<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
> {
  children: ReactNode;
  data: OptionType;
  innerProps: { className?: string };
  selectProps: SelectProps<OptionType, GroupType, IsMultiType>;
}
export const MultiValueGeneric = <
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>({
  children,
  innerProps,
}: MultiValueGenericProps<OptionType, GroupType, IsMultiType>) => (
  <div {...innerProps}>{children}</div>
);

export const MultiValueContainer = MultiValueGeneric;
export const MultiValueLabel = MultiValueGeneric;
export interface MultiValueRemoveProps<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
> {
  children?: ReactNode;
  data: OptionType;
  innerProps: {
    className: string;
    onTouchEnd: TouchEventHandler<HTMLDivElement>;
    onClick: MouseEventHandler<HTMLDivElement>;
    onMouseDown: MouseEventHandler<HTMLDivElement>;
  };
  selectProps: SelectProps<OptionType, GroupType, IsMultiType>;
}
export function MultiValueRemove<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>({
  children,
  innerProps,
}: MultiValueRemoveProps<OptionType, GroupType, IsMultiType>) {
  return <div {...innerProps}>{children || <CrossIcon size={14} />}</div>;
}

const MultiValue = <
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>(
  props: MultiValueProps<OptionType, GroupType, IsMultiType>
) => {
  const {
    children,
    className,
    components,
    cx,
    data,
    getStyles,
    innerProps,
    isDisabled,
    removeProps,
    selectProps,
  } = props;

  const { Container, Label, Remove } = components;

  return (
    <ClassNames>
      {({ css, cx: emotionCx }) => (
        <Container
          data={data}
          innerProps={{
            ...innerProps,
            className: emotionCx(
              css(getStyles('multiValue', props)),
              cx(
                {
                  'multi-value': true,
                  'multi-value--is-disabled': isDisabled,
                },
                className
              )
            ),
          }}
          selectProps={selectProps}
        >
          <Label
            data={data}
            innerProps={{
              className: emotionCx(
                css(getStyles('multiValueLabel', props)),
                cx(
                  {
                    'multi-value__label': true,
                  },
                  className
                )
              ),
            }}
            selectProps={selectProps}
          >
            {children}
          </Label>
          <Remove
            data={data}
            innerProps={{
              className: emotionCx(
                css(getStyles('multiValueRemove', props)),
                cx(
                  {
                    'multi-value__remove': true,
                  },
                  className
                )
              ),
              ...removeProps,
            }}
            selectProps={selectProps}
          />
        </Container>
      )}
    </ClassNames>
  );
};

MultiValue.defaultProps = {
  cropWithEllipsis: true,
};

export default MultiValue;
