import { defineApp }  from '@digo-labs/app';
import { Websockets } from '@digo-labs/services';

import { databases } from './db';
import { pcPreset }  from './presets/pc-preset';
import { overrides } from './overrides';

export interface Channels {
  test: { value: number; };
}

export const { services, render } = defineApp({
  name:      'portal-draft',
  preset:    pcPreset,
  mode:      'light',
  overrides: overrides,
  auth:      { project: 'monorepo' },
  backend:   true,
  services: () => ({
    ...databases,
    websockets: new Websockets<Channels>({ app: 'portal-draft', url: import.meta.env.VITE_MONOREPO_WS_URL }),
  }),
});
