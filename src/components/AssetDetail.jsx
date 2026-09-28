import { X, FileCode, CheckSquare, Square, ChevronRight } from 'lucide-react';
import { StatusBadge, TypeBadge } from './ui';
import { STATUS_CONFIG, KANBAN_COLUMNS } from '../constants';

export default function AssetDetail({ asset, onClose, toggleQA, updateStatus }) {
  const qaDone = asset.qa.filter(q => q.done).length;
  const qaTotal = asset.qa.length;
  const qaPercent = qaTotal ? Math.round((qaDone / qaTotal) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative w-full max-w-xl h-full bg-[#0a1f2e] border-l border-white/5 overflow-y-auto flex flex-col"
        onClick={e => e.stopPropagation()}
        style={{ animation: 'slideIn 0.25s ease' }}
      >
        <style>{`
          @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
        `}</style>

        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#0a1f2e] border-b border-white/5 p-6 flex items-start justify-between">
          <div className="flex-1 pr-4">
            <div className="flex items-center gap-2 mb-2">
              <TypeBadge type={asset.type} />
              <StatusBadge status={asset.status} />
            </div>
            <h2 className="font-marcellus text-sable text-xl">{asset.name}</h2>
            <p className="text-xs text-sable/40 mt-1">ID: <code className="text-or/60">{asset.id}</code></p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <a
              href={`#/asset/${asset.id}`}
              className="text-xs text-or hover:text-or-light font-medium px-3 py-1.5 rounded-lg border border-or/30 hover:border-or/60 transition-colors inline-flex items-center gap-1"
            >
              Fiche complète
              <ChevronRight size={13} />
            </a>
            <button
              onClick={onClose}
              className="text-sable/40 hover:text-sable transition-colors p-1 rounded-lg hover:bg-white/5"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="flex-1 p-6 space-y-6">
          {/* Thumbnail preview banner */}
          {asset.thumbnail && (
            <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-white/10 bg-night flex items-center justify-center shadow-lg">
              <img
                src={`/${asset.thumbnail}`}
                alt={asset.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Price & meta */}
          <div className="flex gap-4">
            <div className="bg-night-light rounded-lg p-4 flex-1 text-center border border-white/5">
              <div className="text-2xl font-marcellus text-or">{asset.priceRobux.toLocaleString('fr-FR')} R$</div>
              <div className="text-xs text-sable/50 mt-1">Prix test</div>
            </div>
            {asset.polycount && (
              <div className="bg-night-light rounded-lg p-4 flex-1 text-center border border-white/5">
                <div className="text-2xl font-marcellus text-zellige-light">{asset.polycount.toLocaleString('fr-FR')}</div>
                <div className="text-xs text-sable/50 mt-1">triangles</div>
              </div>
            )}
            {asset.propCount && (
              <div className="bg-night-light rounded-lg p-4 flex-1 text-center border border-white/5">
                <div className="text-2xl font-marcellus text-terracotta">{asset.propCount}</div>
                <div className="text-xs text-sable/50 mt-1">props</div>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs font-semibold text-sable/50 uppercase tracking-wider mb-2">Description</h3>
            <p className="text-sm text-sable/80 leading-relaxed">{asset.description}</p>
          </div>

          {/* Tags */}
          {asset.tags && asset.tags.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-sable/50 uppercase tracking-wider mb-2">Tags</h3>
              <div className="flex flex-wrap gap-1.5">
                {asset.tags.map(tag => (
                  <span key={tag} className="text-xs px-2 py-1 rounded-md bg-white/5 text-sable/60 border border-white/5">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Files */}
          {asset.files && asset.files.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-sable/50 uppercase tracking-wider mb-2">Fichiers sources</h3>
              <div className="space-y-1.5">
                {asset.files.map(f => (
                  <div key={f} className="flex items-center gap-2 text-xs bg-night-light rounded-lg px-3 py-2 border border-white/5">
                    <FileCode size={13} className="text-or/60" />
                    <code className="text-sable/70 font-mono">{f}</code>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Change status */}
          <div>
            <h3 className="text-xs font-semibold text-sable/50 uppercase tracking-wider mb-2">Changer le statut</h3>
            <div className="flex flex-wrap gap-2">
              {KANBAN_COLUMNS.map(col => (
                <button
                  key={col.id}
                  onClick={() => updateStatus(asset.id, col.id)}
                  className={`
                    text-xs px-3 py-1.5 rounded-lg border transition-all duration-200
                    ${asset.status === col.id
                      ? 'bg-zellige/20 border-zellige/40 text-zellige-light font-medium'
                      : 'bg-white/5 border-white/10 text-sable/50 hover:border-zellige/30 hover:text-sable'
                    }
                  `}
                >
                  {col.id === asset.status && '✓ '}
                  {col.label}
                </button>
              ))}
            </div>
          </div>

          {/* QA Checklist */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold text-sable/50 uppercase tracking-wider">
                Checklist QA
              </h3>
              <span className={`text-xs font-medium ${qaPercent === 100 ? 'text-green-400' : 'text-or'}`}>
                {qaDone}/{qaTotal} — {qaPercent}%
              </span>
            </div>

            {/* Progress bar */}
            <div className="h-1.5 bg-night rounded-full overflow-hidden mb-3">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${qaPercent}%`,
                  background: qaPercent === 100 ? '#4ade80' : qaPercent > 50 ? '#C9A227' : '#0F6B5C',
                }}
              />
            </div>

            <div className="space-y-2">
              {asset.qa.map((item, idx) => (
                <label
                  key={idx}
                  className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/5 cursor-pointer group transition-colors"
                >
                  <button
                    onClick={() => toggleQA(asset.id, idx)}
                    className="flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                  >
                    {item.done
                      ? <CheckSquare size={18} className="text-green-400" />
                      : <Square size={18} className="text-sable/30 group-hover:text-sable/60" />
                    }
                  </button>
                  <span className={`text-sm transition-colors ${item.done ? 'text-sable/50 line-through' : 'text-sable/80'}`}>
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Metadata */}
          <div className="border-t border-white/5 pt-4 text-xs text-sable/30 space-y-1">
            <p>Créé le {new Date(asset.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            {asset.waveId && <p>Vague : <code className="text-or/40">{asset.waveId}</code></p>}
          </div>
        </div>
      </div>
    </div>
  );
}
