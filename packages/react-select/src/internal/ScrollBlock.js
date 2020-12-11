// @flow
/** @jsx jsx */
import React, { Children, PureComponent, type Element } from 'react';
import { jsx } from '@emotion/core';
import ScrollLock from './ScrollLock/index';

type Props = {
  children: Element<*>,
  isEnabled: boolean,
  innerRef?: (ref: ?HTMLElement) => mixed,
};
type State = {
  touchScrollTarget: HTMLElement | null,
};

// NOTE:
// We shouldn't need this after updating to React v16.3.0, which introduces:
// - createRef() https://reactjs.org/docs/react-api.html#reactcreateref
// - forwardRef() https://reactjs.org/docs/react-api.html#reactforwardref

export default class ScrollBlock extends PureComponent<Props, State> {
  state = { touchScrollTarget: null };

  callInnerRefFromParent = (element: ?HTMLElement) => {
    const { innerRef } = this.props;
    if (innerRef) innerRef(element);
  };

  childInnerRef = (element: ?HTMLElement) => {
    const { children, isEnabled } = this.props;

    Children.only(children).props.innerRef(element);

    if (isEnabled) {
      // must be in state to trigger a re-render, only runs once per instance
      if (element === this.state.touchScrollTarget) return;
      this.setState({ touchScrollTarget: element });
    } else {
      this.callInnerRefFromParent(element);
    }
  };

  // this will close the menu when a user clicks outside
  blurSelectInput = () => {
    if (document.activeElement) {
      document.activeElement.blur();
    }
  };

  render() {
    const { children, isEnabled } = this.props;
    const { touchScrollTarget } = this.state;

    const childElement = Children.only(children);

    // bail early if not enabled
    if (!isEnabled) {
      return React.cloneElement(childElement, {
        innerRef: this.childInnerRef,
      });
    }

    /*
     * Div
     * ------------------------------
     * blocks scrolling on non-body elements behind the menu

     * NodeResolver
     * ------------------------------
     * we need a reference to the scrollable element to "unlock" scroll on
     * mobile devices

     * ScrollLock
     * ------------------------------
     * actually does the scroll locking
     */
    return (
      <div ref={this.callInnerRefFromParent}>
        <div
          onClick={this.blurSelectInput}
          css={{ position: 'fixed', left: 0, bottom: 0, right: 0, top: 0 }}
        />
        {React.cloneElement(childElement, {
          innerRef: this.childInnerRef,
        })}
        {touchScrollTarget ? (
          <ScrollLock touchScrollTarget={touchScrollTarget} />
        ) : null}
      </div>
    );
  }
}
