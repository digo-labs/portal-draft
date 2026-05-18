import { CursorBracket, CursorContainer, Icon, InputGroup, InputGroupAddon, InputGroupInput, ParameterToggleGroup, Separator, Spacer, TextScramble } from '@digo-labs/ui';

import { useEffect, useState } from 'react';

import { services }                    from 'app.config';
import type { Project, ProjectStatus } from 'data/types';
import { ProjectPreview }              from 'app/components/project/project-preview';

const STATUS_FILTERS: { label: string; value: ProjectStatus | 'all'; }[] = [
  { label: 'All',       value: 'all' },
  { label: 'Active',    value: 'active' },
  { label: 'On Hold',   value: 'on-hold' },
  { label: 'Completed', value: 'completed' },
  { label: 'Archived',  value: 'archived' },
];

export function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter]     = useState('all');
  const [search, setSearch]     = useState('');

  useEffect(() => {
    services.projects.getAll().then(setProjects);
  }, []);

  const filtered = filter === 'all'
    ? projects
    : projects.filter(p => p.status === filter);

  return (

    <CursorContainer showNativeCursor={true} className="overflow-visible">

      <div className="cs-gutter cs-page-container border-neutral-7 relative min-h-full gap-20 border-t">

        <Spacer className="bg-neutral-4 border-neutral-7 border-r" />

        <div className="bg-neutral-4 border-neutral-7 z-10 flex flex-col gap-4 border-x">

          <div className="flex flex-col items-center gap-4 p-4">
            <TextScramble className="typo-label typo-4 text-neutral-10 uppercase">
              Personal Hub
            </TextScramble>

            <TextScramble className="typo-header typo-10 text-neutral-12 ">
              All Projects
            </TextScramble>

          </div>

          <div className="cs-backdrop-panel border-neutral-6 sticky top-4 z-10 mx-4 rounded-md border shadow-lg">

            <InputGroup className="border-neutralA-4 rounded-none rounded-t-md border-none bg-transparent">

              <InputGroupAddon className="pl-2">
                <Icon icon="search" className="typo-3" />
              </InputGroupAddon>

              <InputGroupInput
                autoComplete="off"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search Icons..."
                className="typo-3 typo-label font-code p-4 py-3 placeholder:uppercase"
              />

            </InputGroup>

            <Separator className="bg-neutralA-4" />

            <ParameterToggleGroup
              inline={true}
              label="Status"
              items={STATUS_FILTERS}
              itemVariant="ghost"
              classNames={{
                root:      'p-2 px-4',
                input:     'gap-3',
                separator: 'mx-2',
                label:     'typo-code typo-1! text-neutral-12 uppercase',
              }}
              value={[filter]}
              onValueChange={(values) => {
                if (values.length > 0) setFilter(values[values.length - 1]);
              }}
            />

          </div>

          <div className="grid grid-cols-2 gap-4 p-4">

            {filtered.map(project => <ProjectPreview project={project} />)}

            <CursorBracket offset={0} borderWidth={2} color="var(--color-neutral-12) z-1000" />
          </div>

        </div>

        <Spacer className="bg-neutral-4 border-neutral-7 border-l" />

      </div>

    </CursorContainer>

  );
}
