import { Component } from 'react';
import { OptionProps } from 'react-select/src/components/Option';
import { GroupTypeBase, OptionTypeBase } from 'react-select/src';

export default class Option<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
> extends Component<OptionProps<OptionType, GroupType, IsMultiType>> {}
