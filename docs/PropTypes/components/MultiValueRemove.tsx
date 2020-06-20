import { Component } from 'react';
import { MultiValueGenericProps } from 'react-select/src/components/MultiValue';
import { GroupTypeBase, OptionTypeBase } from 'react-select/src';

export default class MultiValueRemove<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
> extends Component<
  MultiValueGenericProps<OptionType, GroupType, IsMultiType>
> {}
