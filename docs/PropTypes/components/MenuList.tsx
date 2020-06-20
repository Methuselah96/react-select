import { Component } from 'react';
import { MenuListProps } from 'react-select/src/components/Menu';
import { GroupTypeBase, OptionTypeBase } from 'react-select/src';

export default class MenuList<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
> extends Component<MenuListProps<OptionType, GroupType, IsMultiType>> {}
