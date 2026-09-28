import { ArrowLeft, FileCode, CheckSquare, Square, Calendar } from 'lucide-react';
import { StatusBadge, TypeBadge, QAProgress } from '../components/ui';
import { KANBAN_COLUMNS } from '../constants';
import { navigate } from '../lib/nav';

export default function AssetPage({ asset, toggleQA, updateStatus }) {
  const qaDone = asset.qa.filter(q => q.done).length;

  return (
    <div className="space-y-8 fade-in max-w-5xl">
      {/* Breadcrumb */}
      <button
        onClick={() => navigate('/catalogue')}
        className="inline-flex items-center gap-2 text-sm text-sable/50 hover:text-sable transition-colors"
      >
        <ArrowLeft size={15} />
        Retour au catalogue
      </button>

      {/* Header */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <TypeBadge type={asset.type} />
          <StatusBadge status={asset.status} />
        </div>
        <h1 className="font-marcellus text-sable text-3xl md:text-4xl">{asset.name}</h1>
        <p className="text-xs text-sable/40 mt-2">ID : <code className="text-or/60">{asset.id}</code></p>
      </div>

      {/* Thumbnail */}
      {asset.thumbnail && (
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10 bg-night shadow-xl">
          <img src={`/${asset.thumbnail}`} alt={asset.name} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Key figures */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-night-light rounded-xl p-5 text-center border border-white/5">
          <div className="text-3xl font-marcellus text-or">{asset.priceRobux.toLocaleString('fr-FR')} R$</div>
          <div className="text-xs text-sable/50 mt-1">Prix test</div>
        </div>
        {asset.polycount && (
          <div className="bg-night-light rounded-xl p-5 text-center border border-white/5">
            <div className="text-3xl font-marcellus text-zellige-light">{asset.polycount.toLocaleString('fr-FR')}</div>
            <div className="text-xs text-sable/50 mt-1">triangles</div>
          </div>
        )}
        <div className="bg-night-light rounded-xl p-5 text-center border border-white/5">
          <div className="text-3xl font-marcellus text-terracotta">{qaDone}/{asset.qa.length}</div>
          <div className="text-xs text-sable/50 mt-1">QA validée</div>
        </div>
      </div>

      {/* Description */}
      <section>
        <h2 className="text-xs font-semibold text-sable/50 uppercase tracking-wider mb-2">Description</h2>
        <p className="text-sable/80 leading-relaxed max-w-3xl">{asset.description}</p>
      </section>

      {/* Tags */}
      {asset.tags && asset.tags.length > 0 && (
        <section>
          <h2 className="text-xs font-semibold text-sable/50 uppercase tracking-wider mb-2">Tags</h2>
          <div className="flex flex-wrap gap-1.5">
            {asset.tags.map(tag => (
              <span key={tag} className="text-xs px-2.5 py-1 rounded-md bg-white/5 text-sable/60 border border-white/5">
                #{tag}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Files */}
      {asset.files && asset.files.length > 0 && (
        <section>
          <h2 className="text-xs font-semibold text-sable/50 uppercase tracking-wider mb-2">Fichiers sources</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {asset.files.map(f => (
              <div key={f} className="flex items-center gap-2 text-xs bg-night-light rounded-lg px-3 py-2.5 border border-white/5">
                <FileCode size={13} className="text-or/60 flex-shrink-0" />
                <code className="text-sable/70 font-mono truncate">{f}</code>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Status */}
      <section>
        <h2 className="text-xs font-semibold text-sable/50 uppercase tracking-wider mb-2">Statut de production</h2>
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
      </section>

      {/* QA */}
      <section>
        <h2 className="text-xs font-semibold text-sable/50 uppercase tracking-wider mb-3">Checklist QA</h2>
        <div className="bg-night-light rounded-xl border border-white/5 p-5">
          <QAProgress qa={asset.qa} />
          <div className="space-y-1 mt-4">
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
      </section>

      {/* Meta */}
      <section className="border-t border-white/5 pt-4 text-xs text-sable/30 space-y-1">
        <p className="inline-flex items-center gap-1.5">
          <Calendar size={12} />
          Créé le {new Date(asset.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </section>
    </div>
  );
}
