import { Button, Icon, Separator, Spinner, toastManager } from '@digo-labs/ui';

import { useParams }                          from 'react-router-dom';
import { ComponentType, useEffect, useState } from 'react';

import { services }    from 'app.config';
import type { Skill }  from 'data/types';
import { Helpers }     from 'helpers/helpers';
import { MDXProvider } from 'app/providers/mdx-provider';
import { SkillTOC }    from 'app/components/skills/skill-toc';

export function SkillDetail() {
  const { id }                      = useParams();
  const [skill, setSkill]           = useState<Skill | null>(null);
  const [MdxContent, setMdxContent] = useState<ComponentType | null>(null);
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    if (!id) return;

    services.skills.getAll().then((skills) => {
      const found = skills.find(s => s.slug === id);

      setSkill(found ?? null);

      if (found) {
        const loaders = Helpers.skills.getLoaderBySlug();
        const loader  = loaders[found.slug];

        if (loader) {
          loader().then((mod) => {
            setMdxContent(() => mod.default);
            setLoading(false);
          });
        } else {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    });
  }, [id]);

  if (loading) return <div className="flex-col-center h-64"><Spinner /></div>;

  if (!skill) return <div className="p-6"><p className="typo-3 text-neutral-10">Skill not found.</p></div>;

  return (
    <MDXProvider>
      <div className="relative grid h-[calc(100dvh-var(--navbar-h))] overflow-hidden">

        <main className="relative w-full overflow-y-auto px-10 py-10">
          <div className="mx-auto max-w-3xl space-y-8">
            <div className="flex items-start gap-4">
              <div className="flex-col-center bg-accent-3 size-14 shrink-0 rounded-xl">
                <Icon icon={skill.icon} className="typo-7 text-accent-9" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="typo-header typo-6 text-neutral-12">{skill.name}</h1>
                  {skill.status === 'coming_soon' && (
                    <span className="bg-neutralA-3 typo-1 text-neutral-8 rounded-full px-2 py-0.5">Coming Soon</span>
                  )}
                </div>
                <p className="typo-body typo-3 text-neutral-10">{skill.description}</p>
              </div>
            </div>

            <Button
              variant="default"
              onClick={() => toastManager.add({ type: 'info', title: 'This skill is coming soon!' })}
            >
              <Icon icon="sparkles" />
              Try it
            </Button>

            <Separator />

            {MdxContent && <MdxContent />}
          </div>
        </main>

        <SkillTOC className="absolute top-0 right-0 bottom-0 min-w-56 p-10" />

      </div>
    </MDXProvider>
  );
}
