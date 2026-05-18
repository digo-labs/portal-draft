/* eslint-disable react-hooks/static-components --
 * The lazy() call is cached in a module-level Map so each `name` always gets
 * the same component identity. ESLint can't trace through the cache, so we
 * disable the rule here. */

import { Icon, Spinner } from '@digo-labs/ui';

import { ComponentType, Suspense, lazy } from 'react';

interface Properties {
  name:       string;
  className?: string;
}

// Cache lazy components by name across renders + component instances so React
// gets a stable identity each time we render this skill.
const exampleCache = new Map<string, ComponentType>();

function getExampleComponent(name: string): ComponentType {
  let cached = exampleCache.get(name);

  if (!cached) {
    cached = lazy(() => import(`../../examples/${name}.tsx`).catch(() => ({ default: () => <SkillPreviewPlaceholder /> })));
    exampleCache.set(name, cached);
  }

  return cached;
}

export function SkillPreview(properties: Properties) {
  const { name, className } = properties;
  const Example             = getExampleComponent(name);

  return (
    <div className={`border-neutralA-3 bg-neutral-2 flex-col-center min-h-40 overflow-hidden rounded-lg border p-8 ${className ?? ''}`}>
      <Suspense fallback={<Spinner />}>
        <Example />
      </Suspense>
    </div>
  );
}

function SkillPreviewPlaceholder() {
  return (
    <div className="flex-col-center text-neutral-8 gap-2">
      <Icon icon="sparkles" className="typo-8" />
      <p className="typo-2">Preview coming soon</p>
    </div>
  );
}
