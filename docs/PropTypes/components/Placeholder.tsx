import { Component } from 'react';
import { PlaceholderProps } from 'react-select/src/components/Placeholder';
import { GroupTypeBase, OptionTypeBase } from 'react-select/src';

export default class Placeholder<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
> extends Component<PlaceholderProps<OptionType, GroupType, IsMultiType>> {}
