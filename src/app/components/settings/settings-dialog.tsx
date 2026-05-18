import { Dialog } from '@base-ui/react/dialog';

import {
  Icon, Separator, Select, SelectTrigger, SelectValue, SelectPopup, SelectItem, SwitchTheme,
} from '@digo-labs/ui';

import { useState, useEffect } from 'react';

import { services }  from 'app.config';
import type { User } from 'data/types';

const SECTIONS = [
  { id: 'general',         label: 'General',         icon: 'settings' },
  { id: 'team-management', label: 'Team Management', icon: 'users' },
  { id: 'notifications',   label: 'Notifications',   icon: 'notifications' },
  { id: 'integrations',    label: 'Integrations',    icon: 'puzzle' },
] as const;

type SectionId = typeof SECTIONS[number]['id'];

interface Properties {
  open:         boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsDialog(properties: Properties) {
  const { open, onOpenChange } = properties;

  const [activeSection, setActiveSection] = useState<SectionId>('general');

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="bg-blackA-8 fixed inset-0 z-50" />
        <Dialog.Popup className="bg-neutral-2 border-neutralA-3 fixed top-1/2 left-1/2 z-50 flex h-130 w-175 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg border shadow-lg">
          <nav className="border-neutral-6 flex w-48 shrink-0 flex-col gap-1 border-r p-3">
            <Dialog.Title className="typo-label typo-3 text-neutral-12 mb-2 px-2">Settings</Dialog.Title>
            {SECTIONS.map(section => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`typo-2 flex items-center gap-2 rounded-sm px-2 py-1.5 ${
                  activeSection === section.id
                    ? 'bg-neutralA-3 text-neutral-12'
                    : 'text-neutral-11 hover:bg-neutralA-2'
                }`}
              >
                <Icon icon={section.icon} className="typo-3" />
                {section.label}
              </button>
            ))}
          </nav>
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="border-neutral-6 flex items-center justify-between border-b px-6 py-3">
              <h2 className="typo-label typo-3 text-neutral-12">
                {SECTIONS.find(s => s.id === activeSection)?.label}
              </h2>
              <Dialog.Close className="text-neutral-11 hover:text-neutral-12 cursor-default">
                <Icon icon="close" className="typo-4" />
              </Dialog.Close>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {activeSection === 'general'         && <GeneralSection />}
              {activeSection === 'team-management' && <TeamManagementSection />}
              {activeSection === 'notifications'   && <PlaceholderSection title="Notifications" />}
              {activeSection === 'integrations'    && <PlaceholderSection title="Integrations" />}
            </div>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function GeneralSection() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="typo-label typo-3 text-neutral-12 mb-4">Appearance</h3>
        <div className="flex items-center justify-between">
          <span className="typo-2 text-neutral-11">Theme</span>
          <SwitchTheme />
        </div>
      </div>
      <Separator />
      <div>
        <h3 className="typo-label typo-3 text-neutral-12 mb-4">About</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="typo-2 text-neutral-11">Version</span>
            <span className="typo-2 text-neutral-12">0.1.0 POC</span>
          </div>
          <div className="flex justify-between">
            <span className="typo-2 text-neutral-11">Preset</span>
            <span className="typo-2 text-neutral-12">PC Hub</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function TeamManagementSection() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    services.users.getAll().then(setUsers);
  }, []);

  function handleRoleChange(userId: string, role: string) {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: role as User['role'] } : u));
  }

  return (
    <div>
      <h3 className="typo-label typo-3 text-neutral-12 mb-4">Team Members</h3>
      <table className="w-full">
        <thead>
          <tr className="text-neutral-10 typo-2 border-neutral-6 border-b text-left">
            <th className="pb-2 font-normal">User</th>
            <th className="pb-2 font-normal">Department</th>
            <th className="pb-2 font-normal">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id} className="border-neutral-6 border-b">
              <td className="py-2">
                <div>
                  <p className="typo-label typo-2 text-neutral-12">{u.name}</p>
                  <p className="typo-1 text-neutral-10">{u.email}</p>
                </div>
              </td>
              <td className="typo-2 text-neutral-11 py-2">{u.department}</td>
              <td className="py-2">
                <Select value={u.role} onValueChange={value => value && handleRoleChange(u.id, value)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectPopup>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="member">Member</SelectItem>
                    <SelectItem value="freelancer">Freelancer</SelectItem>
                  </SelectPopup>
                </Select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PlaceholderSection(properties: { title: string; }) {
  const { title } = properties;

  return (
    <div className="flex-col-center text-neutral-10 h-40 gap-2">
      <Icon icon="wrench" className="typo-8" />
      <p className="typo-2">
        {title}
        {' '}
        settings coming soon
      </p>
    </div>
  );
}
