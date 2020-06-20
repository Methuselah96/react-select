import { Component } from 'react';
import { GroupProps } from 'react-select/src/components/Group';
import { GroupTypeBase, OptionTypeBase } from 'react-select/src';

export default class Group<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
> extends Component<GroupProps<OptionType, GroupType, IsMultiType>> {}
