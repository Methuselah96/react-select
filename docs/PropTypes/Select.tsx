import { Component } from 'react';
import { Props, defaultProps } from 'react-select/src/Select';
import { GroupTypeBase, OptionTypeBase } from 'react-select/src';

export default class Select<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
> extends Component<Props<OptionType, GroupType, IsMultiType>> {
  defaultProps = defaultProps;
}
