import React from 'react';

import Select, { components } from 'react-select';
import { colourOptions, groupedOptions } from '../data';
import { MenuListProps } from 'react-select/src/components/Menu';

const menuHeaderStyle = {
  padding: '8px 12px',
  background: colourOptions[2].color,
  color: 'white',
};

const MenuList = (props: MenuListProps) => {
  return (
    <components.MenuList {...props}>
      <div style={menuHeaderStyle}>Custom Menu List</div>
      {props.children}
    </components.MenuList>
  );
};

export default () => (
  <Select
    defaultValue={colourOptions[1]}
    options={groupedOptions}
    components={{ MenuList }}
  />
);
