import React from 'react';

import Placeholder, { PlaceholderProps } from '../components/Placeholder';
import { Fade, collapseDuration } from './transitions';
import { GroupTypeBase, OptionTypeBase } from '../types';

export type AnimatedPlaceholderProps<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
> = PlaceholderProps<OptionType, GroupType, IsMultiType>;

// fade in when last multi-value removed, otherwise instant
const AnimatedPlaceholder = <
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>(
  WrappedComponent: typeof Placeholder
) => (props: AnimatedPlaceholderProps<OptionType, GroupType, IsMultiType>) => (
  <Fade
    component={WrappedComponent}
    duration={props.isMulti ? collapseDuration : 1}
    {...props}
  />
);

export default AnimatedPlaceholder;
