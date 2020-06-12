import {
  ClassNamesState,
  InputActionMeta,
  OptionsType,
  OptionTypeBase,
  ValueType,
  GroupTypeBase,
  MultiValueType,
  SingleValueType,
} from './types';

// ==============================
// NO OP
// ==============================

export const noop = () => {};
export const emptyString = () => '';

// ==============================
// Class Name Prefixer
// ==============================

/**
 String representation of component state for styling with class names.

 Expects an array of strings OR a string/object pair:
 - className(['comp', 'comp-arg', 'comp-arg-2'])
   @returns 'react-select__comp react-select__comp-arg react-select__comp-arg-2'
 - className('comp', { some: true, state: false })
   @returns 'react-select__comp react-select__comp--some'
*/
function applyPrefixToName(prefix: string, name: string) {
  if (!name) {
    return prefix;
  } else if (name[0] === '-') {
    return prefix + name;
  } else {
    return prefix + '__' + name;
  }
}

export function classNames(
  prefix?: string | null,
  state?: ClassNamesState,
  className?: string
) {
  const arr = [className];
  if (state && prefix) {
    for (let key in state) {
      if (state.hasOwnProperty(key) && state[key as keyof ClassNamesState]) {
        arr.push(`${applyPrefixToName(prefix, key)}`);
      }
    }
  }

  return arr
    .filter((i) => i)
    .map((i) => String(i).trim())
    .join(' ');
}
// ==============================
// Clean Value
// ==============================

export const cleanValue = <
  OptionType extends OptionTypeBase,
  IsMultiType extends boolean
>(
  value: ValueType<OptionType, IsMultiType> | undefined
): OptionsType<OptionType> => {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === 'object' && value !== null) return [value as OptionType];
  return [];
};

// ==============================
// Handle Input Change
// ==============================

export function handleInputChange(
  inputValue: string,
  actionMeta: InputActionMeta,
  onInputChange?: (
    newValue: string,
    actionMeta: InputActionMeta
  ) => string | void
) {
  if (onInputChange) {
    const newValue = onInputChange(inputValue, actionMeta);
    if (typeof newValue === 'string') return newValue;
  }
  return inputValue;
}

// ==============================
// Scroll Helpers
// ==============================

export function isDocumentElement(el: Element) {
  return (
    [document.documentElement, document.body, window].indexOf(
      el as HTMLElement
    ) > -1
  );
}

// Normalized Scroll Top
// ------------------------------

export function normalizedHeight(el: Element) {
  if (isDocumentElement(el)) {
    return window.innerHeight;
  }

  return el.clientHeight;
}

// Normalized scrollTo & scrollTop
// ------------------------------

export function getScrollTop(el: Element) {
  if (isDocumentElement(el)) {
    return window.pageYOffset;
  }
  return el.scrollTop;
}

export function scrollTo(el: Element, top: number) {
  // with a scroll distance, we perform scroll on the element
  if (isDocumentElement(el)) {
    window.scrollTo(0, top);
    return;
  }

  el.scrollTop = top;
}

// Get Scroll Parent
// ------------------------------

export function getScrollParent(element: Element) {
  let style = getComputedStyle(element);
  const excludeStaticParent = style.position === 'absolute';
  const overflowRx = /(auto|scroll)/;
  const docEl = document.documentElement;

  if (style.position === 'fixed') return docEl;

  for (
    let parent: Element | null = element;
    (parent = parent.parentElement);

  ) {
    style = getComputedStyle(parent);
    if (excludeStaticParent && style.position === 'static') {
      continue;
    }
    if (overflowRx.test(style.overflow + style.overflowY + style.overflowX)) {
      return parent;
    }
  }

  return docEl;
}

// Animated Scroll To
// ------------------------------

/**
  @param t: time (elapsed)
  @param b: initial value
  @param c: amount of change
  @param d: duration
*/
function easeOutCubic(t: number, b: number, c: number, d: number) {
  return c * ((t = t / d - 1) * t * t + 1) + b;
}

export function animatedScrollTo(
  element: Element,
  to: number,
  duration: number = 200,
  callback: (element: Element) => void = noop
) {
  const start = getScrollTop(element);
  const change = to - start;
  const increment = 10;
  let currentTime = 0;

  function animateScroll() {
    currentTime += increment;
    const val = easeOutCubic(currentTime, start, change, duration);
    scrollTo(element, val);
    if (currentTime < duration) {
      window.requestAnimationFrame(animateScroll);
    } else {
      callback(element);
    }
  }
  animateScroll();
}

// Scroll Into View
// ------------------------------

export function scrollIntoView(menuEl: HTMLElement, focusedEl: HTMLElement) {
  const menuRect = menuEl.getBoundingClientRect();
  const focusedRect = focusedEl.getBoundingClientRect();
  const overScroll = focusedEl.offsetHeight / 3;

  if (focusedRect.bottom + overScroll > menuRect.bottom) {
    scrollTo(
      menuEl,
      Math.min(
        focusedEl.offsetTop +
          focusedEl.clientHeight -
          menuEl.offsetHeight +
          overScroll,
        menuEl.scrollHeight
      )
    );
  } else if (focusedRect.top - overScroll < menuRect.top) {
    scrollTo(menuEl, Math.max(focusedEl.offsetTop - overScroll, 0));
  }
}

// ==============================
// Get bounding client object
// ==============================

// cannot get keys using array notation with DOMRect
export function getBoundingClientObj(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  return {
    bottom: rect.bottom,
    height: rect.height,
    left: rect.left,
    right: rect.right,
    top: rect.top,
    width: rect.width,
  };
}
export interface RectType {
  left: number;
  right: number;
  bottom: number;
  height: number;
  width: number;
}

// ==============================
// String to Key (kebabify)
// ==============================

export function toKey(str: string) {
  return str.replace(/\W/g, '-');
}

// ==============================
// Touch Capability Detector
// ==============================

export function isTouchCapable() {
  try {
    document.createEvent('TouchEvent');
    return true;
  } catch (e) {
    return false;
  }
}

// ==============================
// Mobile Device Detector
// ==============================

export function isMobileDevice() {
  try {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  } catch (e) {
    return false;
  }
}

// ==============================
// Type Utils
// ==============================

export function isGroup<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>
>(item: OptionType | GroupType): item is GroupType {
  return (item as GroupType).options !== undefined;
}

export function valueTernary<
  OptionType extends OptionTypeBase,
  IsMultiType extends boolean
>(
  isMulti: IsMultiType,
  multiValue: MultiValueType<OptionType>,
  singleValue: SingleValueType<OptionType>
): ValueType<OptionType, IsMultiType> {
  return (isMulti ? multiValue : singleValue) as ValueType<
    OptionType,
    IsMultiType
  >;
}

export function multiValueAsValue<
  OptionType extends OptionTypeBase,
  IsMultiType extends boolean
>(multiValue: MultiValueType<OptionType>) {
  return multiValue as ValueType<OptionType, IsMultiType>;
}

export function singleValueAsValue<
  OptionType extends OptionTypeBase,
  IsMultiType extends boolean
>(singleValue: SingleValueType<OptionType>) {
  return singleValue as ValueType<OptionType, IsMultiType>;
}

type Truthy<T> = T extends false | '' | 0 | null | undefined ? never : T;

export function truthy<T>(value: T): value is Truthy<T> {
  return !!value;
}
