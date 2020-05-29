import React, { ComponentType } from 'react';
import { SingleValueProps } from '../components/SingleValue';
import { Fade, FadeProps } from './transitions';

// instant fade; all transition-group children must be transitions

const AnimatedSingleValue = (
  WrappedComponent: ComponentType<SingleValueProps>
): ComponentType<SingleValueProps & Omit<FadeProps, 'component'>> => (props) => (
  <Fade component={WrappedComponent} {...props} />
);

export default AnimatedSingleValue;
