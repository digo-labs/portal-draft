import { baseStyles, defineOverrides, styles } from '@digo-labs/ui';

export const overrides = defineOverrides({
  button: styles({
    extend: baseStyles.button,
  }),
});
