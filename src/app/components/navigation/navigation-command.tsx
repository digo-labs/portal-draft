import type { CuratedIcons }                                from '@digo-labs/common';
import {
  Command, CommandInput, CommandList, CommandEmpty,
  CommandGroup, CommandGroupLabel, CommandCollection, CommandItem,
  CommandSeparator, CommandPanel, CommandFooter,
  CommandDialog, CommandDialogPopup,
  CommandProvider,
  Icon, Kbd, KbdGroup, ScrollArea, useAutocompleteFilter,
} from '@digo-labs/ui';

import { Fragment, ReactNode, useCallback, useEffect, useState } from 'react';
import { useNavigate }                                           from 'react-router-dom';

import { PATHS } from 'utils/paths';

interface NavItem {
  title: string;
  icon:  CuratedIcons;
  href:  string;
}

interface NavGroup {
  value: string;
  items: NavItem[];
}

const NAVIGATION_GROUPS: NavGroup[] = [
  {
    value: 'Hub',
    items: [
      { title: 'Home',              icon: 'home',    href: PATHS.home },
      { title: 'Weekly Percentage', icon: 'percent', href: PATHS.wp },
      { title: 'Projects',          icon: 'folder',  href: PATHS.projects },
      { title: 'Team',              icon: 'userCheck',   href: PATHS.team },
    ],
  },
  {
    value: 'Resources',
    items: [
      { title: 'Skills',       icon: 'sparkles',   href: PATHS.skills },
      { title: 'References',   icon: 'layoutGrid', href: PATHS.references },
      { title: 'Brand Assets', icon: 'palette',    href: PATHS.brand },
    ],
  },
  {
    value: 'Apps',
    items: [
      { title: 'Logo Editor', icon: 'magic',      href: PATHS.logoCustomizer },
      { title: 'Copywriting', icon: 'pencilLine', href: PATHS.copywriting },
      { title: 'Test',        icon: 'code',       href: PATHS.test },
    ],
  },
];

export function NavigationCommandProvider(properties: { children: ReactNode; }) {
  const { children }        = properties;
  const [isOpen, setIsOpen] = useState(false);
  const navigate            = useNavigate();
  const filter              = useAutocompleteFilter({ sensitivity: 'base' });

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  const open = useCallback(() => setIsOpen(true), []);

  function handleItemClick(item: NavItem) {
    navigate(item.href);
    setIsOpen(false);
  }

  return (
    <CommandProvider open={open}>
      {children}
      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <CommandDialogPopup>
          <Command
            items={NAVIGATION_GROUPS}
            filter={filter.contains}
            itemToStringValue={item => (item as NavItem).title}
          >
            <CommandInput placeholder="Search pages..." />

            <CommandPanel>
              <ScrollArea>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandList>
                  {(group: NavGroup) => (
                    <Fragment key={group.value}>
                      <CommandGroup items={group.items}>
                        <CommandGroupLabel>{group.value}</CommandGroupLabel>
                        <CommandCollection>
                          {(item: NavItem) => (
                            <CommandItem
                              key={item.title}
                              value={item}
                              onClick={() => handleItemClick(item)}
                            >
                              <Icon icon={item.icon} className="opacity-50" />
                              {item.title}
                            </CommandItem>
                          )}
                        </CommandCollection>
                      </CommandGroup>
                      <CommandSeparator className="last:hidden" />
                    </Fragment>
                  )}
                </CommandList>
              </ScrollArea>
            </CommandPanel>

            <CommandFooter>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <KbdGroup>
                    <Kbd>↑</Kbd>
                    <Kbd>↓</Kbd>
                  </KbdGroup>
                  <span>Navigate</span>
                </div>
                <div className="flex items-center gap-2">
                  <Kbd>↵</Kbd>
                  <span>Open</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Kbd>Esc</Kbd>
                <span>Close</span>
              </div>
            </CommandFooter>
          </Command>
        </CommandDialogPopup>
      </CommandDialog>
    </CommandProvider>
  );
}
