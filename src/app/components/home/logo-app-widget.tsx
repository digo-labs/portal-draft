import { cn, VIDEOS } from '@digo-labs/common';

import { Button, TextScramble } from '@digo-labs/ui';
import { Widget }               from 'app/components/home/widget';

import { ComponentProps } from 'react';

export function LogoAppWidget(properties: ComponentProps<'div'>) {
  const { className, ...props } = properties;

  return (
    <Widget className={cn('flex-col', className)} {...props}>
      <div className="flex flex-row gap-3 p-4">
        <div className="flex flex-1 flex-col gap-2">
          <TextScramble className="typo-3 typo-label text-neutral-10 uppercase">
            Mini app
          </TextScramble>
          <TextScramble className="typo-header typo-8">
            Logo Editor
          </TextScramble>
        </div>

        <Button variant="outline" className="typo-label self-stretch rounded-sm border-2 py-4 uppercase">
          Explore
        </Button>
      </div>

      <div className="border-neutral-6 relative flex-1 overflow-hidden border-t border-dashed mix-blend-darken">
        <video
          src={VIDEOS.pcLogo3D}
          autoPlay={true}
          muted={true}
          loop={true}
          playsInline={true}
          className="size-full scale-130 object-cover object-center"
        />
      </div>

    </Widget>
  );
}
