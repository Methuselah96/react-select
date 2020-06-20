import React from 'react';
import Select, {
  components,
  GroupTypeBase,
  OptionTypeBase,
} from 'react-select';
import Tooltip from '@atlaskit/tooltip';
import { colourOptions } from '../data';
import { ContainerProps } from 'react-select/src/components/containers';

const SelectContainer = <
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>({
  children,
  ...props
}: ContainerProps<OptionType, GroupType, IsMultiType>) => {
  return (
    <Tooltip content={'customise your select container'} delay={0}>
      <components.SelectContainer<OptionType, GroupType, IsMultiType>
        {...props}
      >
        {children}
      </components.SelectContainer>
    </Tooltip>
  );
};

export default () => (
  <Select
    closeMenuOnSelect={false}
    components={{ SelectContainer }}
    styles={{
      container: (base) => ({
        ...base,
        backgroundColor: colourOptions[2].color,
        padding: 5,
      }),
    }}
    options={colourOptions}
  />
);
