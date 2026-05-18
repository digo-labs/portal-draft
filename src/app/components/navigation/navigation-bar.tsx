import { cn, IMAGES } from '@digo-labs/common';

import {
  Navbar, NavbarLogo, NavbarContent, NavbarActions,
  NavigationMenu, NavigationMenuList, NavigationMenuItem,
  NavigationMenuTrigger, NavigationMenuContent,
  NavigationMenuLinkCard,
  Icon, CommandButton, useCommand, Image, ToggleTheme,
  useDesignSystem,
} from '@digo-labs/ui';

import { Link } from 'react-router-dom';

import { AvatarDropdown } from 'app/components/navigation/avatar-dropdown';
import { PATHS }          from 'utils/paths';

const navigationMenuTriggerClasses = cn([
  'hover:bg-neutralA-1',
  'data-open:hover:bg-neutral-1 data-open:focus:bg-neutral-1 data-open:bg-neutral-1/50',
  'data-popup-open:bg-neutral-1/50 data-popup-open:hover:bg-neutral-1',
]);

export function NavigationBar() {
  const { open } = useCommand();
  const { mode } = useDesignSystem();

  return (
    <Navbar className="border-neutral-9">

      <NavbarLogo className="ml-2 rounded-sm">
        <Link to={PATHS.home} className="text-neutral-12 typo-3 flex items-center gap-2 rounded-sm no-underline">
          <Image src={IMAGES.pcLogoV1Svg} className={cn('h-4', mode === 'light' && 'brightness-0')} />
        </Link>
        <ToggleTheme />
      </NavbarLogo>

      <NavbarContent className="items-stretch">
        <NavigationMenu align="center" sideOffset={4}>
          <NavigationMenuList>

            <NavigationMenuItem>
              <NavigationMenuTrigger className={navigationMenuTriggerClasses}>Hub</NavigationMenuTrigger>
              <NavigationMenuContent className="w-auto grid-cols-2 gap-0">

                <NavigationMenuLinkCard render={<Link to={PATHS.wp} />} className="row-span-2 flex flex-col justify-start gap-2 p-2">
                  <div className="flex-col-center bg-neutralA-2 border-neutralA-2 h-20 w-full overflow-hidden rounded-sm border">
                    <Image src="https://i.pinimg.com/1200x/44/b2/c0/44b2c0d89a4beb2c3a187aff21615cb6.jpg" className="size-full object-cover" />
                  </div>
                  <div className="flex-col-center flex-1 items-start gap-2">
                    <span className="typo-3 text-neutral-12 typo-label">Weekly Percentage</span>
                    <span className="typo-2 text-neutral-10 text-nowrap">Track time allocation</span>
                  </div>
                </NavigationMenuLinkCard>

                <NavigationMenuLinkCard render={<Link to={PATHS.projects} />} className="flex flex-row items-center justify-start gap-4 p-2">
                  <div className="flex-col-center bg-neutralA-2 border-neutralA-2 rounded-sm border p-2">
                    <Icon icon="folder" className="typo-8 text-neutral-12" />
                  </div>
                  <div className="flex-col-center flex-1 items-start gap-2">
                    <span className="typo-3 text-neutral-12 typo-label">Projects</span>
                    <span className="typo-2 text-neutral-10 text-nowrap">All production projects</span>
                  </div>
                </NavigationMenuLinkCard>
                <NavigationMenuLinkCard render={<Link to={PATHS.team} />} className="flex flex-row items-center justify-start gap-4 p-2">
                  <div className="flex-col-center bg-neutralA-2 border-neutralA-2 rounded-sm border p-2">
                    <Icon icon="userCog" className="typo-8 text-neutral-12" />
                  </div>
                  <div className="flex-col-center flex-1 items-start gap-2">
                    <span className="typo-3 text-neutral-12 typo-label">Team</span>
                    <span className="typo-2 text-neutral-10 text-nowrap">Team directory</span>
                  </div>
                </NavigationMenuLinkCard>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className={navigationMenuTriggerClasses}>Resources</NavigationMenuTrigger>
              <NavigationMenuContent className="w-auto grid-cols-2 gap-0">
                <NavigationMenuLinkCard render={<Link to={PATHS.skills} />} className="flex flex-row items-center justify-start gap-4 p-2">
                  <div className="flex-col-center bg-neutralA-2 border-neutralA-2 rounded-sm border p-2">
                    <Icon icon="sparkles" className="typo-8 text-neutral-12" />
                  </div>
                  <div className="flex-col-center flex-1 items-start gap-2">
                    <span className="typo-3 text-neutral-12 typo-label">Skills</span>
                    <span className="typo-2 text-neutral-10 text-nowrap">AI-powered skill tools</span>
                  </div>
                </NavigationMenuLinkCard>
                <NavigationMenuLinkCard render={<Link to={PATHS.brand} />} className="row-span-2 flex flex-col justify-start gap-4 p-2">
                  <div className="flex-col-center bg-neutralA-2 border-neutralA-2 rounded-sm border p-2">
                    <Image src={IMAGES.pcLogoV1Svg} className={cn('w-full', mode === 'light' && 'brightness-0')} />
                  </div>
                  <div className="flex-col-center flex-1 items-start gap-2">
                    <span className="typo-3 text-neutral-12 typo-label">Brand Assets</span>
                    <span className="typo-2 text-neutral-10 text-nowrap">Brand guidelines & assets</span>
                  </div>
                </NavigationMenuLinkCard>
                <NavigationMenuLinkCard render={<Link to={PATHS.references} />} className="flex flex-row items-center justify-start gap-4 p-2">
                  <div className="flex-col-center bg-neutralA-2 border-neutralA-2 rounded-sm border p-2">
                    <Icon icon="layoutGrid" className="typo-8 text-neutral-12" />
                  </div>
                  <div className="flex-col-center flex-1 items-start gap-2">
                    <span className="typo-3 text-neutral-12 typo-label">References</span>
                    <span className="typo-2 text-neutral-10 text-nowrap">Creative reference board</span>
                  </div>
                </NavigationMenuLinkCard>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className={navigationMenuTriggerClasses}>Apps</NavigationMenuTrigger>
              <NavigationMenuContent className="w-auto grid-cols-[auto_1fr] gap-0">
                <NavigationMenuLinkCard render={<Link to={PATHS.logoCustomizer} />} className="row-span-2 flex h-full flex-col justify-start gap-4 p-2">
                  <div className="flex-col-center bg-neutralA-2 border-neutralA-2 w-60 overflow-hidden rounded-sm border p-2">
                    <Image src={IMAGES.pcLogo3d} className="h-full" />

                  </div>
                  <div className="flex-col-center flex-1 items-start gap-2">
                    <span className="typo-3 text-neutral-12 typo-label">Logo Editor</span>
                    <span className="typo-2 text-neutral-10 text-nowrap">Customize the PC mascot</span>
                  </div>
                </NavigationMenuLinkCard>
                <NavigationMenuLinkCard render={<Link to={PATHS.copywriting} />} className="flex flex-col justify-start gap-4 p-2">
                  <div className="flex-col-center bg-neutralA-2 border-neutralA-2 h-20 w-full overflow-hidden rounded-sm border">
                    <Image src="https://i.pinimg.com/736x/9a/a6/62/9aa662577cca8ffe95c38b225e73ee27.jpg" className="size-full object-cover" />
                  </div>
                  <div className="flex-col-center flex-1 items-start gap-2">
                    <span className="typo-3 text-neutral-12 typo-label">Copywriting</span>
                    <span className="typo-2 text-neutral-10 text-nowrap">Generate brand copy</span>
                  </div>
                </NavigationMenuLinkCard>
                <NavigationMenuLinkCard render={<Link to={PATHS.test} />} className="flex flex-col justify-start gap-4 p-2">
                  <div className="flex-col-center bg-neutralA-2 border-neutralA-2 h-20 w-full overflow-hidden rounded-sm border">
                    <Image src="https://i.pinimg.com/1200x/3b/e9/97/3be99799a52d8dc011d32844b0962e23.jpg" className="size-full object-cover" />
                  </div>
                  <div className="flex-col-center flex-1 items-start gap-2">
                    <span className="typo-3 text-neutral-12 typo-label">Test</span>
                    <span className="typo-2 text-neutral-10 text-nowrap">Development playground</span>
                  </div>
                </NavigationMenuLinkCard>
              </NavigationMenuContent>
            </NavigationMenuItem>

          </NavigationMenuList>
        </NavigationMenu>
      </NavbarContent>

      <NavbarActions className="pr-2">
        <CommandButton onClick={open} classNames={{ root: 'rounded-full', placeholder: 'pr-6' }} />
        <AvatarDropdown />
      </NavbarActions>

    </Navbar>
  );
}
