import React from 'react';

import MultiValue, { MultiValueProps } from '../components/MultiValue';
import { Collapse, CollapseProps } from './transitions';
import { GroupTypeBase, OptionTypeBase } from '../types';

export type AnimatedMultiValueProps<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
> = Omit<
  MultiValueProps<OptionType, GroupType, IsMultiType>,
  'cropWithEllipsis'
> &
  CollapseProps;

// strip transition props off before spreading onto actual component
const AnimatedMultiValue = (WrappedComponent: typeof MultiValue) => {
  return <
    OptionType extends OptionTypeBase,
    GroupType extends GroupTypeBase<OptionType>,
    IsMultiType extends boolean
  >({
    in: inProp,
    onExited,
    ...props
  }: AnimatedMultiValueProps<OptionType, GroupType, IsMultiType>) => (
    <Collapse in={inProp} onExited={onExited}>
      <WrappedComponent cropWithEllipsis={inProp} {...props} />
    </Collapse>
  );
};

export default AnimatedMultiValue;
