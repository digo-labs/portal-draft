import { cn } from '@digo-labs/common';

import { Button, Image, Noise, TextScramble, TextType } from '@digo-labs/ui';
import { Widget }                                       from 'app/components/home/widget';

import { ComponentProps } from 'react';

const SENTENCES = [
  'Write bold. Write different.',
  'Words that move people.',
  'Your brand, your voice.',
  'From idea to impact.',
];

export function CopyAppWidget(properties: ComponentProps<'div'>) {
  const { className, ...props } = properties;

  return (
    <Widget className={cn('flex-row', className)} {...props}>

      <div className="border-neutral-6 relative flex-1 overflow-hidden border-r border-dashed p-4">
        <div className="flex-col-center border-neutral-6 relative size-full overflow-hidden rounded-sm border shadow-md">
          <Noise patternAlpha={25} />
          <TextType
            className="text-neutral-12 typo-label! typo-8! relative text-center tracking-widest opacity-90 mix-blend-darken"
            text={SENTENCES}
            loop={true}
            typingSpeed={50}
            variableSpeed={{ min: 10, max: 300 }}
            deletingSpeed={40}
            pauseDuration={1500}
            initialDelay={200}
            showCursor={true}
            cursorCharacter="_"
            cursorBlinkDuration={0.5}
            hideCursorWhileTyping={false}
            hideCursorOnComplete={false}
          />
        </div>
      </div>

      <div className="flex w-80 flex-col justify-center gap-3 p-6">
        <div className="h-20 flex-1 overflow-hidden rounded-sm">
          <Image src="https://i.pinimg.com/736x/9a/a6/62/9aa662577cca8ffe95c38b225e73ee27.jpg" className="size-full object-cover" />
        </div>
        <TextScramble className="typo-3 typo-label text-neutral-10 uppercase">
          Mini app
        </TextScramble>
        <TextScramble className="typo-header typo-8">
          Copywritting
        </TextScramble>

        <p className="typo-body typo-3 ">
          Transform your brand voice with AI-powered copywriting.
        </p>

        <Button variant="outline" className="typo-label self-stretch rounded-sm border-2 py-4 uppercase">
          Explore
        </Button>
      </div>

    </Widget>
  );
}
