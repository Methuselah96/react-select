import React, { ComponentType, CSSProperties } from 'react';

import Placeholder, { PlaceholderProps } from '../components/Placeholder';
import { Fade, collapseDuration, BaseTransition } from './transitions';
import { GroupTypeBase, OptionTypeBase } from '../types';

export type AnimatedPlaceholderProps<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
> = PlaceholderProps<OptionType, GroupType, IsMultiType> & BaseTransition;

// fade in when last multi-value removed, otherwise instant
const AnimatedPlaceholder = (WrappedComponent: typeof Placeholder) => <
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>(
  props: AnimatedPlaceholderProps<OptionType, GroupType, IsMultiType>
) => (
  <Fade
    component={
      WrappedComponent as ComponentType<{
        innerProps: { style: CSSProperties };
      }>
    }
    duration={props.isMulti ? collapseDuration : 1}
    {...props}
  />
);

export default AnimatedPlaceholder;
