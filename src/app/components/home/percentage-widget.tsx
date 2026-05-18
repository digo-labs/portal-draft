import { cn } from '@digo-labs/common';

import { Button, ChartConfig, ChartContainer, ChartLegend, ChartTooltip, Counter, Icon, Pie, PieChart, Select, SelectItem, SelectPopup, SelectTrigger, SelectValue, TextScramble } from '@digo-labs/ui';
import { Widget }                                                                                                                                                                  from 'app/components/home/widget';

import { ComponentProps, useState } from 'react';

const weeks = [
  { label: 'This week',       value: '0' },
  { label: 'Last week',       value: '1' },
  { label: 'Two weeks ago',   value: '2' },
  { label: 'Three weeks ago', value: '3' },
];

const weeklyData: Record<string, { project: string; hours: number; fill: string; }[]> = {
  0: [
    { project: 'chrome',  hours: 18, fill: 'var(--color-chrome)' },
    { project: 'safari',  hours: 12, fill: 'var(--color-safari)' },
    { project: 'firefox', hours: 6,  fill: 'var(--color-firefox)' },
  ],
  1: [
    { project: 'chrome',  hours: 22, fill: 'var(--color-chrome)' },
    { project: 'safari',  hours: 8,  fill: 'var(--color-safari)' },
    { project: 'firefox', hours: 14, fill: 'var(--color-firefox)' },
  ],
  2: [
    { project: 'chrome',  hours: 10, fill: 'var(--color-chrome)' },
    { project: 'safari',  hours: 15, fill: 'var(--color-safari)' },
    { project: 'firefox', hours: 9,  fill: 'var(--color-firefox)' },
  ],
  3: [
    { project: 'chrome',  hours: 14, fill: 'var(--color-chrome)' },
    { project: 'safari',  hours: 11, fill: 'var(--color-safari)' },
    { project: 'firefox', hours: 20, fill: 'var(--color-firefox)' },
  ],
};

const config: ChartConfig = {
  chrome:  { label: 'Reinvent',  color: 'accent-12' },
  safari:  { label: 'Notch',     color: 'accent-10' },
  firefox: { label: 'Hellcrest', color: 'accent-8' },
};

export function PercentageWidget(properties: ComponentProps<'div'>) {
  const { className, ...props } = properties;

  const [selectedWeek, setSelectedWeek] = useState('0');

  const data       = weeklyData[selectedWeek];
  const totalHours = data.reduce((sum, d) => sum + d.hours, 0);

  const weekIndex = Number(selectedWeek);
  const canGoNext = weekIndex > 0;
  const canGoPrev = weekIndex < weeks.length - 1;

  function handlePrev() {
    if (canGoPrev) setSelectedWeek(String(weekIndex + 1));
  }

  function handleNext() {
    if (canGoNext) setSelectedWeek(String(weekIndex - 1));
  }

  return (
    <Widget className={cn('flex-col ', className)} {...props}>
      <div className="flex flex-col items-center gap-3 pt-8">
        <TextScramble className="typo-3 typo-label text-neutral-10 uppercase">
          Past Week
        </TextScramble>
        <TextScramble className="typo-header typo-8">
          Percentages
        </TextScramble>
      </div>

      <div className="relative flex-1 pb-4">
        <ChartContainer config={config} className="h-95 w-full">

          <div className="flex-row-center  absolute inset-0 pb-14 uppercase ">
            <Counter
              value={totalHours}
              places={2}
              classNames={{
                bottomGradient: 'from-neutral-3',
                topGradient:    'from-neutral-3',
              }}
            />
            <span className="typo-11 typo-label opacity-50">
              h
            </span>
          </div>

          <PieChart accessibilityLayer>

            <ChartTooltip isAnimationActive={false} />

            <Pie data={data} dataKey="hours" nameKey="project" innerRadius={80} outerRadius={140} className="border" />

            <ChartLegend className="" layout="horizontal" wrapperStyle={{ padding: 0 }} />
          </PieChart>

        </ChartContainer>
      </div>

      <div className="flex-row-center border-neutral-6 gap-2 border-y border-dashed p-2">
        <Button disabled={!canGoPrev} onClick={handlePrev}>
          <Icon icon="chevronLeft" />
        </Button>
        <Select
          classNames={{ root: 'flex-1' }}
          value={selectedWeek}
          onValueChange={value => value && setSelectedWeek(value)}
          items={weeks}
        >
          <SelectTrigger>
            <SelectValue className="text-center" />
          </SelectTrigger>
          <SelectPopup>
            {weeks.map(({ label, value }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectPopup>
        </Select>
        <Button disabled={!canGoNext} onClick={handleNext}>
          <Icon icon="chevronRight" />
        </Button>
      </div>
      <div className="grid w-full p-2">
        <Button variant="accent" className="typo-label py-4 uppercase">
          <Icon icon="add" />
          Add Weekly Percentages
        </Button>
      </div>
    </Widget>
  );
}
