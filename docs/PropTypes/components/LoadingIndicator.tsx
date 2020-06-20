import { Component } from 'react';
import { LoadingIndicatorProps } from 'react-select/src/components/indicators';
import { GroupTypeBase, OptionTypeBase } from 'react-select/src';

export default class LoadingIndicator<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
> extends Component<
  LoadingIndicatorProps<OptionType, GroupType, IsMultiType>
> {}
