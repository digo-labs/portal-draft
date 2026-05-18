import { cssColor, Grainient, parseColor, ScrollArea, TextScramble } from '@digo-labs/ui';
import { cn }                                                        from '@digo-labs/common';

import { ComponentProps, useEffect, useState } from 'react';

import { services }         from 'app.config';
import type { Project }     from 'data/types';
import { Widget }           from 'app/components/home/widget';
import { ProjectTimeline }  from 'app/components/project/project-timeline';
import { ProjectResources } from 'app/components/project/project-resources';
import { ProjectOverview }  from 'app/components/project/project-overview';

export function CurrentProjectWidget(properties: ComponentProps<'div'>) {
  const { className, ...props } = properties;

  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    services.projects.get('p1').then(setProject);
  }, []);

  if (!project) return;

  return (
    <Widget className={cn('flex-col', className)} {...props}>
      <div className="grid p-4">
        <div className="border-neutral-1 relative h-60 overflow-hidden rounded-md border" style={{ backgroundColor: project.coverColor }}>
          <Grainient
            color1={parseColor(project.coverColor)}
            color2={cssColor('--color-accent-9')}
            color3={parseColor(project.coverColor)}
            grainAnimated={false}
            timeSpeed={0.5}
            warpStrength={1}
            warpFrequency={5}
            warpSpeed={2}
            warpAmplitude={50}
            noiseScale={2}
            grainAmount={0.1}
            grainScale={2}
          />
          <div className="absolute bottom-4 left-6 flex flex-col items-start gap-3">
            <TextScramble className="typo-2 typo-label border-neutral-1 bg-neutral-1/25 text-neutral-1 rounded-sm border px-2 py-1.5 uppercase">
              Current Project
            </TextScramble>
            <TextScramble className="typo-header typo-9 text-neutral-3 leading-10 text-wrap drop-shadow-md">
              {project.name}
            </TextScramble>
            <TextScramble className="typo-3 typo-label text-neutral-3/75 uppercase">
              {project.client}
            </TextScramble>
          </div>
        </div>
      </div>

      <ProjectOverview project={project} className="p-4" />

      <ScrollArea scrollFade>
        <div className="flex flex-col gap-6 p-4">
          <TextScramble className="typo-3 typo-label text-neutral-12 uppercase">
            Timeline
          </TextScramble>
          <ProjectTimeline projectId={project.id} />
          <TextScramble className="typo-3 typo-label text-neutral-12 pt-4 uppercase">
            Resources
          </TextScramble>
          <ProjectResources projectId={project.id} />
        </div>
      </ScrollArea>
    </Widget>

  );
}
