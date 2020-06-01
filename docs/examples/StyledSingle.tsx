import React, { CSSProperties } from 'react';
import chroma from 'chroma-js';

import { colourOptions } from '../data';
import Select from 'react-select';

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
  control: (styles: CSSProperties) => ({ ...styles, backgroundColor: 'white' }),
  option: (
    styles: CSSProperties,
    { data, isDisabled, isFocused, isSelected }: any
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
  input: (styles: CSSProperties) => ({ ...styles, ...dot() }),
  placeholder: (styles: CSSProperties) => ({ ...styles, ...dot() }),
  singleValue: (styles: CSSProperties, { data }: any) => ({
    ...styles,
    ...dot(data.color),
  }),
};

export default () => (
  <Select
    defaultValue={colourOptions[2]}
    label="Single select"
    options={colourOptions}
    styles={colourStyles}
  />
);