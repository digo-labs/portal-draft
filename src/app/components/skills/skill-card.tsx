import { Icon, TextScramble } from '@digo-labs/ui';

import { Link } from 'react-router-dom';

import { type Skill } from 'data';

interface Properties {
  skill: Skill;
}

export function SkillCard(properties: Properties) {
  const { skill: skill } = properties;

  return (

    <Link
      key={skill.id}
      to={`/projects/${skill.id}`}
      className="group/card hover:bg-neutralA-2 cs-transition border-neutral-6 flex items-center gap-3 rounded-md border border-dashed p-2 hover:shadow-md active:scale-102"
    >
      <div className="border-neutral-6 self-stretch rounded-sm border p-4">
        <Icon icon={skill.icon} />
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <TextScramble className="typo-label typo-2 text-neutral-12 flex-1 truncate">
          {skill.name}
        </TextScramble>
        <TextScramble className="typo-1 text-neutral-10 flex-1">
          {skill.description}
        </TextScramble>
      </div>

    </Link>
  );
}
