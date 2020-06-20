import { Component } from 'react';
import { MenuProps } from 'react-select/src/components/Menu';
import { GroupTypeBase, OptionTypeBase } from 'react-select/src';

export default class Menu<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
> extends Component<MenuProps<OptionType, GroupType, IsMultiType>> {}
