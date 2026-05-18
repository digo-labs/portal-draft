import { Button, Icon, ToggleTheme } from '@digo-labs/ui';

export function HomePage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 className="typo-4 typo-header">@digo-labs app template</h1>
      <p className="typo-body text-neutral-11">Edit `src/pages/home.tsx` to customize.</p>

      <Button>Click me</Button>

      <ToggleTheme className="absolute top-2 right-2 p-2" />
      
      <Icon icon="arrowDownRight" className="typo-6" />
    </div>
  );
}
