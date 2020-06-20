import React, { Component, Fragment, ReactNode } from 'react';

import Select, {
  components,
  GroupTypeBase,
  OptionTypeBase,
} from 'react-select';
import md from '../../markdown/renderer';
import { OptionProps } from 'react-select/src/components/Option';

const Code = ({ children }: { children: ReactNode }) => <code>{children}</code>;

const propChangeData = [
  ['aria-describedby', 'unchanged'],
  ['aria-label', 'unchanged'],
  ['aria-labelledby', 'unchanged'],
  ['arrowRenderer', 'components'],
  ['autoBlur', 'renamed', 'blurInputOnSelect'],
  ['autoFocus', 'unchanged'],
  ['autoLoad', 'removed', 'see the Async component (defaultOptions)'],
  ['autosize', 'components'],
  ['backspaceRemoves', 'renamed', 'backspaceRemovesValue'],
  [
    'backspaceToRemoveMessage',
    'removed',
    'may be implemented in a later version',
  ],
  ['className', 'unchanged'],
  ['clearable', 'renamed', 'isClearable'],
  ['clearAllText', 'removed'],
  ['clearRenderer', 'components'],
  ['clearValueText', 'removed'],
  ['closeOnSelect', 'renamed', 'closeMenuOnSelect'],
  ['deleteRemoves', 'removed'],
  ['delimiter', 'unchanged'],
  ['disabled', 'renamed', 'isDisabled'],
  ['escapeClearsValue', 'unchanged'],
  [
    'filterOptions',
    'removed',
    md`
use \`filterOption\` instead
    `,
  ],
  ['id', 'unchanged'],
  [
    'ignoreAccents',
    'removed',
    md`
see \`createFilter()\`
    `,
  ],
  [
    'ignoreCase',
    'removed',
    md`
see \`createFilter()\`
    `,
  ],
  ['inputProps', 'components'],
  ['inputRenderer', 'components'],
  ['instanceId', 'unchanged'],
  ['isLoading', 'unchanged'],
  [
    'joinValues',
    'removed',
    md`
now inferred from \`delimiter\`
    `,
  ],
  ['labelKey', 'removed'],
  ['loadOptions', 'unchanged'],
  [
    'matchPos',
    'removed',
    md`
see \`createFilter()\`
    `,
  ],
  [
    'matchProp',
    'removed',
    md`
see \`createFilter()\`
    `,
  ],
  ['menuBuffer', 'styles'],
  ['menuContainerStyle', 'styles'],
  ['menuRenderer', 'components'],
  ['menuStyle', 'styles'],
  ['multi', 'renamed', 'isMulti'],
  ['name', 'unchanged'],
  ['noResultsText', 'renamed', 'noOptionsMessage'],
  ['onBlur', 'unchanged'],
  ['onBlurResetsInput', 'removed'],
  ['onClose', 'renamed', 'onMenuClose'],
  ['onCloseResetsInput', 'removed'],
  ['onFocus', 'unchanged'],
  ['onInputChange', 'unchanged'],
  ['onInputKeyDown', 'renamed', 'onKeyDown'],
  ['onMenuScrollToBottom', 'unchanged'],
  ['onOpen', 'renamed', 'onMenuOpen'],
  ['onSelectResetsInput', 'removed'],
  ['onValueClick', 'removed'],
  ['openOnClick', 'renamed', 'openMenuOnClick'],
  ['openOnFocus', 'renamed', 'openMenuOnFocus'],
  ['optionClassName', 'components'],
  ['optionComponent', 'components'],
  ['optionRenderer', 'components'],
  ['options', 'unchanged'],
  ['pageSize', 'unchanged'],
  ['placeholder', 'changed', 'now only accepts a string'],
  ['removeSelected', 'renamed', 'hideSelectedOptions'],
  ['required', 'removed', 'may be implemented in a later version'],
  [
    'resetValue',
    'removed',
    md`
control the \`value\` prop
    `,
  ],
  ['rtl', 'renamed', 'isRtl'],
  ['scrollMenuIntoView', 'renamed', 'menuShouldScrollIntoView'],
  ['searchable', 'renamed', 'isSearchable'],
  ['searchPromptText', 'removed'],
  ['simpleValue', 'removed'],
  ['style', 'styles'],
  ['tabIndex', 'unchanged'],
  ['tabSelectsValue', 'unchanged'],
  [
    'trimFilter',
    'removed',
    md`
see \`createFilter()\`
    `,
  ],
  ['value', 'unchanged'],
  ['valueComponent', 'components'],
  ['valueKey', 'removed'],
  ['valueRenderer', 'components'],
  ['wrapperStyle', 'styles'],
];

const Table = ({ children }: { children: ReactNode }) => (
  <table
    css={{
      width: '100%',
      marginTop: '30px',
      borderCollapse: 'collapse',
    }}
  >
    {children}
  </table>
);

const Header = ({ children }: { children: ReactNode }) => (
  <td
    css={{
      fontWeight: 'bold',
      padding: '4px 8px 4px 0',
      borderBottom: '3px solid #eee',
    }}
  >
    {children}
  </td>
);

