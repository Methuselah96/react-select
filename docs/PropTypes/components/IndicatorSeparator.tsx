import { Component } from 'react';
import { IndicatorSeparatorProps } from 'react-select/src/components/indicators';
import { GroupTypeBase, OptionTypeBase } from 'react-select/src';

export default class IndicatorSeparator<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
> extends Component<
  IndicatorSeparatorProps<OptionType, GroupType, IsMultiType>
> {}
