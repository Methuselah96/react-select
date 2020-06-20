import React from 'react';
import Tooltip from '@atlaskit/tooltip';
import Select, {
  components,
  GroupTypeBase,
  OptionTypeBase,
} from 'react-select';
import { colourOptions } from '../data';
import { OptionProps } from 'react-select/src/components/Option';

const Option = <
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>(
  props: OptionProps<OptionType, GroupType, IsMultiType>
) => {
  return (
    <Tooltip content={'Customise your option component!'} truncateText>
      <components.Option<OptionType, GroupType, IsMultiType> {...props} />
    </Tooltip>
  );
};

export default () => (
  <Select
    closeMenuOnSelect={false}
    components={{ Option }}
    styles={{
      option: (base) => ({
        ...base,
        border: `1px dotted ${colourOptions[2].color}`,
        height: '100%',
      }),
    }}
    defaultValue={colourOptions[4]}
    options={colourOptions}
  />
);
