import { Component } from 'react';

import { Props as AsyncProps, defaultProps } from 'react-select/src/Async';
import { GroupTypeBase, OptionTypeBase } from 'react-select/src';
import { default as SelectBase } from 'react-select/src/Select';

export default class Select<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
> extends Component<
  AsyncProps<OptionType, GroupType, IsMultiType, typeof SelectBase>
> {
  defaultProps = defaultProps;
}
