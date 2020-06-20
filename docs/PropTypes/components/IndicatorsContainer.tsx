import { Component } from 'react';
import { IndicatorsContainerProps } from 'react-select/src/components/containers';
import { GroupTypeBase, OptionTypeBase } from 'react-select/src';

export default class IndicatorContainer<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
> extends Component<
  IndicatorsContainerProps<OptionType, GroupType, IsMultiType>
> {}
