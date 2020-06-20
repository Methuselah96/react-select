import React, { Component } from 'react';
import Select, {
  components,
  GroupTypeBase,
  OptionTypeBase,
} from 'react-select';
import { colourOptions } from '../data';
import { ValueContainerProps } from 'react-select/src/components/containers';

const ValueContainer = <
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>({
  children,
  ...props
}: ValueContainerProps<OptionType, GroupType, IsMultiType>) => (
  <components.ValueContainer<OptionType, GroupType, IsMultiType> {...props}>
    {children}
  </components.ValueContainer>
);

export default class CustomControl extends Component {
  render() {
    return (
      <Select
        defaultValue={colourOptions[0]}
        isClearable
        styles={{
          singleValue: (base) => ({ ...base, color: 'white' }),
          valueContainer: (base) => ({
            ...base,
            background: colourOptions[2].color,
            color: 'white',
            width: '100%',
          }),
        }}
        components={{ ValueContainer }}
        isSearchable
        name="color"
        options={colourOptions}
      />
    );
  }
}
