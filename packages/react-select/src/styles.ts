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
import { inputCSS } from './components/Input';
import { placeholderCSS, PlaceholderProps } from './components/Placeholder';
import { optionCSS } from './components/Option';
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
import { OptionTypeBase } from './types';
import { Interpolation } from '@emotion/core';

type StyleFunction<Props> = (props: Props) => Interpolation;

export interface DefaultStyles {
  clearIndicator: StyleFunction<ClearIndicatorProps<OptionTypeBase>>;
  container: StyleFunction<ContainerProps<OptionTypeBase>>;
  control: StyleFunction<ControlProps<OptionTypeBase>>;
  dropdownIndicator: StyleFunction<DropdownIndicatorProps<OptionTypeBase>>;
  group: StyleFunction<GroupProps<OptionTypeBase>>;
  groupHeading: StyleFunction<GroupHeadingProps<OptionTypeBase>>;
  indicatorsContainer: StyleFunction<IndicatorContainerProps<OptionTypeBase>>;
  indicatorSeparator: StyleFunction<IndicatorSeparatorProps<OptionTypeBase>>;
  input?: StyleFn;
  loadingIndicator: StyleFunction<LoadingIndicatorProps<OptionTypeBase>>;
  loadingMessage: StyleFunction<NoticeProps<OptionTypeBase>>;
  menu: StyleFunction<MenuProps<OptionTypeBase>>;
  menuList: StyleFunction<MenuListProps<OptionTypeBase>>;
  menuPortal: StyleFunction<PortalStyleArgs>;
  multiValue: StyleFunction<MultiValueProps<OptionTypeBase>>;
  multiValueLabel: StyleFunction<MultiValueProps<OptionTypeBase>>;
  multiValueRemove: StyleFunction<MultiValueProps<OptionTypeBase>>;
  noOptionsMessage: StyleFunction<NoticeProps<OptionTypeBase>>;
  option?: StyleFn;
  placeholder: StyleFunction<PlaceholderProps<OptionTypeBase>>;
  singleValue: StyleFunction<SingleValueProps<OptionTypeBase>>;
  valueContainer: StyleFunction<ValueContainerProps<OptionTypeBase>>;
}

export const defaultStyles: DefaultStyles = {
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

export function mergeStyles(source: Object, target: Object = {}) {
  // initialize with source styles
  const styles = { ...source };

  // massage in target styles
  Object.keys(target).forEach((key) => {
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
