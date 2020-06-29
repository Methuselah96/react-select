import React from 'react';
import { TransitionActions } from 'react-transition-group/Transition';

import { InputProps } from '../components/Input';
import { GroupTypeBase, OptionTypeBase } from '../types';
import { BaseTransition } from './transitions';
import { InputComponentType } from '../components';

export type AnimatedInputProps<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
> = InputProps<OptionType, GroupType, IsMultiType> &
  BaseTransition &
  TransitionActions;

// strip transition props off before spreading onto select component
// note we need to be explicit about innerRef for flow
const AnimatedInput = (WrappedComponent: InputComponentType) => {
  return <
    OptionType extends OptionTypeBase,
    GroupType extends GroupTypeBase<OptionType>,
    IsMultiType extends boolean
  >({
    in: inProp,
    onExited,
    appear,
    enter,
    exit,
    ...props
  }: AnimatedInputProps<OptionType, GroupType, IsMultiType>) => (
    <WrappedComponent<OptionType, GroupType, IsMultiType> {...props} />
  );
};

export default AnimatedInput;
