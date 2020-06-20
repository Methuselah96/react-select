import { Component } from 'react';
import { NoticeProps } from 'react-select/src/components/Menu';
import { GroupTypeBase, OptionTypeBase } from 'react-select/src';

export default class LoadingMessage<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
> extends Component<NoticeProps<OptionType, GroupType, IsMultiType>> {}
