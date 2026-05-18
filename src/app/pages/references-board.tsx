import { Icon, InputGroup, InputGroupInput, InputGroupAddon, Masonry, ToggleGroup, ToggleGroupItem } from '@digo-labs/ui';

import { useEffect, useState } from 'react';

import { services }                                                 from 'app.config';
import type { Reference }                                           from 'data/types';
import { MOCK_COLLECTIONS, MOCK_COLLECTION_REFERENCES, MOCK_USERS } from 'data';
import { ReferenceDrawer }                                          from 'app/components/references/reference-drawer';

export function ReferencesBoard() {
  const [references, setReferences] = useState<Reference[]>([]);
  const [selected, setSelected]     = useState<Reference | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [search, setSearch]         = useState('');
  const [collection, setCollection] = useState('all');

  useEffect(() => {
    services.references.getAll().then(setReferences);
  }, []);

  const filtered = references.filter((ref) => {
    if (search && !ref.tags.some(t => t.includes(search.toLowerCase())) && !ref.description.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }

    if (collection !== 'all') {
      const refIds = MOCK_COLLECTION_REFERENCES.filter(cr => cr.collectionId === collection).map(cr => cr.referenceId);

      if (!refIds.includes(ref.id)) return false;
    }

    return true;
  });

  function handleSelect(ref: Reference) {
    setSelected(ref);
    setDrawerOpen(true);
  }

  function getUploaderName(id: string) {
    return MOCK_USERS.find(u => u.id === id)?.name ?? 'Unknown';
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="typo-header typo-6 text-neutral-12">References</h1>
        <InputGroup className="w-64">
          <InputGroupAddon>
            <Icon icon="search" />
          </InputGroupAddon>
          <InputGroupInput
            placeholder="Search references..."
            value={search}
            onChange={e => setSearch((e.target as HTMLInputElement).value)}
          />
        </InputGroup>
      </div>

      <div className="flex flex-wrap gap-2">
        <ToggleGroup defaultValue={[collection]} onValueChange={v => setCollection(v[0] ?? 'all')}>
          <ToggleGroupItem value="all" className="typo-2">All</ToggleGroupItem>
          {MOCK_COLLECTIONS.map(col => (
            <ToggleGroupItem key={col.id} value={col.id} className="typo-2">{col.name}</ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <Masonry columns={4}>
        {filtered.map(ref => (
          <button
            key={ref.id}
            onClick={() => handleSelect(ref)}
            className="ring-accent-8 cs-transition w-full cursor-default overflow-hidden rounded-lg hover:ring-2"
          >
            <div
              className="relative w-full"
              style={{ height: ref.height, backgroundColor: ref.imageColor }}
            >
              {ref.imageUrl && (
                <img src={ref.imageUrl} alt={ref.description} className="absolute inset-0 size-full object-cover" />
              )}
              <div className="absolute right-0 bottom-0 left-0 bg-linear-to-t from-black/60 to-transparent p-3 pt-8">
                <p className="typo-2 truncate text-left text-white">{ref.description}</p>
                <p className="typo-1 mt-1 text-left text-white/60">{getUploaderName(ref.uploader)}</p>
              </div>
            </div>
            <div className="bg-neutral-2 flex flex-wrap gap-1 p-2">
              {ref.tags.slice(0, 3).map(tag => (
                <span key={tag} className="bg-neutralA-3 typo-1 text-neutral-10 rounded-full px-2 py-0.5">{tag}</span>
              ))}
            </div>
          </button>
        ))}
      </Masonry>

      <ReferenceDrawer
        reference={selected}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
      />
    </div>
  );
}
