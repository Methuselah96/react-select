import React from 'react';
import { TransitionGroup } from 'react-transition-group';

import { ValueContainer, ValueContainerProps } from '../components/containers';
import { GroupTypeBase, OptionTypeBase } from '../types';

export type AnimatedValueContainerProps<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
> = ValueContainerProps<OptionType, GroupType, IsMultiType>;

const TransitionGroupAsAny: any = TransitionGroup;

// make ValueContainer a transition group
const AnimatedValueContainer = (WrappedComponent: typeof ValueContainer) => <
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>(
  props: AnimatedValueContainerProps<OptionType, GroupType, IsMultiType>
) => <TransitionGroupAsAny component={WrappedComponent} {...props} />;

export default AnimatedValueContainer;
