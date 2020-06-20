import React from 'react';
import Tooltip from '@atlaskit/tooltip';
import Select, {
  components,
  CSSPropertiesWithLabel,
  GroupTypeBase,
  OptionTypeBase,
} from 'react-select';
import { colourOptions } from '../data';
import { NoticeProps } from 'react-select/src/components/Menu';
const msgStyles = {
  background: colourOptions[2].color,
  color: 'white',
};

const NoOptionsMessage = <
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>(
  props: NoticeProps<OptionType, GroupType, IsMultiType>
) => {
  return (
    <Tooltip content="Custom NoOptionsMessage Component">
      <components.NoOptionsMessage<OptionType, GroupType, IsMultiType>
        {...props}
      />
    </Tooltip>
  );
};

const CustomNoOptionsMessage = () => {
  return (
    <Select
      isClearable
      components={{ NoOptionsMessage }}
      styles={{
        noOptionsMessage: (base: CSSPropertiesWithLabel) => ({
          ...base,
          ...msgStyles,
        }),
      }}
      isSearchable
      name="color"
      options={[]}
    />
  );
};

export default CustomNoOptionsMessage;
