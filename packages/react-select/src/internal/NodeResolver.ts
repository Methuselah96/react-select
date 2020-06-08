import { Component, ReactElement, RefCallback } from 'react';
import { findDOMNode } from 'react-dom';

interface Props {
  children: ReactElement;
  innerRef: RefCallback<Element | Text | null>;
}

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
