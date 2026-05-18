import { cssColor, Grainient, parseColor, Spacer, Spinner, TextScramble } from '@digo-labs/ui';
import { cn }                                                             from '@digo-labs/common';

import { useParams }           from 'react-router-dom';
import { useEffect, useState } from 'react';

import type { Project, ProjectStatus } from 'data/types';
import { services }                    from 'app.config';
import { ProjectOverview }             from 'app/components/project/project-overview';
import { ProjectTeam }                 from 'app/components/project/project-team';
import { ProjectTimeline }             from 'app/components/project/project-timeline';
import { ProjectResources }            from 'app/components/project/project-resources';

const STATUS_BADGE: Record<ProjectStatus, string> = {
  'active':    'bg-success-3 text-success-11 border-success-6',
  'on-hold':   'bg-warning-3 text-warning-11 border-warning-6',
  'completed': 'bg-neutral-3 text-neutral-11 border-neutral-6',
  'archived':  'bg-neutral-3 text-neutral-8 border-neutral-5',
};

export function ProjectDetail() {
  const { id }                = useParams();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    if (id) services.projects.get(id).then(setProject);
  }, [id]);

  if (!project) return <div className="flex-col-center h-64"><Spinner /></div>;

  return (
    <div className="cs-gutter cs-page-container relative h-full gap-20">

      <Spacer className="bg-neutral-4 border-neutral-7 border-r" />

      <div className="bg-neutral-4 border-neutral-7 z-10 flex flex-col gap-4 border-x">

        <div>
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
                <TextScramble className={cn('typo-2 typo-label rounded-sm border px-2 py-1.5 uppercase ', STATUS_BADGE[project.status])}>
                  {project.status}
                </TextScramble>
                <TextScramble className="typo-header typo-9 text-neutral-3 drop-shadow-md">
                  {project.name}
                </TextScramble>
                <TextScramble className="typo-4 typo-label text-neutral-3/75 uppercase">
                  {project.client}
                </TextScramble>
              </div>
            </div>
          </div>

          <div className="flex gap-8 p-6">
            <div className="min-w-0 flex-1 space-y-8">
              <ProjectOverview project={project} />
              <ProjectTeam projectId={project.id} groupByRole />
            </div>

            <aside className="sticky top-6 w-72 shrink-0 space-y-8 self-start">
              <ProjectTimeline projectId={project.id} />
              <ProjectResources projectId={project.id} />
            </aside>
          </div>
        </div>

      </div>

      <Spacer className="bg-neutral-4 border-neutral-7 border-l" />

    </div>

  );
}
