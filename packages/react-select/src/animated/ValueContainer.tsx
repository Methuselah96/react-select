import React, { ComponentType } from 'react';
import { TransitionGroup } from 'react-transition-group';
import { ValueContainerProps } from '../components/containers';

// make ValueContainer a transition group
const AnimatedValueContainer = (
  WrappedComponent: ComponentType<ValueContainerProps>
): ComponentType<ValueContainerProps> => (props) => (
  <TransitionGroup component={WrappedComponent} {...props} />
);

export default AnimatedValueContainer;
