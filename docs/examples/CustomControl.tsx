import React, { Component } from 'react';

import Select, {
  components,
  GroupTypeBase,
  OptionTypeBase,
} from 'react-select';
import { colourOptions } from '../data';
import { ControlProps } from 'react-select/src/components/Control';
const controlStyles = {
  borderRadius: '1px solid black',
  padding: '5px',
  background: colourOptions[2].color,
  color: 'white',
};

const ControlComponent = <
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>(
  props: ControlProps<OptionType, GroupType, IsMultiType>
) => (
  <div style={controlStyles}>
    {<p>Custom Control</p>}
    <components.Control<OptionType, GroupType, IsMultiType> {...props} />
  </div>
);

export default class CustomControl extends Component {
  render() {
    return (
      <Select
        defaultValue={colourOptions[0]}
        isClearable
        components={{ Control: ControlComponent }}
        isSearchable
        name="color"
        options={colourOptions}
      />
    );
  }
}
