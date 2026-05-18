import { GoogleSignInButton } from '@digo-labs/ui';

export function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1 className="typo-header text-2xl">Sign in to continue</h1>
      <GoogleSignInButton />
    </div>
  );
}
