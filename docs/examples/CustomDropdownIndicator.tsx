import React from 'react';
import EmojiIcon from '@atlaskit/icon/glyph/emoji';
import Select, {
  components,
  GroupTypeBase,
  OptionTypeBase,
} from 'react-select';
import { colourOptions } from '../data';
import { DropdownIndicatorProps } from 'react-select/src/components/indicators';

const DropdownIndicator = <
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>(
  props: DropdownIndicatorProps<OptionType, GroupType, IsMultiType>
) => {
  return (
    <components.DropdownIndicator<OptionType, GroupType, IsMultiType>
      {...props}
    >
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
