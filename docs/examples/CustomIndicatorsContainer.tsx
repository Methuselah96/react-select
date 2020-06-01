import React from 'react';
import Select, { components } from 'react-select';
import { ColourOption, colourOptions } from '../data';
import { IndicatorContainerProps } from 'react-select/src/components/containers';

const IndicatorsContainer = (props: IndicatorContainerProps<ColourOption>) => {
  return (
    <div style={{ background: colourOptions[2].color }}>
      <components.IndicatorsContainer {...props} />
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
