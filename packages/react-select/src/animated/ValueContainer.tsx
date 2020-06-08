import React from 'react';
import { TransitionGroup } from 'react-transition-group';
import { ValueContainer, ValueContainerProps } from '../components/containers';
import { GroupTypeBase, OptionTypeBase } from '../types';
import { TransitionGroupProps } from 'react-transition-group/TransitionGroup';

export type AnimatedValueContainerProps<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
> = ValueContainerProps<OptionType, GroupType, IsMultiType> &
  TransitionGroupProps;

// make ValueContainer a transition group
const AnimatedValueContainer = <
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>(
  WrappedComponent: typeof ValueContainer
) => (
  props: AnimatedValueContainerProps<OptionType, GroupType, IsMultiType>
) => <TransitionGroup component={WrappedComponent} {...props} />;

export default AnimatedValueContainer;
