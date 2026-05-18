import { Button, Icon, Select, SelectTrigger, SelectValue, SelectPopup, SelectItem, TextArea, Input, Separator, toastManager } from '@digo-labs/ui';

import { useState } from 'react';

interface Properties {
  open:    boolean;
  onClose: () => void;
}

export function FeedbackModal(properties: Properties) {
  const { open, onClose }             = properties;
  const [category, setCategory]       = useState('bug');
  const [title, setTitle]             = useState('');
  const [description, setDescription] = useState('');

  if (!open) return null;

  function handleSubmit() {
    if (!title.trim()) {
      toastManager.add({ type: 'error', title: 'Please enter a title.' });
      return;
    }

    toastManager.add({ type: 'success', title: 'Feedback submitted! Thank you.' });
    setCategory('bug');
    setTitle('');
    setDescription('');
    onClose();
  }

  return (
    <div className="flex-col-center fixed inset-0 z-50 bg-black/50" onClick={onClose}>
      <div
        className="bg-neutral-1 border-neutralA-3 w-full max-w-lg space-y-4 rounded-xl border p-6 shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="typo-label typo-4 text-neutral-12">Send Feedback</h2>
          <Button variant="icon" onClick={onClose}>
            <Icon icon="close" />
          </Button>
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="typo-label typo-2 text-neutral-10">Category</label>
            <Select value={category} onValueChange={v => v && setCategory(v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectPopup>
                <SelectItem value="bug">Bug Report</SelectItem>
                <SelectItem value="feature">Feature Request</SelectItem>
                <SelectItem value="idea">Idea</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectPopup>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="typo-label typo-2 text-neutral-10">Title</label>
            <Input
              placeholder="Brief description..."
              value={title}
              onChange={e => setTitle((e.target as HTMLInputElement).value)}
            />
          </div>

          <div className="space-y-2">
            <label className="typo-label typo-2 text-neutral-10">Description</label>
            <TextArea
              placeholder="Tell us more..."
              value={description}
              onChange={e => setDescription((e.target as HTMLTextAreaElement).value)}
              className="min-h-24"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="default" onClick={handleSubmit}>Submit Feedback</Button>
        </div>
      </div>
    </div>
  );
}
