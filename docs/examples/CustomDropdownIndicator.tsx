import React from 'react';
import EmojiIcon from '@atlaskit/icon/glyph/emoji';
import Select, { components, IndicatorProps } from 'react-select';
import { ColourOption, colourOptions } from '../data';

const DropdownIndicator = (props: IndicatorProps<ColourOption>) => {
  return (
    <components.DropdownIndicator {...props}>
      <EmojiIcon primaryColor={colourOptions[2].color} />
    </components.DropdownIndicator>
  );
};

export default () => (
  <Select
    closeMenuOnSelect={false}
    components={{ DropdownIndicator }}
    defaultValue={[colourOptions[4], colourOptions[5]]}
    isMulti
    options={colourOptions}
  />
);
