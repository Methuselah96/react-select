import React, { ReactElement } from 'react';

import Select, {
  CSSPropertiesWithLabel,
  GroupTypeBase,
  OptionTypeBase,
} from 'react-select';
import { colourOptions } from '../data';
import { ClearIndicatorProps } from 'react-select/src/components/indicators';

const CustomClearText = () => ('clear all' as unknown) as ReactElement;
const ClearIndicator = <
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>(
  props: ClearIndicatorProps<OptionType, GroupType, IsMultiType>
) => {
  const {
    children = <CustomClearText />,
    getStyles,
    innerProps: { ref, ...restInnerProps },
  } = props;
  return (
    <div
      {...restInnerProps}
      ref={ref}
      style={getStyles('clearIndicator', props)}
    >
      <div style={{ padding: '0px 5px' }}>{children}</div>
    </div>
  );
};

const ClearIndicatorStyles = <
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>(
  base: CSSPropertiesWithLabel,
  state: ClearIndicatorProps<OptionType, GroupType, IsMultiType>
) => ({
  ...base,
  cursor: 'pointer',
  color: state.isFocused ? 'blue' : 'black',
});

export default function CustomClearIndicator() {
  return (
    <Select
      closeMenuOnSelect={false}
      components={{ ClearIndicator }}
      styles={{ clearIndicator: ClearIndicatorStyles }}
      defaultValue={[colourOptions[4], colourOptions[5]]}
      isMulti
      options={colourOptions}
    />
  );
}
