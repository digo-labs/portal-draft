import { Icon, Separator } from '@digo-labs/ui';

import { useEffect, useState } from 'react';

import { services }          from 'app.config';
import type { Announcement } from 'data/types';
import { MOCK_USERS }        from 'data/mock-users';

export function AnnouncementsWidget() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    services.announcements.getAll().then(setAnnouncements);
  }, []);

  function getAuthorName(authorId: string) {
    return MOCK_USERS.find(u => u.id === authorId)?.name ?? 'Unknown';
  }

  function getRelativeTime(dateStr: string) {
    // eslint-disable-next-line react-hooks/purity
    const diff  = Date.now() - new Date(dateStr).getTime();
    const hours = Math.floor(diff / 3600000);

    if (hours < 1)  return 'Just now';
    if (hours < 24) return `${hours}h ago`;

    const days = Math.floor(hours / 24);

    return `${days}d ago`;
  }

  return (
    <div className="border-neutralA-3 bg-neutral-2 space-y-3 rounded-lg border p-5">
      <div className="flex items-center gap-2">
        <Icon icon="notifications" className="text-accent-9 typo-4" />
        <h2 className="typo-label typo-3 text-neutral-12">Announcements</h2>
      </div>

      <Separator />

      <div className="space-y-4">
        {announcements.map(a => (
          <div key={a.id} className="space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="typo-label typo-2 text-neutral-12">{a.title}</h3>
              <span className="typo-1 text-neutral-8">{getRelativeTime(a.createdAt)}</span>
            </div>
            <p className="typo-2 text-neutral-10 line-clamp-2">{a.body}</p>
            <p className="typo-1 text-neutral-8">
              —
              {getAuthorName(a.authorId)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
