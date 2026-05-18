import { ScrollArea, TextScramble } from '@digo-labs/ui';
import { cn }                       from '@digo-labs/common';

import { ComponentProps, useEffect, useState } from 'react';

import { services }   from 'app.config';
import type { Skill } from 'data/types';
import { Widget }     from 'app/components/home/widget';
import { SkillCard }  from 'app/components/skills/skill-card';

export function LastSkillsWidget(properties: ComponentProps<'div'>) {
  const { className, ...props } = properties;

  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    services.skills.getAll().then(setSkills);
  }, []);

  return (
    <Widget className={cn('flex-col', className)} {...props}>
      <div className="border-neutral-6 flex flex-col gap-2 border-b border-dashed p-4">
        <TextScramble className="typo-2 typo-label text-accent-9 uppercase">
          AI Integration
        </TextScramble>
        <TextScramble className="typo-header typo-4">
          Last Skills
        </TextScramble>
      </div>

      <ScrollArea scrollFade>
        <div className="flex flex-col gap-2 p-4">
          {skills.map(skill => <SkillCard  skill={skill} />)}
        </div>
      </ScrollArea>
    </Widget>

  );
}
