import { Icon, Separator, Spinner } from '@digo-labs/ui';

import { useParams, Link }              from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';

import { services }                            from 'app.config';
import type { User, UserRole, ProjectStatus }  from 'data/types';
import { MOCK_PROJECT_MEMBERS, MOCK_PROJECTS } from 'data/mock-projects';

const ROLE_BADGE: Record<UserRole, string> = {
  admin:      'bg-accent-3 text-accent-11 border-accent-6',
  member:     'bg-neutral-3 text-neutral-11 border-neutral-6',
  freelancer: 'bg-warning-3 text-warning-11 border-warning-6',
};

const STATUS_BADGE: Record<ProjectStatus, string> = {
  'active':    'text-success-9',
  'on-hold':   'text-warning-9',
  'completed': 'text-neutral-10',
  'archived':  'text-neutral-8',
};

export function UserProfile() {
  const { id }          = useParams();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (id) services.users.get(id).then(setUser);
  }, [id]);

  const userProjects = useMemo(() => {
    if (!user) return [];

    const memberships = MOCK_PROJECT_MEMBERS.filter(pm => pm.userId === user.id);

    return memberships.map((pm) => {
      const project = MOCK_PROJECTS.find(p => p.id === pm.projectId);

      return { ...pm, project };
    }).filter(m => m.project);
  }, [user]);

  if (!user) return <div className="flex-col-center h-64"><Spinner /></div>;

  return (
    <div className="mx-auto flex max-w-5xl gap-8 p-6">
      <div className="min-w-0 flex-1 space-y-6">
        <div className="flex items-center gap-5">
          <div
            className="flex-col-center typo-8 typo-weight-600 size-20 shrink-0 rounded-full text-white"
            style={{ backgroundColor: user.avatarColor }}
          >
            {user.name[0]}
          </div>
          <div className="space-y-1">
            <h1 className="typo-header typo-6 text-neutral-12">{user.name}</h1>
            <p className="typo-3 text-neutral-10">{user.title}</p>
            <div className="mt-1 flex items-center gap-2">
              <span className="typo-2 text-neutral-8">{user.department}</span>
              <span className={`typo-1 rounded-full border px-2 py-0.5 ${ROLE_BADGE[user.role]}`}>{user.role}</span>
            </div>
          </div>
        </div>

        <Separator />

        <section className="space-y-3">
          <h2 className="typo-label typo-3 text-neutral-12">Projects</h2>
          <div className="space-y-2">
            {userProjects.map(({ id: pmId, role, project }) => (
              <Link
                key={pmId}
                to={`/projects/${project!.id}`}
                className="hover:bg-neutralA-2 cs-transition flex items-center gap-3 rounded-md p-2 no-underline"
              >
                <div className="size-8 shrink-0 rounded-md" style={{ backgroundColor: project!.coverColor }} />
                <div className="min-w-0 flex-1">
                  <p className="typo-label typo-2 text-neutral-12 truncate">{project!.name}</p>
                  <p className="typo-1 text-neutral-10">{role}</p>
                </div>
                <span className={`typo-1 ${STATUS_BADGE[project!.status]}`}>{project!.status}</span>
              </Link>
            ))}
            {userProjects.length === 0 && (
              <p className="typo-2 text-neutral-8">No projects.</p>
            )}
          </div>
        </section>
      </div>

      <aside className="sticky top-6 w-72 shrink-0 space-y-6 self-start">
        <section className="space-y-3">
          <h2 className="typo-label typo-3 text-neutral-12">Contact</h2>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Icon icon="email" className="typo-3 text-neutral-8" />
              <span className="typo-2 text-neutral-11">{user.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon icon="call" className="typo-3 text-neutral-8" />
              <span className="typo-2 text-neutral-11">{user.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon icon="hash" className="typo-3 text-neutral-8" />
              <span className="typo-2 text-neutral-11">{user.slack}</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon icon="calendar" className="typo-3 text-neutral-8" />
              <span className="typo-2 text-neutral-11">
                Joined
                {' '}
                {new Date(user.joinedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
            </div>
          </div>
        </section>

        <Separator />

        <section className="space-y-3">
          <h2 className="typo-label typo-3 text-neutral-12">Skills & Expertise</h2>
          <div className="flex flex-wrap gap-2">
            {user.skills.map(skill => (
              <span key={skill} className="border-neutralA-4 bg-neutralA-2 typo-2 text-neutral-11 rounded-full border px-3 py-1">
                {skill}
              </span>
            ))}
          </div>
        </section>
      </aside>
    </div>
  );
}
