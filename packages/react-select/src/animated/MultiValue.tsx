import React, { ComponentType } from 'react';
import { MultiValueProps } from '../components/MultiValue';
import { Collapse } from './transitions';

// strip transition props off before spreading onto actual component

const AnimatedMultiValue = (
  WrappedComponent: ComponentType<MultiValueProps>
): ComponentType<MultiValueProps> => {
  return ({ in: inProp, onExited, ...props }) => (
    <Collapse in={inProp} onExited={onExited}>
      <WrappedComponent cropWithEllipsis={inProp} {...props} />
    </Collapse>
  );
};

export default AnimatedMultiValue;
