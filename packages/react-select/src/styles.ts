import {
  containerCSS,
  ContainerProps,
  IndicatorContainerProps,
  indicatorsContainerCSS,
  valueContainerCSS,
  ValueContainerProps,
} from './components/containers';
import { ControlProps, css as controlCSS } from './components/Control';
import {
  groupCSS,
  groupHeadingCSS,
  GroupHeadingProps,
  GroupProps,
} from './components/Group';
import {
  clearIndicatorCSS,
  dropdownIndicatorCSS,
  loadingIndicatorCSS,
  indicatorSeparatorCSS,
  DropdownIndicatorProps,
  ClearIndicatorProps,
  IndicatorSeparatorProps,
  LoadingIndicatorProps,
} from './components/indicators';
import { InputStylesProps, inputCSS } from './components/Input';
import { placeholderCSS, PlaceholderProps } from './components/Placeholder';
import { optionCSS, OptionProps } from './components/Option';
import {
  menuCSS,
  menuListCSS,
  menuPortalCSS,
  noOptionsMessageCSS,
  loadingMessageCSS,
  MenuProps,
  MenuListProps,
  NoticeProps,
  PortalStyleArgs,
} from './components/Menu';
import {
  css as singleValueCSS,
  SingleValueProps,
} from './components/SingleValue';
import {
  multiValueCSS,
  multiValueLabelCSS,
  MultiValueProps,
  multiValueRemoveCSS,
} from './components/MultiValue';
import { GroupTypeBase, OptionTypeBase } from './types';
import { Interpolation } from '@emotion/core';

export interface StylesProps<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
> {
  clearIndicator: ClearIndicatorProps<OptionType, GroupType, IsMultiType>;
  container: ContainerProps<OptionType, GroupType, IsMultiType>;
  control: ControlProps<OptionType, GroupType, IsMultiType>;
  dropdownIndicator: DropdownIndicatorProps<OptionType, GroupType, IsMultiType>;
  group: GroupProps<OptionType, GroupType, IsMultiType>;
  groupHeading: GroupHeadingProps<OptionType, GroupType, IsMultiType>;
  indicatorsContainer: IndicatorContainerProps<
    OptionType,
    GroupType,
    IsMultiType
  >;
  indicatorSeparator: IndicatorSeparatorProps<
    OptionType,
    GroupType,
    IsMultiType
  >;
  input: InputStylesProps<OptionType, GroupType, IsMultiType>;
  loadingIndicator: LoadingIndicatorProps<OptionType, GroupType, IsMultiType>;
  loadingMessage: NoticeProps<OptionType, GroupType, IsMultiType>;
  menu: MenuProps<OptionType, GroupType, IsMultiType>;
  menuList: MenuListProps<OptionType, GroupType, IsMultiType>;
  menuPortal: PortalStyleArgs;
  multiValue: MultiValueProps<OptionType, GroupType, IsMultiType>;
  multiValueLabel: MultiValueProps<OptionType, GroupType, IsMultiType>;
  multiValueRemove: MultiValueProps<OptionType, GroupType, IsMultiType>;
  noOptionsMessage: NoticeProps<OptionType, GroupType, IsMultiType>;
  option: OptionProps<OptionType, GroupType, IsMultiType>;
  placeholder: PlaceholderProps<OptionType, GroupType, IsMultiType>;
  singleValue: SingleValueProps<OptionType, GroupType, IsMultiType>;
  valueContainer: ValueContainerProps<OptionType, GroupType, IsMultiType>;
}

type StylesFunction<Props> = (props: Props) => Interpolation;
export type StylesFunctions<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
> = {
  [K in keyof StylesProps<OptionType, GroupType, IsMultiType>]: StylesFunction<
    StylesProps<OptionType, GroupType, IsMultiType>[K]
  >;
};

export type StylesConfig<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
> = Partial<StylesFunctions<OptionType, GroupType, IsMultiType>>;

export const defaultStyles: StylesFunctions<
  OptionTypeBase,
  GroupTypeBase<OptionTypeBase>,
  boolean
> = {
  clearIndicator: clearIndicatorCSS,
  container: containerCSS,
  control: controlCSS,
  dropdownIndicator: dropdownIndicatorCSS,
  group: groupCSS,
  groupHeading: groupHeadingCSS,
  indicatorsContainer: indicatorsContainerCSS,
  indicatorSeparator: indicatorSeparatorCSS,
  input: inputCSS,
  loadingIndicator: loadingIndicatorCSS,
  loadingMessage: loadingMessageCSS,
  menu: menuCSS,
  menuList: menuListCSS,
  menuPortal: menuPortalCSS,
  multiValue: multiValueCSS,
  multiValueLabel: multiValueLabelCSS,
  multiValueRemove: multiValueRemoveCSS,
  noOptionsMessage: noOptionsMessageCSS,
  option: optionCSS,
  placeholder: placeholderCSS,
  singleValue: singleValueCSS,
  valueContainer: valueContainerCSS,
};

// Merge Utility
// Allows consumers to extend a base Select with additional styles

export function mergeStyles<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>(
  source: StylesConfig<OptionType, GroupType, IsMultiType>,
  target: StylesConfig<OptionType, GroupType, IsMultiType> = {}
) {
  // initialize with source styles
  const styles = { ...source };

  // massage in target styles
  Object.keys(target).forEach((keyAsString) => {
    const key = keyAsString as keyof StylesConfig<
      OptionType,
      GroupType,
      IsMultiType
    >;
    if (source[key]) {
      styles[key] = (rsCss, props) => {
        return target[key](source[key](rsCss, props), props);
      };
    } else {
      styles[key] = target[key];
    }
  });

  return styles;
}
