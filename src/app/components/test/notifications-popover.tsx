import { Button, Icon, Popover, PopoverTrigger, PopoverPopup, Separator } from '@digo-labs/ui';

import { useState } from 'react';

interface Notification {
  id:     string;
  title:  string;
  body:   string;
  time:   string;
  unread: boolean;
}

const INITIAL_NOTIFICATIONS: Notification[] = [
  { id: '1', title: 'WP% Reminder',             body: 'Submit your weekly percentages by Friday.',   time: '2h ago', unread: true },
  { id: '2', title: 'New Announcement',          body: 'PC Hub is Live! Check out the new platform.', time: '5h ago', unread: true },
  { id: '3', title: 'Coachella VIP — All Hands', body: 'Team meeting this Thursday at 2pm.',           time: '1d ago', unread: false },
];

export function NotificationsPopover() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const unreadCount = notifications.filter(n => n.unread).length;

  function dismiss(id: string) {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  }

  function dismissAll() {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  }

  return (
    <Popover>
      <PopoverTrigger render={<Button variant="icon" />} className="relative">
        <Icon icon="notifications" />
        {unreadCount > 0 && (
          <span className="bg-accent-9 absolute -top-0.5 -right-0.5 size-2 rounded-full" />
        )}
      </PopoverTrigger>

      <PopoverPopup className="w-80" sideOffset={8} align="end">
        <div className="flex items-center justify-between p-3">
          <h3 className="typo-label typo-3 text-neutral-12">Notifications</h3>
          {unreadCount > 0 && (
            <button onClick={dismissAll} className="text-accent-10 typo-2 cursor-default">
              Mark all read
            </button>
          )}
        </div>
        <Separator />
        <div className="flex flex-col">
          {notifications.map(notification => (
            <div
              key={notification.id}
              className="hover:bg-neutralA-2 flex cursor-default gap-3 p-3"
              onClick={() => dismiss(notification.id)}
            >
              <div className="mt-1.5 shrink-0">
                {notification.unread
                  ? <span className="bg-accent-9 block size-2 rounded-full" />
                  : <span className="block size-2" />}
              </div>
              <div className="flex-1 space-y-1">
                <p className="typo-label typo-2 text-neutral-12">{notification.title}</p>
                <p className="typo-2 text-neutral-10">{notification.body}</p>
                <p className="typo-1 text-neutral-8">{notification.time}</p>
              </div>
            </div>
          ))}
        </div>
      </PopoverPopup>
    </Popover>
  );
}
