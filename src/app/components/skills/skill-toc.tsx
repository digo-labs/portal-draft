import { Icon, ScrollArea, TableOfContents, TableOfContentsHeader, TableOfContentsItems, useTocHeadings } from '@digo-labs/ui';

import { ComponentProps, useCallback, useEffect, useState } from 'react';
import { useLocation }                                      from 'react-router-dom';

export function SkillTOC(properties: ComponentProps<typeof TableOfContents>) {
  const { pathname }                  = useLocation();
  const items                         = useTocHeadings(pathname);
  const [activeSlugs, setActiveSlugs] = useState<string[]>([]);

  const onScroll = useCallback(() => {
    const active: string[] = [];

    for (let i = 0; i < items.length; i++) {
      const element = document.getElementById(items[i].slug);

      if (!element) continue;

      const sectionTop    = element.getBoundingClientRect().top;
      const next          = i + 1 < items.length ? document.getElementById(items[i + 1].slug) : null;
      const sectionBottom = next ? next.getBoundingClientRect().top : Infinity;

      if (sectionTop < window.innerHeight && sectionBottom > 100) {
        active.push(items[i].slug);
      }
    }

    setActiveSlugs(active);
  }, [items]);

  useEffect(() => {
    if (items.length === 0) return;

    let container: HTMLElement | null = document.querySelector('main');

    while (container && getComputedStyle(container).overflowY !== 'auto') {
      container = container.parentElement;
    }

    if (!container) return;

    // Defer the initial scroll calculation out of the effect body so React's
    // strict purity check doesn't flag the setState call.
    const initial = setTimeout(onScroll, 0);

    container.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      clearTimeout(initial);
      container.removeEventListener('scroll', onScroll);
    };
  }, [onScroll, items.length]);

  useEffect(() => {
    if (activeSlugs.length === 0) return;

    const active = document.querySelector('[data-slot="toc-item"][data-active="true"]');
    active?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, [activeSlugs]);

  if (items.length === 0) return null;

  return (
    <TableOfContents {...properties}>
      <TableOfContentsHeader>
        <Icon icon="listView" />
        On this page
      </TableOfContentsHeader>
      <ScrollArea scrollFade={true} classNames={{ scrollbar: 'hidden' }}>
        <TableOfContentsItems items={items} activeSlugs={activeSlugs} />
      </ScrollArea>
    </TableOfContents>
  );
}
