import React, { ComponentType } from 'react';
import { MultiValueProps } from '../components/MultiValue';
import { BaseTransition, Collapse } from './transitions';

// strip transition props off before spreading onto actual component

const AnimatedMultiValue = (
  WrappedComponent: ComponentType<MultiValueProps>
): ComponentType<Omit<MultiValueProps, 'cropWithEllipsis'> & BaseTransition> => {
  return ({ in: inProp, onExited, ...props }) => (
    <Collapse in={inProp} onExited={onExited}>
      <WrappedComponent cropWithEllipsis={inProp} {...props} />
    </Collapse>
  );
};

export default AnimatedMultiValue;
