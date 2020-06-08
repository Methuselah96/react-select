import React from 'react';
import Input, { InputProps } from '../components/Input';
import { GroupTypeBase, OptionTypeBase } from '../types';
import { BaseTransition } from './transitions';
import { TransitionActions } from 'react-transition-group/Transition';

export type AnimatedInputProps<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
> = InputProps<OptionType, GroupType, IsMultiType> &
  BaseTransition &
  TransitionActions;

// strip transition props off before spreading onto select component
// note we need to be explicit about innerRef for flow
const AnimatedInput = <
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>(
  WrappedComponent: typeof Input
) => {
  return ({
    in: inProp,
    onExited,
    appear,
    enter,
    exit,
    ...props
  }: AnimatedInputProps<OptionType, GroupType, IsMultiType>) => (
    <WrappedComponent {...props} />
  );
};

export default AnimatedInput;
