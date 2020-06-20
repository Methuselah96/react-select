import React from 'react';
import Spinner from '@atlaskit/spinner';
import Tooltip from '@atlaskit/tooltip';
import AsyncSelect from 'react-select/async';
import { ColourOption, colourOptions } from '../data';
import { GroupTypeBase, OptionTypeBase } from 'react-select/src';
import { LoadingIndicatorProps } from 'react-select/src/components/indicators';

const LoadingIndicator = <
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>(
  props: LoadingIndicatorProps<OptionType, GroupType, IsMultiType>
) => {
  return (
    <Tooltip content={'Custom Loader'}>
      <Spinner {...props} delay={0} />
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

const CustomLoadingIndicator = () => {
  return (
    <AsyncSelect
      cacheOptions
      defaultOptions
      loadOptions={promiseOptions}
      components={{ LoadingIndicator }}
    />
  );
};

export default CustomLoadingIndicator;
