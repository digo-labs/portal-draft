import { Icon } from '@digo-labs/ui';

import { useEffect, useState } from 'react';
import { Link }                from 'react-router-dom';

import { services }   from 'app.config';
import type { Skill } from 'data/types';

export function SkillsGallery() {
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    services.skills.getAll().then(setSkills);
  }, []);

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <div className="space-y-2">
        <h1 className="typo-header typo-6 text-neutral-12">Skills</h1>
        <p className="typo-body typo-3 text-neutral-10">AI-powered skills and workflows built for the PC team.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {skills.map(skill => (
          <Link
            key={skill.id}
            to={`/skills/${skill.slug}`}
            className="border-neutralA-3 bg-neutral-2 hover:border-accent-6 cs-transition group rounded-lg border p-6 no-underline"
          >
            <div className="flex items-start gap-4">
              <div className="flex-col-center bg-accent-3 size-12 shrink-0 rounded-lg">
                <Icon icon={skill.icon} className="typo-6 text-accent-9" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="typo-label typo-3 text-neutral-12 group-hover:text-accent-11 cs-transition">{skill.name}</h3>
                  {skill.status === 'coming_soon' && (
                    <span className="bg-neutralA-3 typo-1 text-neutral-8 rounded-full px-2 py-0.5">Coming Soon</span>
                  )}
                </div>
                <p className="typo-2 text-neutral-10">{skill.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
