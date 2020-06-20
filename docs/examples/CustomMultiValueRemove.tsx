import React from 'react';
import EmojiIcon from '@atlaskit/icon/glyph/emoji';
import Tooltip from '@atlaskit/tooltip';
import Select, {
  components,
  GroupTypeBase,
  OptionTypeBase,
} from 'react-select';
import { colourOptions } from '../data';
import { MultiValueRemoveProps } from 'react-select/src/components/MultiValue';

const MultiValueRemove = <
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>(
  props: MultiValueRemoveProps<OptionType, GroupType, IsMultiType>
) => {
  return (
    <Tooltip
      content={'Customise your multi-value remove component!'}
      truncateText
    >
      <components.MultiValueRemove {...props}>
        <EmojiIcon primaryColor={colourOptions[2].color} />
      </components.MultiValueRemove>
    </Tooltip>
  );
};

export default () => (
  <Select
    closeMenuOnSelect={false}
    components={{ MultiValueRemove }}
    styles={{
      multiValueRemove: (base) => ({
        ...base,
        border: `1px dotted ${colourOptions[2].color}`,
        height: '100%',
      }),
    }}
    defaultValue={[colourOptions[4], colourOptions[5]]}
    isMulti
    options={colourOptions}
  />
);
