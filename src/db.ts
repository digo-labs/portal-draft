import { defineDatabases } from '@digo-labs/app/database';
import { boolean, integer, jsonb, text } from 'drizzle-orm/pg-core';

export interface WPEntry {
  projectId: string;
  percentage: number;
}

export const { tables, databases, schema } = defineDatabases('portal_draft', {
  users: {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    role: text('role', { enum: ['admin', 'member', 'freelancer'] }).notNull(),
    department: text('department', { enum: ['Creative', 'Production', 'Tech', 'Management'] }).notNull(),
    title: text('title').notNull(),
    phone: text('phone').notNull(),
    slack: text('slack').notNull(),
    avatarColor: text('avatarColor').notNull(),
    skills: text('skills').array().notNull().default([]),
    joinedAt: text('joinedAt').notNull(),
  },
  projects: {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    client: text('client').notNull(),
    status: text('status', { enum: ['active', 'on-hold', 'completed', 'archived'] }).notNull(),
    coverColor: text('coverColor').notNull(),
    startDate: text('startDate').notNull(),
    endDate: text('endDate').notNull(),
    description: text('description').notNull(),
    type: text('type').notNull(),
  },
  projectMembers: {
    id: text('id').primaryKey(),
    projectId: text('projectId').notNull(),
    userId: text('userId').notNull(),
    role: text('role').notNull(),
  },
  milestones: {
    id: text('id').primaryKey(),
    projectId: text('projectId').notNull(),
    title: text('title').notNull(),
    date: text('date').notNull(),
    completed: boolean('completed').notNull().default(false),
  },
  resourceLinks: {
    id: text('id').primaryKey(),
    projectId: text('projectId').notNull(),
    label: text('label').notNull(),
    url: text('url').notNull(),
    type: text('type', { enum: ['dropbox', 'drive', 'figma', 'notion', 'other'] }).notNull(),
  },
  wpSubmissions: {
    id: text('id').primaryKey(),
    userId: text('userId').notNull(),
    weekOf: text('weekOf').notNull(),
    entries: jsonb('entries').notNull().$type<WPEntry[]>(),
    submittedAt: text('submittedAt').notNull(),
  },
  references: {
    id: text('id').primaryKey(),
    imageColor: text('imageColor').notNull(),
    imageUrl: text('imageUrl'),
    height: integer('height').notNull(),
    uploader: text('uploader').notNull(),
    projectId: text('projectId'),
    tags: text('tags').array().notNull().default([]),
    description: text('description').notNull(),
    createdAt: text('createdAt').notNull(),
  },
  collections: {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    description: text('description').notNull(),
    projectId: text('projectId'),
    createdBy: text('createdBy').notNull(),
  },
  collectionRefs: {
    id: text('id').primaryKey(),
    collectionId: text('collectionId').notNull(),
    referenceId: text('referenceId').notNull(),
  },
  announcements: {
    id: text('id').primaryKey(),
    title: text('title').notNull(),
    body: text('body').notNull(),
    image: text('image'),
    authorId: text('authorId').notNull(),
    createdAt: text('createdAt').notNull(),
  },
  skills: {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    slug: text('slug').notNull(),
    description: text('description').notNull(),
    icon: text('icon').notNull(),
    status: text('status', { enum: ['active', 'coming_soon'] }).notNull(),
  },
});

export const {
  users,
  projects,
  projectMembers,
  milestones,
  resourceLinks,
  wpSubmissions,
  references,
  collections,
  collectionRefs,
  announcements,
  skills,
} = tables;
