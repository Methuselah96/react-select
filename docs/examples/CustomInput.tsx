import React from 'react';
import Tooltip from '@atlaskit/tooltip';
import Select, {
  components,
  GroupTypeBase,
  OptionTypeBase,
} from 'react-select';
import { colourOptions } from '../data';
import { InputProps } from 'react-select/src/components/Input';

const Input = <
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>(
  props: InputProps<OptionType, GroupType, IsMultiType>
) => {
  if (props.isHidden) {
    return <components.Input {...props} />;
  }
  return (
    <div style={{ border: `1px dotted ${colourOptions[2].color}` }}>
      <Tooltip content={'Custom Input'}>
        <components.Input {...props} />
      </Tooltip>
    </div>
  );
};

export default () => (
  <Select
    closeMenuOnSelect={false}
    components={{ Input }}
    defaultValue={[colourOptions[4], colourOptions[5]]}
    isMulti
    options={colourOptions}
  />
);
