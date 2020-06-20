import React, { Component, Fragment } from 'react';
import Select, { createFilter } from 'react-select';
import { ColourOption, colourOptions } from '../data';
import { Note } from '../styled-components';
import { Config } from 'react-select/src/filters';

const Checkbox = (props: JSX.IntrinsicElements['input']) => (
  <input type="checkbox" {...props} />
);

interface State {
  ignoreCase: boolean;
  ignoreAccents: boolean;
  trim: boolean;
  matchFromStart: boolean;
}

export default class CreateFilter extends Component<{}, State> {
  state: State = {
    ignoreCase: false,
    ignoreAccents: false,
    trim: false,
    matchFromStart: false,
  };
  toggleOption = (key: keyof State) => () => {
    this.setState((state) => ({ [key]: !state[key] }));
  };
  render() {
    const { ignoreCase, ignoreAccents, trim, matchFromStart } = this.state;

    const filterConfig: Config<ColourOption> = {
      ignoreCase,
      ignoreAccents,
      trim,
      matchFrom: this.state.matchFromStart ? 'start' : 'any',
    };

    return (
      <Fragment>
        <Select
          defaultValue={colourOptions[0]}
          isClearable
          isSearchable
          name="color"
          options={colourOptions}
          filterOption={createFilter(filterConfig)}
        />
        <Note Tag="label">
          <Checkbox
            checked={ignoreCase}
            onChange={this.toggleOption('ignoreCase')}
            id="cypress-single__clearable-checkbox"
          />
          Ignore Case
        </Note>
        <Note Tag="label">
          <Checkbox
            checked={ignoreAccents}
            onChange={this.toggleOption('ignoreAccents')}
            id="cypress-single__clearable-checkbox"
          />
          Ignore Accents
        </Note>
        <Note Tag="label">
          <Checkbox
            checked={trim}
            onChange={this.toggleOption('trim')}
            id="cypress-single__clearable-checkbox"
          />
          Trim
        </Note>
        <Note Tag="label">
          <Checkbox
            checked={matchFromStart}
            onChange={this.toggleOption('matchFromStart')}
            id="cypress-single__clearable-checkbox"
          />
          Match from the start
        </Note>
      </Fragment>
    );
  }
}
