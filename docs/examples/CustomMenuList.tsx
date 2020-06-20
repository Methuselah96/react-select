import React from 'react';

import Select, {
  components,
  GroupTypeBase,
  OptionTypeBase,
} from 'react-select';
import {
  ColourOption,
  colourOptions,
  FlavourOption,
  GroupedOption,
  groupedOptions,
} from '../data';
import { MenuListProps } from 'react-select/src/components/Menu';

const menuHeaderStyle = {
  padding: '8px 12px',
  background: colourOptions[2].color,
  color: 'white',
};

const MenuList = <
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>(
  props: MenuListProps<OptionType, GroupType, IsMultiType>
) => {
  return (
    <components.MenuList<OptionType, GroupType, IsMultiType> {...props}>
      <div style={menuHeaderStyle}>Custom Menu List</div>
      {props.children}
    </components.MenuList>
  );
};

export default () => (
  <Select<ColourOption | FlavourOption, GroupedOption, false>
    defaultValue={colourOptions[1]}
    options={groupedOptions}
    components={{ MenuList }}
  />
);
