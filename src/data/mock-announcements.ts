import type { Announcement } from './types';

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id:        'a1',
    title:     'PC Hub is Live!',
    body:      'Welcome to the new internal hub. This is your one-stop shop for projects, references, brand assets, and team info. Explore and let us know what you think via the feedback form.',
    image:     null,
    authorId:  'u1',
    createdAt: '2026-04-07T09:00:00Z',
  },
  {
    id:        'a2',
    title:     'WP% Submission Reminder',
    body:      'Please submit your weekly work percentages by end of day Friday. Your active projects are auto-populated — just set the percentages and hit submit.',
    image:     null,
    authorId:  'u10',
    createdAt: '2026-04-04T14:00:00Z',
  },
  {
    id:        'a3',
    title:     'Coachella 2026 — All Hands Meeting',
    body:      'Team meeting for Coachella VIP production this Thursday at 2pm. We\'ll review the latest design updates and fabrication timeline. All assigned team members please attend.',
    image:     null,
    authorId:  'u4',
    createdAt: '2026-04-02T11:30:00Z',
  },
];
