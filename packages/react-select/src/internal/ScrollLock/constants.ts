export const STYLE_KEYS = [
  'boxSizing',
  'height',
  'overflow',
  'paddingRight',
  'position',
] as const;

export const LOCK_STYLES = {
  boxSizing: 'border-box', // account for possible declaration `width: 100%;` on body
  overflow: 'hidden',
  position: 'relative',
  height: '100%',
} as const;