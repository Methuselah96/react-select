import React, { Fragment } from 'react';

import Select, {
  components,
  GroupsType,
  GroupTypeBase,
  OptionsType,
  OptionTypeBase,
} from 'react-select';
import {
  ColourOption,
  colourOptions,
  FlavourOption,
  GroupedOption,
  groupedOptions,
} from '../data';
import { MenuProps } from 'react-select/src/components/Menu';

function getLength<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>
>(options: OptionsType<OptionType> | GroupsType<OptionType, GroupType>) {
  return options.reduce<number>((acc: number, curr: OptionType | GroupType) => {
    if ((curr as GroupType).options)
      return acc + getLength((curr as GroupType).options);
    return acc + 1;
  }, 0);
}

const menuHeaderStyle = {
  padding: '8px 12px',
};

const Menu = <
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>(
  props: MenuProps<OptionType, GroupType, IsMultiType>
) => {
  const optionsLength = getLength(props.options);
  return (
    <Fragment>
      <div style={menuHeaderStyle}>
        Custom Menu with {optionsLength} options
      </div>
      <components.Menu<OptionType, GroupType, IsMultiType> {...props}>
        {props.children}
      </components.Menu>
    </Fragment>
  );
};

export default () => (
  <Select<ColourOption | FlavourOption, GroupedOption, false>
    defaultValue={colourOptions[1]}
    options={groupedOptions}
    components={{ Menu }}
  />
);
