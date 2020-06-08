import { GroupTypeBase, OptionTypeBase } from './types';

export const formatGroupLabel = <
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>
>(
  group: GroupType
): string => group.label;

export const getOptionLabel = <
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>
>(
  option: OptionType
): string => option.label;

export const getOptionValue = <OptionType extends OptionTypeBase>(
  option: OptionType
): string => option.value;

export const isOptionDisabled = <OptionType extends OptionTypeBase>(
  option: OptionType
): boolean => !!option.isDisabled;
