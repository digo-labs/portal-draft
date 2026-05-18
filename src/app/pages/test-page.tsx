import { useState }                                                                         from 'react';
import { CommonHelpers }                                                                    from '@digo-labs/common';
import { CursorBracket, CursorContainer, DissolveOverlay, Noise, parseColor, TextScramble } from '@digo-labs/ui';

type Scene = 'production' | 'destruction';

export function TestPage() {
  const [dissolved, setDissolved]        = useState(false);
  const [, setCurrentScene]              = useState<Scene | null>(null);

  return (
    <div className="text-neutral-12 fixed flex h-dvh w-dvw flex-col overflow-hidden">

      <div className="flex-col-center bg-accent-4 absolute inset-0 size-full" />

      <DissolveOverlay
        dissolve={dissolved}
        color={parseColor(CommonHelpers.getCssVariable('--color-neutral-4'))}
        duration={0.8}
      />

      <Noise />

      <CursorContainer
        showNativeCursor={true}
        className="flex-col-center absolute inset-0 z-100 gap-0 "
      >

        <CursorBracket color="var(--color-neutral-12)" borderWidth={2} />

        <TextScramble
          triggerOnMouse={true}
          className="typo-4 typo-code text-neutral-12 p-4 tracking-widest uppercase select-none"
        >
          Welcome to the club
        </TextScramble>

        <div className="flex-row-center gap-20 pb-10">

          <div
            className="cs-transition"
            data-cursor-target
            onMouseEnter={() => {
              setCurrentScene('production');
              setDissolved(true);
            }}
            onMouseLeave={() => setDissolved(false)}
          >
            <TextScramble
              triggerOnMouse={true}
              className="typo-8 typo-code text-neutral-12 cs-transition p-4 tracking-widest uppercase select-none"
            >
              Production
            </TextScramble>
          </div>

          <TextScramble
            triggerOnMouse={false}
            className="typo-8 typo-code text-neutral-12 p-4 tracking-widest uppercase select-none"
          >
            //
          </TextScramble>

          <div
            className="cs-transition"
            data-cursor-target
            onMouseEnter={() => {
              setCurrentScene('destruction');
              setDissolved(true);
            }}
            onMouseLeave={() => setDissolved(false)}
          >
            <TextScramble
              triggerOnMouse={true}
              className="typo-8 typo-code text-neutral-12 p-4 tracking-widest uppercase select-none"
            >
              Destruction
            </TextScramble>
          </div>

        </div>

      </CursorContainer>

    </div>
  );
}
