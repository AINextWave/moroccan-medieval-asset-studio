import { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import AssetCard from '../components/AssetCard';
import AssetDetail from '../components/AssetDetail';
import { EmptyState } from '../components/ui';
import { STATUS_CONFIG, TYPE_CONFIG } from '../constants';

const ALL_STATUSES = Object.entries(STATUS_CONFIG).map(([id, cfg]) => ({ id, label: cfg.label }));
const ALL_TYPES = Object.entries(TYPE_CONFIG).map(([id, cfg]) => ({ id, label: cfg.label }));

export default function Catalogue({ data, toggleQA, updateStatus }) {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  const filtered = data.assets.filter(asset => {
    const matchSearch = !search ||
      asset.name.toLowerCase().includes(search.toLowerCase()) ||
      asset.description.toLowerCase().includes(search.toLowerCase()) ||
      asset.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchType = !filterType || asset.type === filterType;
    const matchStatus = !filterStatus || asset.status === filterStatus;
    return matchSearch && matchType && matchStatus;
  });

  const selectedAsset = selectedId ? data.assets.find(a => a.id === selectedId) : null;

  const hasFilters = search || filterType || filterStatus;

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 className="text-3xl font-marcellus text-sable">Catalogue</h1>
        <p className="text-sable/50 text-sm mt-1">
          {data.assets.length} assets · {filtered.length} affichés
        </p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-sable/40" />
          <input
            type="text"
            placeholder="Rechercher un asset, tag…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-night-light border border-white/5 rounded-lg text-sable text-sm placeholder-sable/30 focus:outline-none focus:border-zellige/50 transition-colors"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-sable/40 hover:text-sable">
              <X size={14} />
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            className="bg-night-light border border-white/5 rounded-lg text-sable text-sm px-3 py-2.5 focus:outline-none focus:border-zellige/50 appearance-none cursor-pointer min-w-[120px]"
          >
            <option value="">Tous types</option>
            {ALL_TYPES.map(t => (
              <option key={t.id} value={t.id}>{t.label}</option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="bg-night-light border border-white/5 rounded-lg text-sable text-sm px-3 py-2.5 focus:outline-none focus:border-zellige/50 appearance-none cursor-pointer min-w-[130px]"
          >
            <option value="">Tous statuts</option>
            {ALL_STATUSES.map(s => (
              <option key={s.id} value={s.id}>{s.label}</option>
            ))}
          </select>

          {hasFilters && (
            <button
              onClick={() => { setSearch(''); setFilterType(''); setFilterStatus(''); }}
              className="px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sable/60 hover:text-sable text-xs transition-colors flex items-center gap-1.5"
            >
              <X size={13} />
              Effacer
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <EmptyState
          icon="🔍"
          title="Aucun asset trouvé"
          description="Modifiez vos filtres ou ajoutez de nouveaux assets au catalogue."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(asset => (
            <AssetCard
              key={asset.id}
              asset={asset}
              onClick={() => setSelectedId(asset.id)}
            />
          ))}
        </div>
      )}

      {/* Detail panel */}
      {selectedAsset && (
        <AssetDetail
          asset={selectedAsset}
          onClose={() => setSelectedId(null)}
          toggleQA={toggleQA}
          updateStatus={updateStatus}
        />
      )}
    </div>
  );
}
