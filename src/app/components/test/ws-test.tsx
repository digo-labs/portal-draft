import { Button }              from '@digo-labs/ui';
import { useEffect, useState } from 'react';

import { services } from 'app.config';

export function WsTest() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    services.websockets.send('test', { value });
  }, [value]);

  return (
    <div className="flex-col-center border-neutral-4 w-full gap-4 border p-4 select-none">

      <h3 className="typo-14 typo-label font-pixel-circle">
        {value}
      </h3>

      <Button onClick={() => setValue(Math.floor(Math.random() * 1000))} className="w-full">
        Send random number
      </Button>

    </div>
  );
}
