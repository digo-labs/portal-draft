import { useMemo } from 'react';
import { Link }    from 'react-router-dom';

import { MOCK_PROJECT_MEMBERS }    from 'data/mock-projects';
import { MOCK_USERS }              from 'data/mock-users';
import { Separator, TextScramble } from '@digo-labs/ui';

interface Properties {
  projectId:    string;
  groupByRole?: boolean;
}

export function ProjectTeam(properties: Properties) {
  const { projectId, groupByRole = false } = properties;

  const members = useMemo(() => {
    const pms = MOCK_PROJECT_MEMBERS.filter(pm => pm.projectId === projectId);

    return pms.map((pm) => {
      const user = MOCK_USERS.find(u => u.id === pm.userId);

      return { ...pm, user };
    }).filter(m => m.user);
  }, [projectId]);

  if (!groupByRole) {
    return (
      <div className="space-y-3">
        <h3 className="typo-label typo-3 text-neutral-12">Team</h3>
        <MemberGrid members={members} />
      </div>
    );
  }

  const producers = members.filter(m => m.role.toLowerCase().includes('producer'));
  const rest      = members.filter(m => !m.role.toLowerCase().includes('producer'));

  return (
    <div className="space-y-6">
      {producers.length > 0 && (
        <div className="space-y-3">
          <TextScramble className="typo-label typo-3 text-neutral-12">
            Producers
          </TextScramble>
          <MemberGrid members={producers} />
        </div>
      )}
      <Separator className="bg-neutral-6" />
      {rest.length > 0 && (
        <div className="space-y-3">
          <TextScramble className="typo-label typo-3 text-neutral-12">
            Team
          </TextScramble>
          <MemberGrid members={rest} />
        </div>
      )}
    </div>
  );
}

function MemberGrid(properties: { members: { id: string; userId: string; role: string; user: { name: string; avatarColor: string; department: string; } | undefined; }[]; }) {
  const { members } = properties;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {members.map(member => (
        <Link
          key={member.id}
          to={`/team/${member.userId}`}
          className="border-neutral-6 hover:bg-neutral-3 bg-neutral-4 cs-transition flex items-center gap-3 rounded-md border border-dashed p-2 no-underline hover:border-transparent hover:shadow-md"
        >
          <div
            className="flex-col-center typo-3 typo-weight-600 border-neutral-1 h-full w-10 shrink-0 rounded-sm border text-white shadow-sm"
            style={{ backgroundColor: member.user!.avatarColor }}
          >
            {member.user!.name[0]}
          </div>
          <div className="min-w-0 space-y-1">
            <p className="typo-1 text-neutral-9 typo-label uppercase">{member.user!.department}</p>
            <p className="typo-label typo-2 text-neutral-12 truncate">{member.user!.name}</p>
            <p className="typo-1 text-accent-9">{member.role}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
