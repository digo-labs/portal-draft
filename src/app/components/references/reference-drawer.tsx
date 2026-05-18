import {
  Drawer, DrawerPopup, DrawerContent,
  DrawerHeader, DrawerTitle, DrawerDescription, DrawerClose,
  Icon, Separator,
} from '@digo-labs/ui';

import type { Reference } from 'data/types';
import { MOCK_USERS }     from 'data/mock-users';
import { MOCK_PROJECTS }  from 'data/mock-projects';

interface Properties {
  reference:    Reference | null;
  open:         boolean;
  onOpenChange: (open: boolean) => void;
}

export function ReferenceDrawer(properties: Properties) {
  const { reference, open, onOpenChange } = properties;
  if (!reference) return null;

  const uploader = MOCK_USERS.find(u => u.id === reference.uploader);
  const project  = reference.projectId ? MOCK_PROJECTS.find(p => p.id === reference.projectId) : null;

  return (
    <Drawer open={open} onOpenChange={onOpenChange} side="right">
      <DrawerPopup className="w-96">
        <DrawerHeader>
          <DrawerTitle className="typo-label typo-3">Reference Detail</DrawerTitle>
          <DrawerDescription className="typo-2 text-neutral-10 sr-only">Reference details and metadata</DrawerDescription>
          <DrawerClose />
        </DrawerHeader>

        <DrawerContent className="space-y-4 p-4">
          <div
            className="relative w-full overflow-hidden rounded-lg"
            style={{ height: Math.min(reference.height, 300), backgroundColor: reference.imageColor }}
          >
            {reference.imageUrl && (
              <img src={reference.imageUrl} alt={reference.description} className="absolute inset-0 size-full object-cover" />
            )}
          </div>

          <p className="typo-3 text-neutral-12">{reference.description}</p>

          <Separator />

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Icon icon="person" className="typo-3 text-neutral-8" />
              <span className="typo-2 text-neutral-11">{uploader?.name ?? 'Unknown'}</span>
            </div>

            {project && (
              <div className="flex items-center gap-2">
                <Icon icon="folder" className="typo-3 text-neutral-8" />
                <span className="typo-2 text-neutral-11">{project.name}</span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Icon icon="calendar" className="typo-3 text-neutral-8" />
              <span className="typo-2 text-neutral-11">
                {new Date(reference.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <span className="typo-label typo-2 text-neutral-10">Tags</span>
            <div className="flex flex-wrap gap-2">
              {reference.tags.map(tag => (
                <span key={tag} className="border-neutralA-4 bg-neutralA-2 typo-2 text-neutral-11 rounded-full border px-3 py-1">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </DrawerContent>
      </DrawerPopup>
    </Drawer>
  );
}
