import { Component } from 'react';
import { Props, defaultProps } from 'react-select/src/stateManager';
import { GroupTypeBase, OptionTypeBase } from 'react-select/src';
import Select from 'react-select/src/Select';

export default class StateManager<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
> extends Component<Props<OptionType, GroupType, IsMultiType, typeof Select>> {
  defaultProps = defaultProps;
}
