import { Component } from 'react';
import { SingleValueProps } from 'react-select/src/components/SingleValue';
import { GroupTypeBase, OptionTypeBase } from 'react-select/src';

export default class SingleValue<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
> extends Component<SingleValueProps<OptionType, GroupType, IsMultiType>> {}
