import { Link } from 'react-router-dom';

import { MOCK_MILESTONES } from 'data/mock-projects';
import { Project }         from 'data';
import { TextScramble }    from '@digo-labs/ui';

interface Properties {
  project: Project;
}

export function ProjectCard(properties: Properties) {
  const { project } = properties;

  const nextMilestone = MOCK_MILESTONES.filter(m => m.projectId === project.id && !m.completed).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

  return (

    <Link
      key={project.id}
      to={`/projects/${project.id}`}
      className="group/card hover:bg-neutralA-2 cs-transition border-neutral-6 flex items-center gap-3 rounded-md border border-dashed p-2 hover:shadow-md active:scale-102"
    >
      <div className="w-3 self-stretch rounded-xs" style={{ backgroundColor: project.coverColor }} />
      <div className="flex flex-1 flex-col gap-1">
        <div className="cs-transition flex items-center justify-between group-hover/card:pl-1">
          <TextScramble className="typo-label typo-2 text-neutral-12 flex-1 truncate">
            {project.name}
          </TextScramble>
          <p className="typo-1 typo-code text-neutral-9 truncate">{nextMilestone ? nextMilestone.title : 'No milestones'}</p>
        </div>
        <div className="cs-transition flex items-center justify-between group-hover/card:pl-2">
          <TextScramble className="typo-1 text-neutral-10 flex-1 truncate">
            {project.client}
          </TextScramble>
          {nextMilestone && <p className="typo-1 typo-code text-accent-9">{new Date(nextMilestone.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>}
        </div>
      </div>

    </Link>
  );
}
