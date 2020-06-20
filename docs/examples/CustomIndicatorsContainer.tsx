import React from 'react';
import Select, {
  components,
  GroupTypeBase,
  OptionTypeBase,
} from 'react-select';
import { colourOptions } from '../data';
import { IndicatorsContainerProps } from 'react-select/src/components/containers';

const IndicatorsContainer = <
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>(
  props: IndicatorsContainerProps<OptionType, GroupType, IsMultiType>
) => {
  return (
    <div style={{ background: colourOptions[2].color }}>
      <components.IndicatorsContainer<OptionType, GroupType, IsMultiType>
        {...props}
      />
    </div>
  );
};

export default () => (
  <Select
    closeMenuOnSelect={false}
    components={{ IndicatorsContainer }}
    defaultValue={[colourOptions[4], colourOptions[5]]}
    isMulti
    options={colourOptions}
  />
);
