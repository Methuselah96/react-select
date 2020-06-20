import { OptionTypeBase } from './types';

interface Option<OptionType extends OptionTypeBase> {
  label: string;
  value: string;
  data: OptionType;
}

export interface Config<OptionType extends OptionTypeBase> {
  ignoreCase?: boolean;
  ignoreAccents?: boolean;
  stringify?: (option: Option<OptionType>) => string;
  trim?: boolean;
  matchFrom?: 'any' | 'start';
}

import { stripDiacritics } from './diacritics';

const trimString = (str: string) => str.replace(/^\s+|\s+$/g, '');
const defaultStringify = <OptionType extends OptionTypeBase>(
  option: OptionType
) => `${option.label} ${option.value}`;

export const createFilter = <OptionType extends OptionTypeBase>(
  config?: Config<OptionType> | null
) => (
  option: { label: string; value: string; data: any },
  rawInput: string
): boolean => {
  const { ignoreCase, ignoreAccents, stringify, trim, matchFrom } = {
    ignoreCase: true,
    ignoreAccents: true,
    stringify: defaultStringify,
    trim: true,
    matchFrom: 'any',
    ...config,
  };
  let input = trim ? trimString(rawInput) : rawInput;
  let candidate = trim ? trimString(stringify(option)) : stringify(option);
  if (ignoreCase) {
    input = input.toLowerCase();
    candidate = candidate.toLowerCase();
  }
  if (ignoreAccents) {
    input = stripDiacritics(input);
    candidate = stripDiacritics(candidate);
  }
  return matchFrom === 'start'
    ? candidate.substr(0, input.length) === input
    : candidate.indexOf(input) > -1;
};
