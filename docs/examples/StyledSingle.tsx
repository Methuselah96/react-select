import React from 'react';
import chroma from 'chroma-js';

import { ColourOption, colourOptions } from '../data';
import Select, { CSSPropertiesWithLabel, GroupTypeBase } from 'react-select';
import { OptionProps } from 'react-select/src/components/Option';
import { SingleValueProps } from 'react-select/src/components/SingleValue';

const dot = (color = '#ccc') => ({
  alignItems: 'center',
  display: 'flex',

  ':before': {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: 'block',
    marginRight: 8,
    height: 10,
    width: 10,
  },
});

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
    }: OptionProps<ColourOption, GroupTypeBase<ColourOption>, false>
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
  input: (styles: CSSPropertiesWithLabel) => ({ ...styles, ...dot() }),
  placeholder: (styles: CSSPropertiesWithLabel) => ({ ...styles, ...dot() }),
  singleValue: (
    styles: CSSPropertiesWithLabel,
    { data }: SingleValueProps<ColourOption, GroupTypeBase<ColourOption>, false>
  ) => ({ ...styles, ...dot(data.color) }),
};

export default () => (
  <Select
    defaultValue={colourOptions[2]}
    label="Single select"
    options={colourOptions}
    styles={colourStyles}
  />
);
