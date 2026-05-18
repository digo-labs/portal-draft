import { Separator } from '@digo-labs/ui';

import { useMemo } from 'react';

import { MOCK_WP_SUBMISSIONS } from 'data/mock-wp';
import { MOCK_PROJECTS }       from 'data/mock-projects';
import { WPSubmit }            from 'app/components/wp/wp-submit';

export function WPPage() {
  const weeks = useMemo(() => {
    const weekSet = [...new Set(MOCK_WP_SUBMISSIONS.map(s => s.weekOf))].sort().reverse();

    return weekSet.map((weekOf) => {
      const submissions = MOCK_WP_SUBMISSIONS.filter(s => s.weekOf === weekOf);

      const projectTotals: Record<string, number> = {};

      submissions.forEach((s) => {
        s.entries.forEach((e) => {
          projectTotals[e.projectId] = (projectTotals[e.projectId] ?? 0) + e.percentage;
        });
      });

      return { weekOf, projectTotals, submissionCount: submissions.length };
    });
  }, []);

  const projectIds = useMemo(() => {
    const ids = new Set<string>();

    MOCK_WP_SUBMISSIONS.forEach(s => s.entries.forEach(e => ids.add(e.projectId)));

    return [...ids];
  }, []);

  function getProjectName(id: string) {
    return MOCK_PROJECTS.find(p => p.id === id)?.name ?? id;
  }

  function getProjectColor(id: string) {
    return MOCK_PROJECTS.find(p => p.id === id)?.coverColor ?? 'var(--color-neutral-9)';
  }

  return (
    <div className="flex gap-8 p-6">
      <div className="min-w-0 flex-1 space-y-6">
        <h1 className="typo-header typo-6 text-neutral-12">Weekly Percentage</h1>
        <p className="typo-body typo-3 text-neutral-10">Team time allocation across projects by week.</p>

        <Separator />

        <div className="flex flex-wrap items-center gap-4">
          {projectIds.map(id => (
            <div key={id} className="flex items-center gap-2">
              <div className="size-3 rounded-full" style={{ backgroundColor: getProjectColor(id) }} />
              <span className="typo-2 text-neutral-10">{getProjectName(id)}</span>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          {weeks.map((week) => {
            const totalPercentage = Object.values(week.projectTotals).reduce((s, v) => s + v, 0);

            return (
              <div key={week.weekOf} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="typo-label typo-2 text-neutral-12">
                    Week of{' '}
                    {new Date(week.weekOf).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                  <span className="typo-1 text-neutral-8">
                    {week.submissionCount} submissions
                  </span>
                </div>

                <div className="flex h-8 w-full overflow-hidden rounded-md">
                  {projectIds.map((id) => {
                    const value = week.projectTotals[id] ?? 0;

                    if (value === 0) return null;

                    const width = (value / totalPercentage) * 100;

                    return (
                      <div
                        key={id}
                        className="flex-col-center typo-1 typo-weight-500 text-white"
                        style={{ width: `${width}%`, backgroundColor: getProjectColor(id) }}
                        title={`${getProjectName(id)}: ${value}%`}
                      >
                        {width > 10 ? `${Math.round(width)}%` : ''}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <aside className="sticky top-6 w-80 shrink-0 self-start">
        <WPSubmit />
      </aside>
    </div>
  );
}
