import { ScrollArea, TextScramble } from '@digo-labs/ui';
import { cn }                       from '@digo-labs/common';

import { ComponentProps, useEffect, useState } from 'react';

import { services }     from 'app.config';
import type { Project } from 'data/types';
import { ProjectCard }  from 'app/components/project/project-card';
import { Widget }       from 'app/components/home/widget';

export function ActiveProjectsWidget(properties: ComponentProps<'div'>) {
  const { className, ...props } = properties;

  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    services.projects.getAll().then((all) => {
      setProjects(all.filter(p => p.status === 'active'));
    });
  }, []);

  return (
    <Widget className={cn('flex-col', className)} {...props}>
      <div className="border-neutral-6 flex flex-col gap-2 border-b border-dashed p-4">
        <TextScramble className="typo-2 typo-label text-accent-9 uppercase">
          Active
        </TextScramble>
        <TextScramble className="typo-header typo-4">
          My Projects
        </TextScramble>
      </div>

      <ScrollArea scrollFade>
        <div className="flex flex-col gap-2 p-4">
          {projects.map(project => <ProjectCard  project={project} />)}
        </div>
      </ScrollArea>
    </Widget>

  );
}
