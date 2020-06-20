import { Component } from 'react';
import { ContainerProps } from 'react-select/src/components/containers';
import { GroupTypeBase, OptionTypeBase } from 'react-select/src';

export default class SelectContainer<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
> extends Component<ContainerProps<OptionType, GroupType, IsMultiType>> {}
