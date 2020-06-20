import React from 'react';
import Tooltip from '@atlaskit/tooltip';
import AsyncSelect from 'react-select/async';
import { ColourOption, colourOptions } from '../data';
import { GroupTypeBase, OptionTypeBase } from 'react-select/src';
import { NoticeProps } from 'react-select/src/components/Menu';

const LoadingMessage = <
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>(
  props: NoticeProps<OptionType, GroupType, IsMultiType>
) => {
  return (
    <Tooltip content={'Custom Loading Message'}>
      <div
        {...props.innerProps}
        style={props.getStyles('loadingMessage', props)}
      >
        {props.children}
      </div>
    </Tooltip>
  );
};

const filterColors = (inputValue: string) =>
  colourOptions.filter((i) =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  );

const promiseOptions = (inputValue: string): Promise<ColourOption[]> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(filterColors(inputValue));
    }, 1000);
  });

const CustomLoadingMessage = () => {
  return (
    <AsyncSelect
      cacheOptions
      defaultOptions
      loadOptions={promiseOptions}
      styles={{
        loadingMessage: (base) => ({
          ...base,
          backgroundColor: colourOptions[2].color,
          color: 'white',
        }),
      }}
      components={{ LoadingMessage }}
    />
  );
};

export default CustomLoadingMessage;
