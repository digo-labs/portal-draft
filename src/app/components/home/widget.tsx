import { cn } from '@digo-labs/common';

import { ComponentProps } from 'react';

export function Widget(properties: ComponentProps<'div'>) {
  const { className, ...props } = properties;

  return (
    <div
      className={cn('group border-neutral-6 bg-neutral-3 cs-transition flex rounded-lg border border-dashed hover:rounded-none hover:shadow-lg', className)}
      {...props}
    />
  );
}
