import React from 'react';
import Tooltip from '@atlaskit/tooltip';
import Select, {
  components,
  GroupTypeBase,
  OptionTypeBase,
} from 'react-select';
import { colourOptions } from '../data';
import { MultiValueGenericProps } from 'react-select/src/components/MultiValue';

const MultiValueLabel = <
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>(
  props: MultiValueGenericProps<OptionType, GroupType, IsMultiType>
) => {
  return (
    <Tooltip content={'Customise your multi-value label component!'}>
      <components.MultiValueLabel {...props} />
    </Tooltip>
  );
};

export default () => (
  <Select
    closeMenuOnSelect={false}
    components={{ MultiValueLabel }}
    styles={{
      multiValueLabel: (base) => ({
        ...base,
        backgroundColor: colourOptions[2].color,
        color: 'white',
      }),
    }}
    defaultValue={[colourOptions[4], colourOptions[5]]}
    isMulti
    options={colourOptions}
  />
);
