import { defineDatabases } from '@digo-labs/app';
import { text, uuid } from 'drizzle-orm/pg-core';

export const { tables, databases } = defineDatabases('app_template', {
  items: {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    description: text('description').notNull().default(''),
  },
});

// drizzle-kit only picks up tables exported at the top level
export const { items } = tables;
