import { Icon, Popover, PopoverTrigger, PopoverPopup, Separator, Image, Spinner, toastManager } from '@digo-labs/ui';
import { useAuth }                                                                              from '@digo-labs/services';
import { tryCatch, IMAGES }                                                                     from '@digo-labs/common';

import { Link }     from 'react-router-dom';
import { useState } from 'react';

import { PATHS }          from 'utils/paths';
import { FeedbackModal }  from 'app/components/feedback-modal';
import { SettingsDialog } from 'app/components/settings/settings-dialog';

const INITIAL_NOTIFICATIONS = [
  { id: '1', title: 'WP% Reminder',             body: 'Submit your weekly percentages by Friday.',   time: '2h ago', unread: true },
  { id: '2', title: 'New Announcement',          body: 'PC Hub is Live! Check out the new platform.', time: '5h ago', unread: true },
  { id: '3', title: 'Coachella VIP — All Hands', body: 'Team meeting this Thursday at 2pm.',           time: '1d ago', unread: false },
];

export function AvatarDropdown() {
  const { user, signOut }                  = useAuth();
  const [isSigningOut, setIsSigningOut]    = useState(false);
  const [feedbackOpen, setFeedbackOpen]    = useState(false);
  const [settingsOpen, setSettingsOpen]    = useState(false);
  const [menuOpen, setMenuOpen]            = useState(false);
  const [notifications]                    = useState(INITIAL_NOTIFICATIONS);

  async function handleSignOut() {
    setIsSigningOut(true);

    const [, error] = await tryCatch(signOut());

    if (error) {
      toastManager.add({ type: 'error', title: 'Sign out failed', description: error.message });
      setIsSigningOut(false);
    }
  }

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <>
      <Popover open={menuOpen} onOpenChange={setMenuOpen}>
        <PopoverTrigger className="group typo-2 typo-weight-600 cs-transition border-neutral-11 hover:border-accent-12 relative size-7 rounded-full border p-0 shadow-md">

          <Image src={user?.image ? user.image : IMAGES.userPlaceholder} className="rounded-full" />

          {unreadCount > 0 && (
            <span className="bg-accent-11 cs-transition border-neutral-2 absolute -top-0.5 -right-0.5 size-2.5 rounded-full border group-hover:scale-110" />
          )}
        </PopoverTrigger>

        <PopoverPopup className="w-72" classNames={{ content: 'p-2' }} sideOffset={8} align="end">
          <div className="flex items-center gap-2">
            <Image src={user?.image ? user.image : IMAGES.digoLogo} className="border-neutral-6 size-10 rounded-sm border" />
            <div className="">
              <p className="typo-label typo-3 text-neutral-12">{user?.name ?? 'User'}</p>
              <p className="typo-2 text-neutral-10">{user?.email ?? ''}</p>
            </div>
          </div>
          <Separator className="border-neutralA-4 border-b border-dashed bg-transparent" />

          {notifications.some(n => n.unread) && (
            <>
              <div className="flex flex-col">
                {notifications.filter(n => n.unread).map(notification => (
                  <div
                    key={notification.id}
                    className="hover:bg-neutralA-3 flex cursor-default items-start gap-2 rounded-sm p-3"
                  >
                    <span className="bg-accent-9 mt-1.5 block size-2 shrink-0 rounded-full" />
                    <div className="min-w-0 flex-1 space-y-0.5">
                      <p className="typo-label typo-2 text-neutral-12">{notification.title}</p>
                      <p className="typo-1 text-neutral-10 truncate">{notification.body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Separator className="border-neutralA-4 border-b border-dashed bg-transparent" />
            </>
          )}

          <div className="flex flex-col">
            <Link to={PATHS.team} className="text-neutral-11 hover:bg-neutralA-2 typo-2 flex items-center gap-2 rounded-sm px-2 py-1.5 no-underline" onClick={() => setMenuOpen(false)}>
              <Icon icon="person" className="typo-3" />
              Profile
            </Link>
            <button
              onClick={() => {
                setMenuOpen(false);
                setSettingsOpen(true);
              }}
              className="text-neutral-11 hover:bg-neutralA-2 typo-2 flex w-full cursor-default items-center gap-2 rounded-sm px-2 py-1.5"
            >
              <Icon icon="settings" className="typo-3" />
              Settings
            </button>
            <button
              onClick={() => {
                setMenuOpen(false);
                setFeedbackOpen(true);
              }}
              className="text-neutral-11 hover:bg-neutralA-2 typo-2 flex w-full cursor-default items-center gap-2 rounded-sm px-2 py-1.5"
            >
              <Icon icon="chat" className="typo-3" />
              Feedback
            </button>
            <a href="https://production.club" target="_blank" rel="noreferrer" className="text-neutral-11 hover:bg-neutralA-2 typo-2 flex items-center gap-2 rounded-sm px-2 py-1.5 no-underline">
              <Icon icon="externalLink" className="typo-3" />
              PC Website
            </a>
          </div>

          <Separator className="border-neutralA-4 border-b border-dashed bg-transparent" />

          <div className="p-0">
            <button
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="text-neutral-11 hover:bg-neutralA-2 typo-2 flex w-full cursor-default items-center gap-2 rounded-sm px-2 py-1.5"
            >
              <Icon icon="logout" className="typo-3" />
              Sign Out
              {isSigningOut && <Spinner className="typo-2 ml-auto" />}
            </button>
          </div>
        </PopoverPopup>
      </Popover>

      <FeedbackModal open={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
    </>
  );
}
