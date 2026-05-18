import type { Collection, CollectionReference, Reference } from './types';

export const MOCK_REFERENCES: Reference[] = [
  { id: 'ref1',  imageColor: 'var(--color-accent-8)',  imageUrl: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=600',  height: 280, uploader: 'u2', projectId: 'p1', tags: ['stage-design', 'lighting', 'led'],         description: 'LED panel array concept for main stage',         createdAt: '2026-02-15T10:30:00Z' },
  { id: 'ref2',  imageColor: 'var(--color-info-8)',     imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600',  height: 200, uploader: 'u5', projectId: 'p1', tags: ['motion', 'visuals', 'generative'],          description: 'Generative particle system reference',            createdAt: '2026-02-20T14:00:00Z' },
  { id: 'ref3',  imageColor: 'var(--color-success-8)',  imageUrl: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=600',  height: 340, uploader: 'u6', projectId: 'p2', tags: ['environmental', 'installation', 'neon'],     description: 'Neon tube installation for venue entrance',       createdAt: '2026-03-01T09:00:00Z' },
  { id: 'ref4',  imageColor: 'var(--color-warning-8)',  imageUrl: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=600',  height: 220, uploader: 'u2', projectId: 'p4', tags: ['festival', 'lounge', 'fabric'],              description: 'Draped fabric lounge design inspiration',         createdAt: '2026-03-05T11:30:00Z' },
  { id: 'ref5',  imageColor: 'var(--color-error-8)',    imageUrl: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=600',    height: 300, uploader: 'u8', projectId: null, tags: ['interactive', 'projection', 'mapping'],      description: 'Projection mapping on irregular surfaces',        createdAt: '2026-03-10T16:00:00Z' },
  { id: 'ref6',  imageColor: 'var(--color-accent-6)',   imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600',  height: 260, uploader: 'u3', projectId: 'p1', tags: ['tech', 'hardware', 'led'],                   description: 'Custom LED controller hardware reference',        createdAt: '2026-03-12T08:45:00Z' },
  { id: 'ref7',  imageColor: 'var(--color-info-6)',     imageUrl: 'https://images.unsplash.com/photo-1614851099175-e5b30eb6f696?w=600',  height: 180, uploader: 'u5', projectId: null, tags: ['typography', 'kinetic', 'motion'],           description: 'Kinetic typography animation style',              createdAt: '2026-03-15T13:00:00Z' },
  { id: 'ref8',  imageColor: 'var(--color-success-6)',  imageUrl: 'https://images.unsplash.com/photo-1604076913837-52ab5f7c1ac2?w=600',  height: 320, uploader: 'u6', projectId: 'p4', tags: ['landscape', 'desert', 'festival'],           description: 'Desert landscape festival set design',            createdAt: '2026-03-18T10:00:00Z' },
  { id: 'ref9',  imageColor: 'var(--color-warning-6)',  imageUrl: 'https://images.unsplash.com/photo-1633186710895-309db2eca9e4?w=600',  height: 240, uploader: 'u9', projectId: 'p4', tags: ['3d', 'sculpture', 'digital'],                description: 'Digital sculpture for VIP entrance',              createdAt: '2026-03-20T15:30:00Z' },
  { id: 'ref10', imageColor: 'var(--color-error-6)',    imageUrl: 'https://images.unsplash.com/photo-1608501078713-8e445a709b39?w=600',  height: 280, uploader: 'u2', projectId: 'p2', tags: ['branding', 'signage', 'wayfinding'],         description: 'Neon wayfinding signage concept',                 createdAt: '2026-03-22T09:15:00Z' },
  { id: 'ref11', imageColor: 'var(--color-accent-4)',   imageUrl: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=600',  height: 200, uploader: 'u8', projectId: null, tags: ['webgl', 'interactive', 'generative'],        description: 'WebGL interactive fluid simulation',              createdAt: '2026-03-25T11:00:00Z' },
  { id: 'ref12', imageColor: 'var(--color-info-4)',     imageUrl: 'https://images.unsplash.com/photo-1633793675529-58d45bc5020c?w=600',  height: 360, uploader: 'u3', projectId: 'p6', tags: ['tech', 'ar', 'mixed-reality'],               description: 'Mixed reality stage overlay concept',             createdAt: '2026-03-28T14:30:00Z' },
  { id: 'ref13', imageColor: 'var(--color-neutral-8)',  imageUrl: 'https://images.unsplash.com/photo-1618172193622-10b2ba4e29fb?w=600',  height: 220, uploader: 'u6', projectId: null, tags: ['architecture', 'minimalist', 'concrete'],    description: 'Brutalist architecture interior reference',       createdAt: '2026-03-30T10:00:00Z' },
  { id: 'ref14', imageColor: 'var(--color-accent-10)',  imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600',  height: 300, uploader: 'u5', projectId: 'p1', tags: ['lighting', 'laser', 'atmospheric'],          description: 'Laser atmospheric effects for live shows',        createdAt: '2026-04-01T08:00:00Z' },
  { id: 'ref15', imageColor: 'var(--color-success-10)', imageUrl: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=600',    height: 250, uploader: 'u2', projectId: 'p2', tags: ['environmental', 'immersive', 'fog'],         description: 'Fog and haze environmental design',               createdAt: '2026-04-03T12:00:00Z' },
];

export const MOCK_COLLECTIONS: Collection[] = [
  { id: 'col1', name: 'Mothership References',   description: 'All references for the Skrillex Mothership Tour',         projectId: 'p1', createdBy: 'u2' },
  { id: 'col2', name: 're:Play Inspiration',      description: 'Visual direction for AWS re:Play 2026',                   projectId: 'p2', createdBy: 'u6' },
  { id: 'col3', name: 'Coachella VIP Moodboard',  description: 'References for the Coachella 2026 VIP experience',        projectId: 'p4', createdBy: 'u6' },
  { id: 'col4', name: 'Neon Lighting Inspo',       description: 'Neon and LED lighting references across projects',        projectId: null, createdBy: 'u2' },
  { id: 'col5', name: 'Stage Concepts 2026',       description: 'Stage design concepts and references for upcoming shows', projectId: null, createdBy: 'u3' },
];

export const MOCK_COLLECTION_REFERENCES: CollectionReference[] = [
  { id: 'cr1',  collectionId: 'col1', referenceId: 'ref1' },
  { id: 'cr2',  collectionId: 'col1', referenceId: 'ref2' },
  { id: 'cr3',  collectionId: 'col1', referenceId: 'ref6' },
  { id: 'cr4',  collectionId: 'col1', referenceId: 'ref14' },
  { id: 'cr5',  collectionId: 'col2', referenceId: 'ref3' },
  { id: 'cr6',  collectionId: 'col2', referenceId: 'ref10' },
  { id: 'cr7',  collectionId: 'col2', referenceId: 'ref15' },
  { id: 'cr8',  collectionId: 'col3', referenceId: 'ref4' },
  { id: 'cr9',  collectionId: 'col3', referenceId: 'ref8' },
  { id: 'cr10', collectionId: 'col3', referenceId: 'ref9' },
  { id: 'cr11', collectionId: 'col4', referenceId: 'ref1' },
  { id: 'cr12', collectionId: 'col4', referenceId: 'ref3' },
  { id: 'cr13', collectionId: 'col4', referenceId: 'ref10' },
  { id: 'cr14', collectionId: 'col5', referenceId: 'ref5' },
  { id: 'cr15', collectionId: 'col5', referenceId: 'ref12' },
  { id: 'cr16', collectionId: 'col5', referenceId: 'ref14' },
];
