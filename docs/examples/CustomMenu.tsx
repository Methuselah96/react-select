import React, { Fragment } from 'react';

import Select, { components, GroupType, MenuProps } from 'react-select';
import {
  ColourOption,
  colourOptions,
  FlavourOption,
  groupedOptions,
} from '../data';

function getLength(options: GroupType<ColourOption | FlavourOption>): number {
  return Object.values(options).reduce((acc, curr) => {
    if (curr.options) return acc + getLength(curr.options);
    return acc + 1;
  }, 0);
}

const menuHeaderStyle = {
  padding: '8px 12px',
};

const Menu = (props: MenuProps<ColourOption | FlavourOption>) => {
  const optionsLength = getLength(props.options);
  return (
    <Fragment>
      <div style={menuHeaderStyle}>
        Custom Menu with {optionsLength} options
      </div>
      <components.Menu {...props}>{props.children}</components.Menu>
    </Fragment>
  );
};

export default () => (
  <Select
    defaultValue={colourOptions[1]}
    options={groupedOptions}
    components={{ Menu }}
  />
);
