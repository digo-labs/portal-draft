import { CursorBracket, CursorContainer } from '@digo-labs/ui';

import { ActiveProjectsWidget } from 'app/components/home/active-projects-widget';
import { PercentageWidget }     from 'app/components/home/percentage-widget';
import { LogoAppWidget }        from 'app/components/home/logo-app-widget';
import { CopyAppWidget }        from 'app/components/home/copy-app-widget';
import { CurrentProjectWidget } from 'app/components/home/current-project-widget';
import { LastSkillsWidget }     from 'app/components/home/last-skills-widget';
import { WellcomeWidget }       from 'app/components/home/welcom-widget';

export function Home() {
  return (
    <CursorContainer showNativeCursor={true}>

      <div className="relative grid h-[calc(100dvh-var(--navbar-h))] grid-cols-4 grid-rows-3 gap-5 overflow-hidden p-8">
        <WellcomeWidget className="col-start-1 col-end-2 row-start-1 row-end-1" />
        <PercentageWidget data-cursor-target className="col-start-2 col-end-3 row-start-1 row-end-3" />
        <ActiveProjectsWidget data-cursor-target className="col-start-3 col-end-4 row-start-1 row-end-2" />
        <CurrentProjectWidget data-cursor-target className="col-start-4 col-end-5 row-start-1 row-end-4"  />
        <LastSkillsWidget data-cursor-target className="col-start-3 col-end-4 row-start-2 row-end-3" />
        <LogoAppWidget data-cursor-target className="col-start-1 col-end-2 row-start-2 row-end-4" />
        <CopyAppWidget data-cursor-target className="col-start-2 col-end-4 row-start-3 row-end-4" />

        <CursorBracket offset={0} borderWidth={2} color="var(--color-neutral-12) z-1000" />
      </div>
    </CursorContainer>

  );
}
