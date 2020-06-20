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
import { GroupProps } from 'react-select/src/components/Group';

const groupStyles = {
  border: `2px dotted ${colourOptions[2].color}`,
  borderRadius: '5px',
  background: '#f2fcff',
};

const Group = <
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>(
  props: GroupProps<OptionType, GroupType, IsMultiType>
) => (
  <div style={groupStyles}>
    <components.Group {...props} />
  </div>
);

export default () => (
  <Select<ColourOption | FlavourOption, GroupedOption, false>
    defaultValue={colourOptions[1]}
    options={groupedOptions}
    components={{ Group }}
  />
);
