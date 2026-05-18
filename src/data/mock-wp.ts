import type { WPSubmission } from './types';

export const MOCK_WP_SUBMISSIONS: WPSubmission[] = [
  { id: 'wp1', userId: 'u2', weekOf: '2026-03-30', entries: [{ projectId: 'p1', percentage: 60 }, { projectId: 'p3', percentage: 40 }], submittedAt: '2026-03-30T09:00:00Z' },
  { id: 'wp2', userId: 'u3', weekOf: '2026-03-30', entries: [{ projectId: 'p1', percentage: 50 }, { projectId: 'p6', percentage: 50 }], submittedAt: '2026-03-30T10:15:00Z' },
  { id: 'wp3', userId: 'u4', weekOf: '2026-03-30', entries: [{ projectId: 'p2', percentage: 70 }, { projectId: 'p4', percentage: 30 }], submittedAt: '2026-03-30T08:45:00Z' },
  { id: 'wp4', userId: 'u5', weekOf: '2026-03-30', entries: [{ projectId: 'p1', percentage: 80 }, { projectId: 'p4', percentage: 20 }], submittedAt: '2026-03-31T11:00:00Z' },
  { id: 'wp5', userId: 'u6', weekOf: '2026-03-30', entries: [{ projectId: 'p2', percentage: 40 }, { projectId: 'p4', percentage: 40 }, { projectId: 'p5', percentage: 20 }], submittedAt: '2026-03-30T14:30:00Z' },

  { id: 'wp6',  userId: 'u2', weekOf: '2026-03-23', entries: [{ projectId: 'p1', percentage: 70 }, { projectId: 'p3', percentage: 30 }], submittedAt: '2026-03-23T09:00:00Z' },
  { id: 'wp7',  userId: 'u3', weekOf: '2026-03-23', entries: [{ projectId: 'p1', percentage: 40 }, { projectId: 'p6', percentage: 60 }], submittedAt: '2026-03-23T10:00:00Z' },
  { id: 'wp8',  userId: 'u4', weekOf: '2026-03-23', entries: [{ projectId: 'p2', percentage: 80 }, { projectId: 'p4', percentage: 20 }], submittedAt: '2026-03-23T09:30:00Z' },
  { id: 'wp9',  userId: 'u5', weekOf: '2026-03-23', entries: [{ projectId: 'p1', percentage: 100 }], submittedAt: '2026-03-24T08:00:00Z' },
  { id: 'wp10', userId: 'u6', weekOf: '2026-03-23', entries: [{ projectId: 'p2', percentage: 50 }, { projectId: 'p4', percentage: 50 }], submittedAt: '2026-03-23T15:00:00Z' },

  { id: 'wp11', userId: 'u2', weekOf: '2026-03-16', entries: [{ projectId: 'p1', percentage: 50 }, { projectId: 'p3', percentage: 50 }], submittedAt: '2026-03-16T09:00:00Z' },
  { id: 'wp12', userId: 'u3', weekOf: '2026-03-16', entries: [{ projectId: 'p6', percentage: 100 }], submittedAt: '2026-03-16T10:00:00Z' },
  { id: 'wp13', userId: 'u4', weekOf: '2026-03-16', entries: [{ projectId: 'p2', percentage: 60 }, { projectId: 'p4', percentage: 40 }], submittedAt: '2026-03-16T09:15:00Z' },

  { id: 'wp14', userId: 'u2', weekOf: '2026-04-06', entries: [{ projectId: 'p1', percentage: 55 }, { projectId: 'p4', percentage: 45 }], submittedAt: '2026-04-06T09:00:00Z' },
  { id: 'wp15', userId: 'u4', weekOf: '2026-04-06', entries: [{ projectId: 'p2', percentage: 50 }, { projectId: 'p4', percentage: 50 }], submittedAt: '2026-04-06T08:30:00Z' },
];
