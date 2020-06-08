import { GroupTypeBase, OptionTypeBase } from './types';

export const formatGroupLabel = <
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>
>(
  group: GroupType
) => group.label!;

export const getOptionLabel = <
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>
>(
  option: OptionType
) => option.label!;

export const getOptionValue = <OptionType extends OptionTypeBase>(
  option: OptionType
) => option.value!;

export const isOptionDisabled = <OptionType extends OptionTypeBase>(
  option: OptionType
) => !!option.isDisabled;
