import { AuthGuard } from '@digo-labs/ui';

import { Route, Routes } from 'react-router-dom';

import { Layout }               from 'app/layouts/layout';
import { LoginPage }            from 'app/pages/login-page';
import { Home }                 from 'app/pages/home';
import { ProjectsPage }         from 'app/pages/projects-page';
import { ProjectDetail }        from 'app/pages/project-detail';
import { WPPage }               from 'app/pages/wp-page';
import { BrandHub }             from 'app/pages/brand-hub';
import { TeamDirectory }        from 'app/pages/team-directory';
import { UserProfile }          from 'app/pages/user-profile';
import { ReferencesBoard }      from 'app/pages/references-board';
import { SkillsGallery }        from 'app/pages/skills-gallery';
import { SkillDetail }          from 'app/pages/skill-detail';
import { LogoCustomizer }       from 'app/pages/logo-customizer';
import { CopywritingGenerator } from 'app/pages/copywriting-generator';
import { TestPage }             from 'app/pages/test-page';
import { PATHS }                from 'utils/paths';
import { LoadingPage }          from 'app/pages/loading-page';

export default function App() {
  return (
    <Routes>

      <Route path={PATHS.login} element={<LoginPage />} />

      <Route element={<AuthGuard fallback={<LoadingPage />} loginPath={PATHS.login}  />}>
        <Route element={<Layout />}>
          <Route path={PATHS.home}          element={<Home />} />
          <Route path={PATHS.projects}      element={<ProjectsPage />} />
          <Route path={PATHS.projectDetail} element={<ProjectDetail />} />
          <Route path={PATHS.wp}            element={<WPPage />} />
          <Route path={PATHS.brand}         element={<BrandHub />} />
          <Route path={PATHS.team}          element={<TeamDirectory />} />
          <Route path={PATHS.teamMember}    element={<UserProfile />} />
          <Route path={PATHS.references}    element={<ReferencesBoard />} />
          <Route path={PATHS.skills}        element={<SkillsGallery />} />
          <Route path={PATHS.skillDetail}   element={<SkillDetail />} />
          <Route path={PATHS.logoCustomizer} element={<LogoCustomizer />} />
          <Route path={PATHS.copywriting}   element={<CopywritingGenerator />} />
          <Route path={PATHS.test}          element={<TestPage />} />
        </Route>
      </Route>

    </Routes>
  );
}
