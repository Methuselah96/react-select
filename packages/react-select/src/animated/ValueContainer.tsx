import React, { ComponentType } from 'react';
import { TransitionGroup } from 'react-transition-group';
import { ValueContainerProps } from '../components/containers';
import { TransitionGroupProps } from 'react-transition-group/TransitionGroup';

// make ValueContainer a transition group
const AnimatedValueContainer = (
  WrappedComponent: ComponentType<ValueContainerProps>
): ComponentType<ValueContainerProps & TransitionGroupProps> => (props) => (
  <TransitionGroup component={WrappedComponent} {...props} />
);

export default AnimatedValueContainer;
