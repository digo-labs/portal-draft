import type { ThemePreset } from '@digo-labs/ui';

export const pcPreset: ThemePreset = {
  name:   'default',
  colors: {
    neutral: 'gray',
    accent:  'iris',
    error:   'crimson',
    success: 'green',
    warning: 'yellow',
    info:    'blue',
  },
  shadows: {
    xs: {
      color:   'gray',
      offsetX: 0,
      offsetY: 0,
      blur:    20,
      spread:  0,
      opacity: 0.15,
    },
    s: {
      color:   'gray',
      offsetX: 0,
      offsetY: 0,
      blur:    30,
      spread:  0,
      opacity: 0.2,
    },
    m: {
      color:   'gray',
      offsetX: 0,
      offsetY: 0,
      blur:    40,
      spread:  0,
      opacity: 0.4,
    },
    l: {
      color:   'gray',
      offsetX: 0,
      offsetY: 0,
      blur:    50,
      spread:  -2,
      opacity: 0.6,
    },
    xl: {
      color:   'gray',
      offsetX: 0,
      offsetY: 0,
      blur:    60,
      spread:  0,
      opacity: 0.8,
    },
  },
  typography: {
    header: {
      font:     'unknown',
      weight:   '900',
      tracking: '0.07em',
      leading:  '1',
    },
    label: {
      font:     'geist-mono',
      weight:   '600',
      tracking: '0.025em',
      leading:  '1',
    },
    body: {
      font:     'geist',
      weight:   '400',
      tracking: '0em',
      leading:  '1.5',
    },
    code: {
      font:     'geist-mono',
      weight:   '400',
      tracking: '0em',
      leading:  '1.4',
    },
  },
  radius:                '1rem',
  spacingFactor:         1,
  typographyScaleFactor: 1,
};
