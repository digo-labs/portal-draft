import { useAuth } from '@digo-labs/services';
import { Button }  from '@digo-labs/ui';

export function AuthTest() {
  const { signOut } = useAuth();

  return (
    <div className="flex-col-center border-neutral-4 w-full gap-4 border p-4 select-none">

      <Button variant="secondary" onClick={() => signOut()} className="w-full">
        Logout
      </Button>

    </div>
  );
}
