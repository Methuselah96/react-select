import { Component } from 'react';
import { ControlProps } from 'react-select/src/components/Control';
import { GroupTypeBase, OptionTypeBase } from 'react-select/src';

export default class Control<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
> extends Component<ControlProps<OptionType, GroupType, IsMultiType>> {}
