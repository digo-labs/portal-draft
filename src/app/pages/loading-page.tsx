import { CursorContainer, TextScramble } from '@digo-labs/ui';

export function LoadingPage() {
  return (
    <CursorContainer showNativeCursor={true}>

      <div className="bg-neutral-4 flex-col-center h-dvh w-dvw">
        <TextScramble className="typo-10 typo-header  text-neutral-12 ">
          Loading
        </TextScramble>
      </div>

    </CursorContainer>

  );
}
