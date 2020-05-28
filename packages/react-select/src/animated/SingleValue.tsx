import React, { ComponentType } from 'react';
import { SingleValueProps } from '../components/SingleValue';
import { Fade } from './transitions';

// instant fade; all transition-group children must be transitions

const AnimatedSingleValue = (
  WrappedComponent: ComponentType<SingleValueProps>
): ComponentType<SingleValueProps> => (props) => (
  <Fade component={WrappedComponent} {...props} />
);

export default AnimatedSingleValue;
