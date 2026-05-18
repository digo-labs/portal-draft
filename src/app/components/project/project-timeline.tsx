import { Icon, TextScramble } from '@digo-labs/ui';

import { useMemo } from 'react';

import { MOCK_MILESTONES } from 'data/mock-projects';
import { cn }              from '@digo-labs/common';

interface Properties {
  projectId: string;
}

export function ProjectTimeline(properties: Properties) {
  const { projectId } = properties;
  const milestones    = useMemo(
    () => MOCK_MILESTONES
      .filter(m => m.projectId === projectId)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
    [projectId],
  );

  return (
    <div className="relative max-w-xl">
      <div className="bg-neutralA-4 absolute top-2 bottom-2 left-4 w-px" />

      <div className="space-y-6">
        {milestones.map((milestone, i) => {
          const isLast = i === milestones.length - 1;

          return (
            <div key={milestone.id} className="relative flex items-center gap-4 pl-0">

              <div className={cn('flex-col-center size-8 rounded-sm border ', milestone.completed ? 'bg-accent-9 border-accent-1' : 'bg-neutral-3 border-neutral-6')}>
                <Icon
                  icon={milestone.completed ? 'check' : (isLast ? 'flag' : 'online')}
                  className={cn('typo-3', milestone.completed ? 'text-accent-3' : 'text-neutral-12')}
                />
              </div>

              <div className={cn('flex-1 gap-1 pt-0.5', milestone.completed && 'opacity-50')}>
                <TextScramble className={cn('typo-label typo-2 text-neutral-12 uppercase')}>
                  {milestone.title}
                </TextScramble>
                <p className="typo-2 typo-code text-accent-9 ">
                  {new Date(milestone.date).toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
