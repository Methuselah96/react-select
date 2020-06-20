import { Component } from 'react';
import { ValueContainerProps } from 'react-select/src/components/containers';
import { GroupTypeBase, OptionTypeBase } from 'react-select/src';

export default class ValueContainer<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
> extends Component<ValueContainerProps<OptionType, GroupType, IsMultiType>> {}
