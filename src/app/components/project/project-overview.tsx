import { cn }                      from '@digo-labs/common';
import { Separator, TextScramble } from '@digo-labs/ui';

import type { Project }   from 'data/types';
import { ComponentProps } from 'react';

interface Properties extends ComponentProps<'div'> {
  project: Project;
}

export function ProjectOverview(properties: Properties) {
  const { project, className } = properties;

  return (
    <div className={cn('space-y-6', className)}>
      <div className="space-y-2">
        <TextScramble className="typo-label typo-4 text-neutral-12">Description</TextScramble>
        <p className="typo-body typo-3 text-neutral-10">{project.description}</p>
      </div>

      <Separator className="bg-neutral-6" />

      <div className="-mt-2 grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <span className="typo-1 typo-label text-neutral-9 uppercase">Type</span>
          <p className="typo-3 typo-code text-neutral-12">{project.type}</p>
        </div>
        <div className="space-y-1">
          <span className="typo-1 typo-label text-neutral-9 uppercase">Client</span>
          <p className="typo-3 typo-code text-neutral-12">{project.client}</p>
        </div>
        <div className="space-y-1">
          <span className="typo-1 typo-label text-neutral-9 uppercase">Start Date</span>
          <p className="typo-3 typo-code text-neutral-12">{new Date(project.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>
        <div className="space-y-1">
          <span className="typo-1 typo-label text-neutral-9 uppercase">End Date</span>
          <p className="typo-3 typo-code text-neutral-12">{new Date(project.endDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>
      </div>

      <Separator className="bg-neutral-6" />

    </div>
  );
}
