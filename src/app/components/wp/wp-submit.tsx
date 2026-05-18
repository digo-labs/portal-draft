import { Button, Icon, Select, SelectTrigger, SelectValue, SelectPopup, SelectItem, Separator } from '@digo-labs/ui';

import { MOCK_PROJECTS }       from 'data/mock-projects';
import { MOCK_WP_SUBMISSIONS } from 'data/mock-wp';

const activeProjects = MOCK_PROJECTS.filter(p => p.status === 'active');

const latestWeek = [...new Set(MOCK_WP_SUBMISSIONS.map(s => s.weekOf))].sort().reverse()[0];

const thisWeekSubmissions = MOCK_WP_SUBMISSIONS.filter(s => s.weekOf === latestWeek);

const thisWeekTotals: { projectId: string; percentage: number; }[] = [];

thisWeekSubmissions.forEach((s) => {
  s.entries.forEach((e) => {
    const existing = thisWeekTotals.find(t => t.projectId === e.projectId);

    if (existing) existing.percentage += e.percentage;
    else thisWeekTotals.push({ projectId: e.projectId, percentage: e.percentage });
  });
});

function getProjectName(id: string) {
  return MOCK_PROJECTS.find(p => p.id === id)?.name ?? id;
}

function getProjectColor(id: string) {
  return MOCK_PROJECTS.find(p => p.id === id)?.coverColor ?? 'var(--color-neutral-9)';
}

export function WPSubmit() {
  const totalPercentage = thisWeekTotals.reduce((sum, t) => sum + t.percentage, 0);

  return (
    <div className="space-y-4">
      <h2 className="typo-label typo-3 text-neutral-12">This Week</h2>

      <div className="flex h-6 w-full overflow-hidden rounded-md">
        {thisWeekTotals.map((t) => {
          const width = totalPercentage > 0 ? (t.percentage / totalPercentage) * 100 : 0;

          return (
            <div
              key={t.projectId}
              className="flex-col-center typo-1 typo-weight-500 text-white"
              style={{ width: `${width}%`, backgroundColor: getProjectColor(t.projectId) }}
              title={`${getProjectName(t.projectId)}: ${t.percentage}%`}
            >
              {width > 15 ? `${t.percentage}%` : ''}
            </div>
          );
        })}
      </div>

      <Separator />

      <div className="space-y-2">
        {thisWeekTotals.map(t => (
          <div key={t.projectId} className="border-neutralA-3 bg-neutral-2 flex items-center gap-3 rounded-md border p-3">
            <div className="size-3 shrink-0 rounded-full" style={{ backgroundColor: getProjectColor(t.projectId) }} />
            <span className="typo-2 text-neutral-12 flex-1 truncate">{getProjectName(t.projectId)}</span>
            <span className="typo-label typo-2 text-neutral-12">
              {t.percentage}
              %
            </span>
          </div>
        ))}
      </div>

      <Separator />

      <div className="flex items-center gap-2">
        <Select defaultValue={activeProjects[0]?.id}>
          <SelectTrigger className="flex-1"><SelectValue /></SelectTrigger>
          <SelectPopup>
            {activeProjects.map(p => (
              <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
            ))}
          </SelectPopup>
        </Select>
        <input
          type="number"
          defaultValue={0}
          min={0}
          max={100}
          className="bg-neutralA-2 border-neutralA-4 typo-2 text-neutral-12 w-16 rounded-sm border px-2 py-1.5 text-right outline-none"
        />
        <span className="typo-2 text-neutral-8">%</span>
      </div>

      <Button variant="ghost" className="w-full">
        <Icon icon="add" className="typo-3" />
        Add Project
      </Button>

      <Separator />

      <Button variant="default" className="w-full">
        Submit
      </Button>
    </div>
  );
}
