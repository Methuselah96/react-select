import React from 'react';
import Select, {
  components,
  GroupTypeBase,
  OptionTypeBase,
} from 'react-select';
import { colourOptions } from '../data';
import { PlaceholderProps } from 'react-select/src/components/Placeholder';

const Placeholder = <
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>(
  props: PlaceholderProps<OptionType, GroupType, IsMultiType>
) => {
  return (
    <components.Placeholder<OptionType, GroupType, IsMultiType> {...props} />
  );
};

export default () => (
  <Select
    closeMenuOnSelect={false}
    components={{ Placeholder }}
    placeholder={'custom placeholder component'}
    styles={{
      placeholder: (base) => ({
        ...base,
        fontSize: '1em',
        color: colourOptions[2].color,
        fontWeight: 400,
      }),
    }}
    options={colourOptions}
  />
);
