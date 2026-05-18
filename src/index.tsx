import { AuthGuard } from '@digo-labs/ui';
import { Route, Routes } from 'react-router-dom';

import { LoginPage } from './pages/login';
import { LoadingPage } from './pages/loading';
import { HomePage } from './pages/home';

export function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<AuthGuard fallback={<LoadingPage />} loginPath="/login" />}>
        <Route path="/" element={<HomePage />} />
      </Route>
    </Routes>
  );
}
