import React, { Component } from 'react';

import AsyncSelect from 'react-select/async';
import { ColourOption, colourOptions } from '../data';

interface State {
  inputValue: string;
}

const filterColors = (inputValue: string) => {
  return colourOptions.filter((i) =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  );
};

const promiseOptions = (inputValue: string): Promise<ColourOption[]> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(filterColors(inputValue));
    }, 1000);
  });

export default class AsyncMulti extends Component<{}, State> {
  state: State = { inputValue: '' };
  render() {
    return (
      <AsyncSelect
        isMulti
        cacheOptions
        defaultOptions
        loadOptions={promiseOptions}
      />
    );
  }
}
