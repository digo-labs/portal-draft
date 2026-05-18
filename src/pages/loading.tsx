import { Spinner } from '@digo-labs/ui';

export function LoadingPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Spinner />
    </div>
  );
}
