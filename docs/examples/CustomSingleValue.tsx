import React, { Component } from 'react';
import Select, {
  components,
  GroupTypeBase,
  OptionTypeBase,
} from 'react-select';
import { colourOptions } from '../data';
import { SingleValueProps } from 'react-select/src/components/SingleValue';

const SingleValue = <
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>({
  children,
  ...props
}: SingleValueProps<OptionType, GroupType, IsMultiType>) => (
  <components.SingleValue<OptionType, GroupType, IsMultiType> {...props}>
    {children}
  </components.SingleValue>
);

export default class CustomControl extends Component {
  render() {
    return (
      <Select
        defaultValue={colourOptions[0]}
        isClearable
        styles={{
          singleValue: (base) => ({
            ...base,
            padding: 5,
            borderRadius: 5,
            background: colourOptions[2].color,
            color: 'white',
            display: 'flex',
          }),
        }}
        components={{ SingleValue }}
        isSearchable
        name="color"
        options={colourOptions}
      />
    );
  }
}
