import { Component, ReactElement } from 'react';
import { findDOMNode } from 'react-dom';

type Props = {
  children: ReactElement,
  innerRef: (element: HTMLElement) => void,
};

export default class NodeResolver extends Component<Props> {
  componentDidMount() {
    this.props.innerRef(findDOMNode(this));
  }
  componentWillUnmount() {
    this.props.innerRef(null);
  }
  render() {
    return this.props.children;
  }
}
