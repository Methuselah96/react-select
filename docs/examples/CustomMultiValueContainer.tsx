import React from 'react';
import Tooltip from '@atlaskit/tooltip';
import Select, {
  components,
  GroupTypeBase,
  OptionTypeBase,
} from 'react-select';
import { colourOptions } from '../data';
import { MultiValueGenericProps } from 'react-select/src/components/MultiValue';

const MultiValueContainer = <
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>(
  props: MultiValueGenericProps<OptionType, GroupType, IsMultiType>
) => {
  return (
    <Tooltip content={'Customise your multi-value container!'}>
      <components.MultiValueContainer {...props} />
    </Tooltip>
  );
};

export default () => (
  <Select
    closeMenuOnSelect={false}
    components={{ MultiValueContainer }}
    styles={{
      multiValue: (base) => ({
        ...base,
        border: `2px dotted ${colourOptions[2].color}`,
      }),
    }}
    defaultValue={[colourOptions[4], colourOptions[5]]}
    isMulti
    options={colourOptions}
  />
);
