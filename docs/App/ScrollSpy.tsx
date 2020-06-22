import React, { Component, ReactElement } from 'react';
import rafSchedule from 'raf-schd';
import NodeResolver from 'react-node-resolver';

interface Props {
  children: ReactElement;
  onChange: (ids: string[]) => void;
}
interface State {
  elements: HTMLElement[];
}

function getStyle(el: HTMLElement, prop: 'padding-top' | 'margin-top') {
  const val = window.getComputedStyle(el, null).getPropertyValue(prop);
  return parseFloat(val);
}
function isInView(el: HTMLElement) {
  let rect = el.getBoundingClientRect();

  const topOffset =
    (getStyle(el, 'padding-top') + getStyle(el, 'margin-top')) * -1;

  if (rect.top >= topOffset && rect.bottom <= window.innerHeight) {
    return true;
  }

  return false;
}

export default class ScrollSpy extends Component<Props, State> {
  nav?: HTMLElement;
  allIds = [];
  state: State = { elements: [] };
  static defaultProps = { preserveHeight: false };
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, false);
    this.buildNodeList();
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  handleScroll = rafSchedule((event: Event) => {
    event.preventDefault();
    const { onChange } = this.props;
    const { elements } = this.state;
    if (!elements.length) return;

    const idsInView = elements
      .filter(isInView)
      .map((i) => i.getAttribute('id'));
    if (idsInView.length) {
      onChange(idsInView);
    }
  });
  getElements = (ref: HTMLElement) => {
    if (!ref) return;
    this.nav = ref;
  };
  buildNodeList = () => {
    if (!this.nav) return;

    const anchorList = this.nav.querySelectorAll('[data-hash]');
    const elements = Array.from(anchorList).map((i) =>
      document.querySelector(`#${i.dataset.hash}`)
    );

    this.setState({ elements });
  };
  render() {
    return (
      <NodeResolver innerRef={this.getElements}>
        {this.props.children}
      </NodeResolver>
    );
  }
}
