import { Component } from 'react';
import { InputProps } from 'react-select/src/components/Input';
import { GroupTypeBase, OptionTypeBase } from 'react-select/src';

export default class Input<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
> extends Component<InputProps<OptionType, GroupType, IsMultiType>> {}
