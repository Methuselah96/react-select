import { Component } from 'react';
import { ClearIndicatorProps } from 'react-select/src/components/indicators';
import { GroupTypeBase, OptionTypeBase } from 'react-select/src';

export default class ClearIndicator<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
> extends Component<ClearIndicatorProps<OptionType, GroupType, IsMultiType>> {}
