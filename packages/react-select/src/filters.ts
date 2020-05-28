interface Config {
  ignoreCase?: boolean;
  ignoreAccents?: boolean;
  stringify?: (obj: Object) => string;
  trim?: boolean;
  matchFrom?: 'any' | 'start';
}

import { stripDiacritics } from './diacritics';

const trimString = str => str.replace(/^\s+|\s+$/g, '');
const defaultStringify = option => `${option.label} ${option.value}`;

export const createFilter = (config: Config | null | undefined) => (
  option: { label: string, value: string, data: any },
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