const Cell = ({ children }: { children: ReactNode }) => (
  <td
    css={{
      fontSize: '90%',
      padding: '4px 8px 4px 0',
      borderBottom: '1px solid #eee',
      verticalAlign: 'top',
    }}
  >
    {children}
  </td>
);

interface PropStatusProps {
  prop: string;
  status: string;
  note?: string;
}

class PropStatus extends Component<PropStatusProps> {
  renderStatus() {
    const { status, note } = this.props;
    switch (status) {
      case 'components':
        return (
          <Fragment>
            <Cell>removed</Cell>
            <Cell>use the new Components API</Cell>
          </Fragment>
        );
      case 'styles':
        return (
          <Fragment>
            <Cell>removed</Cell>
            <Cell>use the new Styles API</Cell>
          </Fragment>
        );
      case 'renamed':
        return (
          <Fragment>
            <Cell>renamed</Cell>
            <Cell>
              use <Code>{note}</Code>
            </Cell>
          </Fragment>
        );
      default:
        return (
          <Fragment>
            <Cell>{status}</Cell>
            <Cell>{note}</Cell>
          </Fragment>
        );
    }
  }
  render() {
    const { prop } = this.props;
    return (
      <tr>
        <Cell>
          <Code>{prop}</Code>
        </Cell>
        {this.renderStatus()}
      </tr>
    );
  }
}

interface InputOptionState {
  isActive: boolean;
}

class InputOption<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
> extends Component<
  OptionProps<OptionType, GroupType, IsMultiType>,
  InputOptionState
> {
  state = { isActive: false };
  onMouseDown = () => this.setState({ isActive: true });
  onMouseUp = () => this.setState({ isActive: false });
  onMouseLeave = () => this.setState({ isActive: false });

  render() {
    const {
      getStyles,
      Icon,
      isDisabled,
      isFocused,
      isSelected,
      children,
      innerProps,
      ...rest
    } = this.props;
    const { isActive } = this.state;

    // styles
    let bg = 'transparent';
    if (isFocused) bg = '#eee';
    if (isActive) bg = '#B2D4FF';

    const style = {
      alignItems: 'center',
      backgroundColor: bg,
      color: 'inherit',
      display: 'flex ',
    };

    // prop assignment
    const props = {
      ...innerProps,
      onMouseDown: this.onMouseDown,
      onMouseUp: this.onMouseUp,
      onMouseLeave: this.onMouseLeave,
      style,
    };

    return (
      <components.Option<OptionType, GroupType, IsMultiType>
        {...rest}
        isDisabled={isDisabled}
        isFocused={isFocused}
        isSelected={isSelected}
        getStyles={getStyles}
        innerProps={props}
      >
        <input type="checkbox" checked={isSelected} />
        {children}
      </components.Option>
    );
  }
}

const allOptions = [
  { value: 'removed', label: 'removed' },
  { value: 'unchanged', label: 'unchanged' },
  { value: 'renamed', label: 'renamed' },
];

const filterOptions = [
  { value: 'propName', label: 'propName' },
  { value: 'status', label: 'status' },
];

const getDisplayedStatus = (status: string) => {
  if (status === 'components' || status === 'styles') return 'removed';
  else return status;
};

interface PropChangesState {
  selectedOptions: string[];
  filterValue: string;
}

class PropChanges extends Component<{}, PropChangesState> {
  state: PropChangesState = {
    selectedOptions: allOptions.map((opt) => opt.value),
    filterValue: filterOptions[0].value,
  };

  render() {
    let { selectedOptions, filterValue } = this.state;

    return (
      <Fragment>
        {/* filter */}
        <h4>Filter Props</h4>
        <Select
          defaultValue={allOptions}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          onChange={(options) => {
            if (Array.isArray(options)) {
              this.setState({
                selectedOptions: options.map((opt) => opt.value),
              });
            }
          }}
          options={allOptions}
          components={{
            Option: InputOption,
          }}
        />
        {/* sort */}
        <h4>Sort Props</h4>
        <Select
          defaultValue={filterOptions[0]}
          onChange={(option) => {
            if (!Array.isArray(option)) {
              this.setState({ filterValue: option ? option.value : '' });
            }
          }}
          options={filterOptions}
        />
        <Table>
          <thead>
            <tr>
              <Header>Prop</Header>
              <Header>Status</Header>
              <Header>Notes</Header>
            </tr>
          </thead>
          <tbody>
            {propChangeData
              .sort((a, b) => {
                if (filterValue === 'propName') {
                  return a[0].localeCompare(b[0]);
                } else {
                  return getDisplayedStatus(a[1]).localeCompare(
                    getDisplayedStatus(b[1])
                  );
                }
              })
              .map((data) => {
                const [prop, status, note] = data;
                return selectedOptions.includes(getDisplayedStatus(status)) ? (
                  <PropStatus
                    key={prop}
                    prop={prop}
                    status={status}
                    note={note}
                  />
                ) : null;
              })}
          </tbody>
        </Table>
      </Fragment>
    );
  }
}

export default PropChanges;
