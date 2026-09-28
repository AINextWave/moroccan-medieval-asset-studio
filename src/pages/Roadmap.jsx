import { Map, GitBranch, Clock, CheckCircle2 } from 'lucide-react';
import { Card, StatusBadge } from '../components/ui';
import { navigate } from '../lib/nav';

const CHANGELOG = [
  {
    version: 'v0.3',
    date: '28 sept. 2026',
    title: 'Site complet',
    items: [
      'Landing page d’accueil Moroccan Medieval',
      'Fiches asset en routes dédiées (/asset/:id)',
      'Pages FAQ, Roadmap et 404, footer complet, meta SEO',
      'Protocole anti-conflit Muse / Antigravity (docs/COORDINATION.md)',
    ],
  },
  {
    version: 'v0.2',
    date: '28 sept. 2026',
    title: 'Pivot Moroccan Medieval',
    items: [
      'Nouveau pack phare : 10 props marocains, 2 864 triangles',
      'Rebranding complet des thumbnails (terracotta / zellige / or)',
      'Ancien pack médiéval archivé',
    ],
  },
  {
    version: 'v0.1',
    date: '28 sept. 2026',
    title: 'Lancement',
    items: [
      'QG initial : Dashboard, Catalogue, Simulateur, Pipeline',
      '2 plugins Luau (Batch Renamer Pro, Weld Master)',
      'Pont Muse : data/catalogue.json comme source de vérité',
    ],
  },
];

const UPCOMING = [
  { title: 'Pack « Moroccan Interiors »', desc: '8–10 props d’intérieur : tapis, coussins, table basse, miroir en laiton…', tag: 'Pack 3D' },
  { title: 'Plugin #3', desc: 'Nouvel utilitaire Studio choisi selon les besoins des développeurs.', tag: 'Plugin Luau' },
  { title: 'Tests Studio', desc: 'Import et validation des OBJ et plugins dans Roblox Studio (échelle, matériaux, undo/redo).', tag: 'QA' },
  { title: 'Premières publications', desc: 'Mise en vente manuelle sur le Creator Store, prix tests ajustés selon la demande.', tag: 'Lancement' },
];

export default function Roadmap({ data }) {
  const waves = [...(data.waves || [])].reverse();

  return (
    <div className="space-y-12 fade-in max-w-5xl">
      <div>
        <h1 className="text-3xl font-marcellus text-sable flex items-center gap-3">
          <Map size={28} className="text-or" />
          Roadmap
        </h1>
        <p className="text-sable/50 text-sm mt-2">
          Vagues de production passées, changelog et prochaines étapes du catalogue.
        </p>
      </div>

      {/* Waves */}
      <section>
        <h2 className="font-marcellus text-sable text-xl mb-5 flex items-center gap-2">
          <GitBranch size={18} className="text-zellige-light" />
          Vagues de production
        </h2>
        <div className="space-y-4">
          {waves.map(w => {
            const waveAssets = (w.assets || [])
              .map(id => data.assets.find(a => a.id === id))
              .filter(Boolean);
            return (
              <Card key={w.id} className="p-6" hoverable={false}>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="font-marcellus text-or">{w.id}</span>
                  <span className="text-xs text-sable/40">
                    {new Date(w.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
                <p className="text-sm text-sable/60 leading-relaxed">{w.notes}</p>
                {waveAssets.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {waveAssets.map(a => (
                      <button
                        key={a.id}
                        onClick={() => navigate(`/asset/${a.id}`)}
                        className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sable/70 hover:border-or/40 hover:text-sable transition-colors"
                      >
                        {a.name}
                        <StatusBadge status={a.status} />
                      </button>
                    ))}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </section>

      {/* Upcoming */}
      <section>
        <h2 className="font-marcellus text-sable text-xl mb-5 flex items-center gap-2">
          <Clock size={18} className="text-or" />
          À venir
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {UPCOMING.map(u => (
            <Card key={u.title} className="p-6" hoverable={false}>
              <span className="text-xs px-2 py-0.5 rounded-full bg-or/10 border border-or/30 text-or font-medium">
                {u.tag}
              </span>
              <h3 className="font-marcellus text-sable text-lg mt-3">{u.title}</h3>
              <p className="text-sm text-sable/60 mt-2 leading-relaxed">{u.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Changelog */}
      <section>
        <h2 className="font-marcellus text-sable text-xl mb-5 flex items-center gap-2">
          <CheckCircle2 size={18} className="text-green-400" />
          Changelog
        </h2>
        <div className="space-y-4">
          {CHANGELOG.map(c => (
            <Card key={c.version} className="p-6" hoverable={false}>
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-xs px-2 py-1 rounded bg-zellige/15 border border-zellige/30 text-zellige-light">
                  {c.version}
                </span>
                <span className="font-marcellus text-sable">{c.title}</span>
                <span className="text-xs text-sable/40 ml-auto">{c.date}</span>
              </div>
              <ul className="text-sm text-sable/60 space-y-1.5">
                {c.items.map(item => (
                  <li key={item} className="flex gap-2">
                    <span className="text-or">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
