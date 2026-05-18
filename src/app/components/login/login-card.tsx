import { cn, IMAGES, VIDEOS }                                                             from '@digo-labs/common';
import { BorderGlow, cssColor, GoogleSignInButton, Image, TextScramble, useDesignSystem } from '@digo-labs/ui';

export function LoginCard() {
  const { mode } = useDesignSystem();

  return (

    <BorderGlow
      borderRadius={0}
      colors={[
        cssColor('--color-accent-4'),
        cssColor('--color-accent-12'),
      ]}
      glowColor={cssColor('--color-accent-11')}
      glowIntensity={2}
      animated={true}
      classNames={{
        root:    'w-2xl shadow-md bg-neutral-1 text-neutral-12',
        content: 'grid grid-flow-col grid-cols-[auto_1fr] gap-6 p-6',
      }}
    >

      <div className="border-neutral-6 h-100 overflow-hidden rounded-sm border border-dashed">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="size-full scale-180 object-contain"
          src={VIDEOS.pcLogo3D}
        />

      </div>

      <div className="relative flex flex-col gap-8">

        <div className="flex flex-col gap-4">
          <TextScramble className="typo-6 typo-label text-neutral-10">
            Welcome to the
          </TextScramble>
          <TextScramble className="typo-8 typo-header text-neutral-12">
            Production HUB
          </TextScramble>

          <p className="text-neutral-10 typo-body typo-4">
            Welcome back, crew. This is where Production Club runs the show — manage projects, sync with the team, and keep every production moving.
          </p>
        </div>

        <GoogleSignInButton data-cursor-target className="p-4 text-left hover:rounded-none active:gap-4 active:px-5" classNames={{ label: 'font-body' }} />

        <Image src={IMAGES.pcLogoV1Svg} className={cn('absolute right-6 bottom-6 h-8', mode === 'light' && 'brightness-0')} />
      </div>

    </BorderGlow>

  );
}
