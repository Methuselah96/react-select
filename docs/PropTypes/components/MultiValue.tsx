import { Component } from 'react';
import { MultiValueProps } from 'react-select/src/components/MultiValue';
import { GroupTypeBase, OptionTypeBase } from 'react-select/src';

export default class MultiValue<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
> extends Component<MultiValueProps<OptionType, GroupType, IsMultiType>> {}
