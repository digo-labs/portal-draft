import { Link } from 'react-router-dom';

import { MOCK_MILESTONES }                               from 'data/mock-projects';
import { Project }                                       from 'data';
import { cssColor, Grainient, parseColor, TextScramble } from '@digo-labs/ui';

interface Properties {
  project: Project;
}

export function ProjectPreview(properties: Properties) {
  const { project } = properties;

  const nextMilestone = MOCK_MILESTONES.filter(m => m.projectId === project.id && !m.completed).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

  return (

    <Link
      key={project.id}
      to={`/projects/${project.id}`}
      className="group/card hover:bg-neutral-1 cs-transition border-neutral-6 relative flex flex-col gap-3 rounded-md border border-dashed p-3 hover:rounded-none hover:shadow-md active:scale-102"
      data-cursor-target
    >
      <div className="relative h-40 self-stretch overflow-hidden rounded-xs">
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
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="cs-transition flex items-center justify-between group-hover/card:pl-1">
          <TextScramble className="typo-label typo-3 text-neutral-12 flex-1 truncate">
            {project.name}
          </TextScramble>
          <p className="typo-1 typo-code text-neutral-9 truncate">{nextMilestone ? nextMilestone.title : 'No milestones'}</p>
        </div>
        <div className="cs-transition flex items-center justify-between group-hover/card:pl-2">
          <TextScramble className="typo-2 text-neutral-10 flex-1 truncate">
            {project.client}
          </TextScramble>
          {nextMilestone && <p className="typo-1 typo-code text-accent-9">{new Date(nextMilestone.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>}
        </div>
      </div>

    </Link>
  );
}
