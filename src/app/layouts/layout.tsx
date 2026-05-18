import { motionTransitionPresets } from '@digo-labs/ui';

import { Outlet, useLocation }     from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';

import { NavigationCommandProvider } from 'app/components/navigation/navigation-command';
import { NavigationBar }             from 'app/components/navigation/navigation-bar';

export function Layout() {
  const location = useLocation();

  const topLevelKey = '/' + (location.pathname.split('/')[1] ?? '');

  return (

    <NavigationCommandProvider>
      <div className="bg-neutral-4 text-neutral-12 fixed flex h-dvh w-dvw flex-col overflow-hidden">

        <NavigationBar />
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={topLevelKey}
              initial={{ opacity: 0, translateY: 40 }}
              animate={{ opacity: 1, translateY: 0, transition: motionTransitionPresets.spring5 }}
              exit={{ opacity: 0, transition: { duration: 0 } }}
              className="size-full"
            >

              <Outlet />

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </NavigationCommandProvider>

  );
}
