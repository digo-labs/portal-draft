import { Icon, InputGroup, InputGroupInput, InputGroupAddon } from '@digo-labs/ui';

import { useEffect, useState } from 'react';
import { Link }                from 'react-router-dom';

import { services }            from 'app.config';
import type { User, UserRole } from 'data/types';

const ROLE_BADGE: Record<UserRole, string> = {
  admin:      'bg-accent-3 text-accent-11 border-accent-6',
  member:     'bg-neutral-3 text-neutral-11 border-neutral-6',
  freelancer: 'bg-warning-3 text-warning-11 border-warning-6',
};

export function TeamDirectory() {
  const [users, setUsers]   = useState<User[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    services.users.getAll().then(setUsers);
  }, []);

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase())
    || u.department.toLowerCase().includes(search.toLowerCase())
    || u.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="typo-header typo-6 text-neutral-12">Team</h1>
        <InputGroup className="w-64">
          <InputGroupAddon>
            <Icon icon="search" />
          </InputGroupAddon>
          <InputGroupInput
            placeholder="Search team..."
            value={search}
            onChange={e => setSearch((e.target as HTMLInputElement).value)}
          />
        </InputGroup>
      </div>

      <table className="w-full">
        <thead>
          <tr className="text-neutral-10 typo-2 border-neutral-6 border-b text-left">
            <th className="pb-3 font-normal">Name</th>
            <th className="pb-3 font-normal">Title</th>
            <th className="pb-3 font-normal">Department</th>
            <th className="pb-3 font-normal">Role</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(user => (
            <tr key={user.id} className="border-neutral-6 hover:bg-neutralA-2 cs-transition border-b">
              <td className="py-3">
                <Link to={`/team/${user.id}`} className="flex items-center gap-3 no-underline">
                  <div
                    className="flex-col-center typo-2 typo-weight-600 size-8 shrink-0 rounded-full text-white"
                    style={{ backgroundColor: user.avatarColor }}
                  >
                    {user.name[0]}
                  </div>
                  <span className="typo-label typo-2 text-neutral-12">{user.name}</span>
                </Link>
              </td>
              <td className="typo-2 text-neutral-11 py-3">{user.title}</td>
              <td className="typo-2 text-neutral-11 py-3">{user.department}</td>
              <td className="py-3">
                <span className={`typo-1 rounded-full border px-2 py-0.5 ${ROLE_BADGE[user.role]}`}>
                  {user.role}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
