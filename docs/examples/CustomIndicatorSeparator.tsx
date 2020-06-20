import React from 'react';
import Select, { GroupTypeBase, OptionTypeBase } from 'react-select';
import { colourOptions } from '../data';
import { IndicatorSeparatorProps } from 'react-select/src/components/indicators';

const indicatorSeparatorStyle = {
  alignSelf: 'stretch',
  backgroundColor: colourOptions[2].color,
  marginBottom: 8,
  marginTop: 8,
  width: 1,
};

const IndicatorSeparator = <
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>({
  innerProps,
}: IndicatorSeparatorProps<OptionType, GroupType, IsMultiType>) => {
  return <span style={indicatorSeparatorStyle} {...innerProps} />;
};

export default () => (
  <Select
    closeMenuOnSelect={false}
    components={{ IndicatorSeparator }}
    defaultValue={[colourOptions[4], colourOptions[5]]}
    isMulti
    options={colourOptions}
  />
);
