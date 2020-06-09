import React, { ComponentType, CSSProperties } from 'react';

import SingleValue, { SingleValueProps } from '../components/SingleValue';
import { BaseTransition, Fade } from './transitions';
import { GroupTypeBase, OptionTypeBase } from '../types';

export type AnimatedSingleValueProps<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
> = SingleValueProps<OptionType, GroupType, IsMultiType> & BaseTransition;

// instant fade; all transition-group children must be transitions
const AnimatedSingleValue = <
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>(
  WrappedComponent: typeof SingleValue
) => (props: AnimatedSingleValueProps<OptionType, GroupType, IsMultiType>) => (
  <Fade
    component={
      WrappedComponent as ComponentType<{
        innerProps: { style: CSSProperties };
      }>
    }
    {...props}
  />
);

export default AnimatedSingleValue;
