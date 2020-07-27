interface ColourOption {
  value: string;
  label: string;
  color: string;
  isFixed?: boolean;
  isDisabled?: boolean;
}

interface FlavourOption {
  value: string;
  label: string;
  rating: string;
}

interface GroupedOption {
  label: string;
  options: ColourOption[] | FlavourOption[];
}

interface OptionLength {
  value: number;
  label: string;
}

export const colourOptions: ColourOption[];
export const optionLength: OptionLength[];
export const groupedOptions: GroupedOption[];
