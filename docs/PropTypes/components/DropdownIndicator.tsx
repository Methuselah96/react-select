import { Component } from 'react';
import { DropdownIndicatorProps } from 'react-select/src/components/indicators';
import { GroupTypeBase, OptionTypeBase } from 'react-select/src';

export default class DropdownIndicator<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
> extends Component<
  DropdownIndicatorProps<OptionType, GroupType, IsMultiType>
> {}
