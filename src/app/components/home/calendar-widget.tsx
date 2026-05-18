import { Icon, Separator } from '@digo-labs/ui';

import { useMemo, useState } from 'react';

import { MOCK_MILESTONES } from 'data/mock-projects';

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export function CalendarWidget() {
  const [currentDate] = useState(new Date());

  const year  = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay    = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today       = currentDate.getDate();

  const milestoneDates = useMemo(() => {
    const dates = new Set<number>();

    MOCK_MILESTONES.forEach((m) => {
      const d = new Date(m.date);

      if (d.getFullYear() === year && d.getMonth() === month) {
        dates.add(d.getDate());
      }
    });

    return dates;
  }, [year, month]);

  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  const cells: (number | null)[] = [];

  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="border-neutralA-3 bg-neutral-2 space-y-3 rounded-lg border p-5">
      <div className="flex items-center gap-2">
        <Icon icon="calendar" className="text-accent-9 typo-4" />
        <h2 className="typo-label typo-3 text-neutral-12">{monthName}</h2>
      </div>

      <Separator />

      <div className="grid grid-cols-7 gap-1 text-center">
        {DAYS.map(day => (
          <div key={day} className="typo-1 text-neutral-8 typo-weight-500 py-1">{day}</div>
        ))}

        {cells.map((day, i) => (
          <div
            key={i}
            className={[
              'relative flex-col-center py-1.5 rounded-sm typo-2',
              day === today ? 'bg-accent-9 text-white typo-weight-600' : 'text-neutral-11',
              !day ? '' : 'hover:bg-neutralA-3 cursor-default',
            ].join(' ')}
          >
            {day ?? ''}
            {day && milestoneDates.has(day) && (
              <span className={`absolute bottom-0.5 size-1 rounded-full ${day === today ? 'bg-white' : 'bg-accent-9'}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
