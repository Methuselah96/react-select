import React from 'react';
import chroma from 'chroma-js';

import { ColourOption, colourOptions } from '../data';
import Select, { CSSPropertiesWithLabel, GroupTypeBase } from 'react-select';
import { OptionProps } from 'react-select/src/components/Option';
import { MultiValueProps } from 'react-select/src/components/MultiValue';

const colourStyles = {
  control: (styles: CSSPropertiesWithLabel) => ({
    ...styles,
    backgroundColor: 'white',
  }),
  option: (
    styles: CSSPropertiesWithLabel,
    {
      data,
      isDisabled,
      isFocused,
      isSelected,
    }: OptionProps<ColourOption, GroupTypeBase<ColourOption>, true>
  ) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.1).css()
        : null,
      color: isDisabled
        ? '#ccc'
        : isSelected
        ? chroma.contrast(color, 'white') > 2
          ? 'white'
          : 'black'
        : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...styles[':active'],
        backgroundColor:
          !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
      },
    };
  },
  multiValue: (
    styles: CSSPropertiesWithLabel,
    { data }: MultiValueProps<ColourOption, GroupTypeBase<ColourOption>, true>
  ) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: color.alpha(0.1).css(),
    };
  },
  multiValueLabel: (
    styles: CSSPropertiesWithLabel,
    { data }: MultiValueProps<ColourOption, GroupTypeBase<ColourOption>, true>
  ) => ({
    ...styles,
    color: data.color,
  }),
  multiValueRemove: (
    styles: CSSPropertiesWithLabel,
    { data }: MultiValueProps<ColourOption, GroupTypeBase<ColourOption>, true>
  ) => ({
    ...styles,
    color: data.color,
    ':hover': {
      backgroundColor: data.color,
      color: 'white',
    },
  }),
};

export default () => (
  <Select
    closeMenuOnSelect={false}
    defaultValue={[colourOptions[0], colourOptions[1]]}
    isMulti
    options={colourOptions}
    styles={colourStyles}
  />
);
