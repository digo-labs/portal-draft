import { defineApp } from '@digo-labs/app';
import { Database, Websockets } from '@digo-labs/services';
import { defaultPreset } from '@digo-labs/ui';
import { databases } from './db';
import type { StyleRecord } from '@digo-labs/common';

export interface Channels {
  example: { message: string };
}

export const { services, render } = defineApp({
  name: 'portal-draft',
  preset: defaultPreset,
  mode: 'dark',
  auth: { project: 'monorepo' },
  backend: true,
  services: () => ({
    ...databases,
    styles: new Database<StyleRecord>('styles'),
    websockets: new Websockets<Channels>({ app: 'portal-draft', url: import.meta.env.VITE_MONOREPO_WS_URL }),
  }),
});
