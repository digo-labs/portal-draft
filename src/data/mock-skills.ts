import type { Skill } from './types';

export const MOCK_SKILLS: Skill[] = [
  {
    id:          's1',
    name:        'Brand Voice Writer',
    slug:        'brand-voice-writer',
    description: 'Generate on-brand copy for social media, emails, proposals, and project descriptions — all in PC\'s voice and tone.',
    icon:        'pencilLine',
    status:      'coming_soon',
  },
  {
    id:          's2',
    name:        'Brief Builder',
    slug:        'brief-builder',
    description: 'Turn rough notes and ideas into structured, polished project briefs ready for client review.',
    icon:        'fileText',
    status:      'coming_soon',
  },
  {
    id:          's3',
    name:        'Mood Board Generator',
    slug:        'mood-board-generator',
    description: 'AI-curated visual references based on keywords, styles, and project context. Build mood boards in seconds.',
    icon:        'image',
    status:      'coming_soon',
  },
  {
    id:          's4',
    name:        'Meeting Summarizer',
    slug:        'meeting-summarizer',
    description: 'Paste meeting notes or transcripts and get structured summaries with action items, owners, and deadlines.',
    icon:        'listOrdered',
    status:      'coming_soon',
  },
];
