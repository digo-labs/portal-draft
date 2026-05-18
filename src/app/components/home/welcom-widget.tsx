import { Separator, TextScramble } from '@digo-labs/ui';
import { cn }                      from '@digo-labs/common';

import { ComponentProps } from 'react';

import { useAuth } from '@digo-labs/services';

export function WellcomeWidget(properties: ComponentProps<'div'>) {
  const { className, ...props } = properties;

  const { user } = useAuth();

  const firstName = user?.name?.split(' ')[0] ?? 'there';

  return (
    <div className={cn('flex flex-col gap-4 overflow-hidden', className)} {...props}>

      <TextScramble className="typo-6 typo-label text-neutral-11 uppercase">
        Welcome back
      </TextScramble>

      <TextScramble className="typo-12 typo-header">
        {firstName}
      </TextScramble>

      <Separator className="bg-neutral-12 h-4 rounded-none" />

    </div>

  );
}
