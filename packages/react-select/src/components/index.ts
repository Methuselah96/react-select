import { ComponentType, ReactComponentElement } from 'react';

import {
  ContainerProps,
  IndicatorsContainer,
  IndicatorsContainerProps,
  SelectContainer,
  ValueContainer,
  ValueContainerProps,
} from './containers';
import {
  ClearIndicator,
  DropdownIndicator,
  LoadingIndicator,
  IndicatorSeparator,
  DownChevron,
  CrossIcon,
  ClearIndicatorProps,
  DropdownIndicatorProps,
  IndicatorSeparatorProps,
  LoadingIndicatorProps,
} from './indicators';
import Control, { ControlProps } from './Control';
import Group, { GroupHeading, GroupHeadingProps, GroupProps } from './Group';
import Input, { InputProps } from './Input';
import Menu, {
  MenuList,
  MenuPortal,
  NoOptionsMessage,
  LoadingMessage,
  MenuProps,
  MenuListProps,
  MenuPortalProps,
  NoticeProps,
} from './Menu';
import MultiValue, {
  MultiValueContainer,
  MultiValueGenericProps,
  MultiValueLabel,
  MultiValueProps,
  MultiValueRemove,
  MultiValueRemoveProps,
} from './MultiValue';
import Option, { OptionProps } from './Option';
import Placeholder, { PlaceholderProps } from './Placeholder';
import SingleValue, { SingleValueProps } from './SingleValue';
import { GroupTypeBase, OptionTypeBase } from '../types';

export type PlaceholderOrValue =
  | ReactComponentElement<typeof Placeholder>
  | ReactComponentElement<typeof SingleValue>
  | ReactComponentElement<typeof MultiValue>[];

export const components: SelectComponents<
  OptionTypeBase,
  GroupTypeBase<OptionTypeBase>,
  boolean
> = {
  ClearIndicator: ClearIndicator,
  Control: Control,
  DropdownIndicator: DropdownIndicator,
  DownChevron: DownChevron,
  CrossIcon: CrossIcon,
  Group: Group,
  GroupHeading: GroupHeading,
  IndicatorsContainer: IndicatorsContainer,
  IndicatorSeparator: IndicatorSeparator,
  Input: Input,
  LoadingIndicator: LoadingIndicator,
  Menu: Menu,
  MenuList: MenuList,
  MenuPortal: MenuPortal,
  LoadingMessage: LoadingMessage,
  NoOptionsMessage: NoOptionsMessage,
  MultiValue: MultiValue,
  MultiValueContainer: MultiValueContainer,
  MultiValueLabel: MultiValueLabel,
  MultiValueRemove: MultiValueRemove,
  Option: Option,
  Placeholder: Placeholder,
  SelectContainer: SelectContainer,
  SingleValue: SingleValue,
  ValueContainer: ValueContainer,
};

export interface SelectComponents<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
> {
  ClearIndicator: ComponentType<
    ClearIndicatorProps<OptionType, GroupType, IsMultiType>
  >;
  Control: ComponentType<ControlProps<OptionType, GroupType, IsMultiType>>;
  DropdownIndicator: ComponentType<
    DropdownIndicatorProps<OptionType, GroupType, IsMultiType>
  >;
  DownChevron: ComponentType<JSX.IntrinsicElements['svg'] & { size?: number }>;
  CrossIcon: ComponentType<JSX.IntrinsicElements['svg'] & { size?: number }>;
  Group: ComponentType<GroupProps<OptionType, GroupType, IsMultiType>>;
  GroupHeading: ComponentType<
    GroupHeadingProps<OptionType, GroupType, IsMultiType>
  >;
  IndicatorsContainer: ComponentType<
    IndicatorsContainerProps<OptionType, GroupType, IsMultiType>
  >;
  IndicatorSeparator: ComponentType<
    IndicatorSeparatorProps<OptionType, GroupType, IsMultiType>
  >;
  Input: ComponentType<InputProps<OptionType, GroupType, IsMultiType>>;
  LoadingIndicator: ComponentType<
    LoadingIndicatorProps<OptionType, GroupType, IsMultiType>
  >;
  Menu: ComponentType<MenuProps<OptionType, GroupType, IsMultiType>>;
  MenuList: ComponentType<MenuListProps<OptionType, GroupType, IsMultiType>>;
  MenuPortal: ComponentType<
    MenuPortalProps<OptionType, GroupType, IsMultiType>
  >;
  LoadingMessage: ComponentType<
    NoticeProps<OptionType, GroupType, IsMultiType>
  >;
  NoOptionsMessage: ComponentType<
    NoticeProps<OptionType, GroupType, IsMultiType>
  >;
  MultiValue: ComponentType<
    MultiValueProps<OptionType, GroupType, IsMultiType>
  >;
  MultiValueContainer: ComponentType<
    MultiValueGenericProps<OptionType, GroupType, IsMultiType>
  >;
  MultiValueLabel: ComponentType<
    MultiValueGenericProps<OptionType, GroupType, IsMultiType>
  >;
  MultiValueRemove: ComponentType<
    MultiValueRemoveProps<OptionType, GroupType, IsMultiType>
  >;
  Option: ComponentType<OptionProps<OptionType, GroupType, IsMultiType>>;
  Placeholder: ComponentType<
    PlaceholderProps<OptionType, GroupType, IsMultiType>
  >;
  SelectContainer: ComponentType<
    ContainerProps<OptionType, GroupType, IsMultiType>
  >;
  SingleValue: ComponentType<
    SingleValueProps<OptionType, GroupType, IsMultiType>
  >;
  ValueContainer: ComponentType<
    ValueContainerProps<OptionType, GroupType, IsMultiType>
  >;
}
export type SelectComponentsConfig<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
> = Partial<SelectComponents<OptionType, GroupType, IsMultiType>>;

interface Props<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
> {
  components: SelectComponentsConfig<OptionType, GroupType, IsMultiType>;
}

export const defaultComponents = <
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>(
  props: Props<OptionType, GroupType, IsMultiType>
) => ({
  ...components,
  ...props.components,
});
