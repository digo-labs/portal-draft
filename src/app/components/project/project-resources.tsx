import { Icon } from '@digo-labs/ui';

import { useMemo } from 'react';

import { MOCK_RESOURCE_LINKS } from 'data/mock-projects';
import type { ResourceType }   from 'data/types';

interface Properties {
  projectId: string;
}

const TYPE_ICONS: Record<ResourceType, string> = {
  dropbox: 'hardDrive',
  drive:   'folderOpen',
  figma:   'figma',
  notion:  'bookOpen',
  other:   'link',
};

export function ProjectResources(properties: Properties) {
  const { projectId } = properties;
  const links         = useMemo(
    () => MOCK_RESOURCE_LINKS.filter(r => r.projectId === projectId),
    [projectId],
  );

  if (links.length === 0) {
    return <p className="typo-3 text-neutral-8">No resources linked to this project yet.</p>;
  }

  return (
    <div className="space-y-2">
      {links.map(link => (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noreferrer"
          className="border-neutral-6 bg-neutral-3 hover:bg-neutral-2 hover:border-neutral-1 cs-transition flex items-center gap-3 rounded-lg border p-2 pr-4 no-underline hover:shadow-sm"
        >
          <div className="flex-col-center bg-neutralA-2 border-neutral-6 self-stretch rounded-sm border p-3 shadow-sm">
            <Icon icon={TYPE_ICONS[link.type]} className="typo-4 text-neutral-11" />
          </div>
          <div className="min-w-0 flex-1 space-y-1">
            <p className="typo-label typo-2 text-neutral-12">{link.label}</p>
            <p className="typo-1 text-neutral-9 truncate text-nowrap">{link.url}</p>
          </div>
          <Icon icon="externalLink" className="typo-4 text-neutral-8" />
        </a>
      ))}
    </div>
  );
}
