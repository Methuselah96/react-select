import React from 'react';

import Select, {
  components,
  GroupTypeBase,
  OptionTypeBase,
} from 'react-select';
import {
  ColourOption,
  colourOptions,
  FlavourOption,
  GroupedOption,
  groupedOptions,
} from '../data';
import EditorPanelIcon from '@atlaskit/icon/glyph/editor/panel';
import Tooltip from '@atlaskit/tooltip';
import { GroupHeadingProps } from 'react-select/src/components/Group';

const groupStyles = {
  border: `2px dotted ${colourOptions[2].color}`,
  color: 'white',
  background: colourOptions[2].color,
  padding: '5px 0px',
  display: 'flex',
};

const GroupHeading = <
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>(
  props: GroupHeadingProps<OptionType, GroupType, IsMultiType>
) => (
  <div style={groupStyles}>
    <components.GroupHeading {...props} />
    <Tooltip content="Custom GroupHeading Component">
      <EditorPanelIcon label="" />
    </Tooltip>
  </div>
);

export default () => (
  <Select<ColourOption | FlavourOption, GroupedOption, false>
    defaultValue={colourOptions[1]}
    options={groupedOptions}
    components={{ GroupHeading }}
    styles={{
      groupHeading: (base) => ({
        ...base,
        flex: '1 1',
        color: 'white',
        margin: 0,
      }),
    }}
  />
);
