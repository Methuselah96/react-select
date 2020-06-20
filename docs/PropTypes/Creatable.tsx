import { Component } from 'react';

import { CreatableProps, defaultProps } from 'react-select/src/Creatable';
import { GroupTypeBase, OptionTypeBase } from 'react-select/src';

export default class Select<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
> extends Component<CreatableProps<OptionType, GroupType, IsMultiType>> {
  defaultProps = defaultProps;
}
