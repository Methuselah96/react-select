import React, { ComponentType } from 'react';
import { InputProps } from '../components/Input';
import { TransitionActions } from 'react-transition-group/Transition';
import { BaseTransition } from './transitions';

// strip transition props off before spreading onto select component
// note we need to be explicit about innerRef for flow
const AnimatedInput = (
  WrappedComponent: ComponentType<InputProps>
): ComponentType<InputProps & BaseTransition & TransitionActions> => {
  return ({ in: inProp, onExited, appear, enter, exit, ...props }) => (
    <WrappedComponent {...props} />
  );
};

export default AnimatedInput;
