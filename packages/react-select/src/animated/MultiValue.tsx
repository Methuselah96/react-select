import React, { ComponentType } from 'react';
import { MultiValueProps } from '../components/MultiValue';
import { Collapse } from './transitions';
import { OptionTypeBase } from '../types';

// strip transition props off before spreading onto actual component

const AnimatedMultiValue = <OptionType extends OptionTypeBase>(
  WrappedComponent: ComponentType<MultiValueProps<OptionType>>
): ComponentType<MultiValueProps<OptionType>> => {
  return ({ in: inProp, onExited, ...props }) => (
    <Collapse in={inProp} onExited={onExited}>
      <WrappedComponent cropWithEllipsis={inProp} {...props} />
    </Collapse>
  );
};

export default AnimatedMultiValue;
