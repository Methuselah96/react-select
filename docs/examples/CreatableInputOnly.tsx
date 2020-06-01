import React, { Component } from 'react';

import CreatableSelect from 'react-select/creatable';
import { ActionMeta, KeyboardEventHandler, ValueType } from 'react-select';

const components = {
  DropdownIndicator: null,
};

interface Option {
  label: string;
  value: string;
}

interface State {
  inputValue: string;
  value: ValueType<Option, true>;
}

const createOption = (label: string) => ({
  label,
  value: label,
});

export default class CreatableInputOnly extends Component<{}, State> {
  state: State = {
    inputValue: '',
    value: [],
  };
  handleChange = (
    value: ValueType<Option, true>,
    actionMeta: ActionMeta<Option>
  ) => {
    console.group('Value Changed');
    console.log(value);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
    this.setState({ value });
  };
  handleInputChange = (inputValue: string) => {
    this.setState({ inputValue });
  };
  handleKeyDown: KeyboardEventHandler = (event) => {
    const { inputValue, value } = this.state;
    if (!inputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        console.group('Value Added');
        console.log(value);
        console.groupEnd();
        this.setState({
          inputValue: '',
          value: [...value, createOption(inputValue)],
        });
        event.preventDefault();
    }
  };
  render() {
    const { inputValue, value } = this.state;
    return (
      <CreatableSelect
        components={components}
        inputValue={inputValue}
        isClearable
        isMulti
        menuIsOpen={false}
        onChange={this.handleChange}
        onInputChange={this.handleInputChange}
        onKeyDown={this.handleKeyDown}
        placeholder="Type something and press enter..."
        value={value}
      />
    );
  }
}