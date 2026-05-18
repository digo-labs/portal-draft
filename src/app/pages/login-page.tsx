import { cssColor, CursorBracket, CursorContainer, Grainient, Noise, ToggleTheme, useDesignSystem } from '@digo-labs/ui';

import { LoginCard } from 'app/components/login/login-card';

export function LoginPage() {
  useDesignSystem();

  return (

    <CursorContainer showNativeCursor={true}>

      <div className="bg-neutral-3 grid h-dvh w-dvw place-items-center">

        <Grainient
          color1={cssColor('--color-accent-6')}
          color2={cssColor('--color-accent-9')}
          color3={cssColor('--color-neutral-3')}
          grainAnimated={false}
          timeSpeed={0.25}
          colorBalance={0}
          warpStrength={1}
          warpFrequency={5}
          warpSpeed={2}
          warpAmplitude={50}
          blendAngle={0}
          blendSoftness={0.05}
          rotationAmount={500}
          noiseScale={2}
          grainAmount={0.1}
          grainScale={2}
          contrast={1.5}
          gamma={1}
          saturation={1}
          centerX={0}
          centerY={0}
          zoom={0.9}
        />

        <LoginCard />

        <ToggleTheme data-cursor-target className="absolute top-2 right-2 p-2" />

        <Noise patternAlpha={20} />

      </div>

      <CursorBracket offset={0} borderWidth={2} color="var(--color-neutral-12) z-1000" />

    </CursorContainer>

  );
}
