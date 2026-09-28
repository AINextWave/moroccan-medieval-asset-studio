import { ArrowRight, Sparkles, ShieldCheck, Coins, Package, Puzzle, Star, Hammer } from 'lucide-react';
import { navigate } from '../lib/nav';
import { Card, StatusBadge, TypeBadge } from '../components/ui';

const PILLARS = [
  {
    icon: Star,
    title: 'Zellige & géométrie',
    text: 'Motifs géométriques marocains, étoiles à 8 branches, mosaïques bleu/vert — une identité visuelle qu’on reconnaît entre mille.',
    accent: 'text-zellige-light',
    bg: 'bg-zellige/10 border-zellige/20',
  },
  {
    icon: Hammer,
    title: 'Laiton & artisanat',
    text: 'Théières, lanternes fanous, mabkhara : l’artisanat marocain réinventé en props low-poly prêts pour Roblox Studio.',
    accent: 'text-or',
    bg: 'bg-or/10 border-or/20',
  },
  {
    icon: Package,
    title: 'Terracotta & matière',
    text: 'Des palettes chaudes et nobles — terracotta, sable, cèdre — qui donnent du caractère à chaque scène médiévale.',
    accent: 'text-terracotta',
    bg: 'bg-terracotta/10 border-terracotta/20',
  },
];

const STEPS = [
  {
    n: '01',
    title: 'Muse produit',
    text: 'Chaque semaine : 1 plugin Luau original + 1 pack de 8 à 10 props low-poly procéduraux, 100 % originaux, coût 0 $.',
  },
  {
    n: '02',
    title: 'QA dans Studio',
    text: 'Syntaxe validée, OBJ re-parsés, import testé dans Roblox Studio : échelle, matériaux, collisions, rendu mobile.',
  },
  {
    n: '03',
    title: 'Hicham publie',
    text: 'Mise en vente manuelle sur le Roblox Creator Store depuis Studio. Rien n’est jamais publié automatiquement.',
  },
];

export default function Home({ data }) {
  const assets = data.assets.filter(a => a.status !== 'archivé');
  const plugins = assets.filter(a => a.type === 'plugin');
  const packs = assets.filter(a => a.type === 'pack');
  const avgPrice = assets.length
    ? Math.round(assets.reduce((s, a) => s + (a.priceRobux || 0), 0) / assets.length)
    : 0;
  const lastWave = data.waves && data.waves.length > 0 ? data.waves[data.waves.length - 1] : null;
  const featured = assets.find(a => a.id === 'moroccan-medieval-pack') || assets[0];

  return (
    <div className="space-y-14 fade-in">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-2xl border border-white/5 bg-night-light">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/thumbnails/thumb-moroccan-medieval-pack.png"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-night via-night/85 to-night/40" />
        </div>
        <div className="relative p-8 md:p-14 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-or/10 border border-or/30 text-or text-xs font-medium mb-6">
            <Sparkles size={13} />
            100 % original · Créé avec l’IA · Coût 0 $
          </div>
          <h1 className="font-marcellus text-sable text-4xl md:text-6xl leading-tight">
            Moroccan <span className="text-or">Medieval</span>
          </h1>
          <p className="font-amiri text-sable/70 text-lg md:text-xl mt-3 italic">
            Le QG visuel du catalogue d’assets Roblox
          </p>
          <p className="text-sable/60 text-sm md:text-base mt-4 leading-relaxed max-w-xl">
            Plugins Roblox Studio en Luau et packs de modèles 3D low-poly à la touche marocaine —
            zellige, arches en fer à cheval, lanternes fanous, laiton. Produits chaque semaine,
            validés dans Studio, prêts pour le Creator Store.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <button
              onClick={() => navigate('/catalogue')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-or text-night font-semibold text-sm hover:bg-or-light transition-colors"
            >
              Explorer le catalogue
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => navigate('/simulator')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-zellige/40 text-zellige-light font-semibold text-sm hover:bg-zellige/10 transition-colors"
            >
              <Coins size={16} />
              Simuler mes revenus
            </button>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Assets au catalogue', value: assets.length },
          { label: 'Plugins Luau', value: plugins.length },
          { label: 'Packs 3D', value: packs.length },
          { label: 'Prix test moyen', value: `${avgPrice} R$` },
        ].map(s => (
          <Card key={s.label} className="p-5 text-center" hoverable={false}>
            <div className="font-marcellus text-3xl text-or">{s.value}</div>
            <div className="text-xs text-sable/50 mt-1">{s.label}</div>
          </Card>
        ))}
      </section>

      {/* PILLARS */}
      <section>
        <h2 className="font-marcellus text-sable text-2xl mb-1">La marque</h2>
        <p className="text-sm text-sable/50 mb-6">Trois piliers, une identité : le Maroc médiéval.</p>
        <div className="grid md:grid-cols-3 gap-4">
          {PILLARS.map(p => {
            const Icon = p.icon;
            return (
              <Card key={p.title} className={`p-6 border ${p.bg}`} hoverable={false}>
                <Icon size={22} className={p.accent} />
                <h3 className="font-marcellus text-sable text-lg mt-3">{p.title}</h3>
                <p className="text-sm text-sable/60 mt-2 leading-relaxed">{p.text}</p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* FEATURED */}
      {featured && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-marcellus text-sable text-2xl">Pack phare</h2>
              <p className="text-sm text-sable/50 mt-1">La pièce maîtresse du catalogue.</p>
            </div>
            <button
              onClick={() => navigate(`/asset/${featured.id}`)}
              className="text-sm text-or hover:text-or-light inline-flex items-center gap-1 transition-colors"
            >
              Fiche complète <ArrowRight size={14} />
            </button>
          </div>
          <Card className="overflow-hidden cursor-pointer" onClick={() => navigate(`/asset/${featured.id}`)}>
            <div className="md:flex">
              <div className="md:w-1/2 aspect-video md:aspect-auto">
                <img
                  src={`/${featured.thumbnail}`}
                  alt={featured.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 md:p-8 md:w-1/2 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-3">
                  <TypeBadge type={featured.type} />
                  <StatusBadge status={featured.status} />
                </div>
                <h3 className="font-marcellus text-sable text-2xl">{featured.name}</h3>
                <p className="text-sm text-sable/60 mt-3 leading-relaxed line-clamp-3">{featured.description}</p>
                <div className="flex items-center gap-4 mt-5">
                  <span className="font-marcellus text-or text-2xl">{featured.priceRobux} R$</span>
                  {featured.polycount && (
                    <span className="text-xs text-sable/50">{featured.polycount.toLocaleString('fr-FR')} triangles</span>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </section>
      )}

      {/* STEPS */}
      <section>
        <h2 className="font-marcellus text-sable text-2xl mb-1">Comment ça marche</h2>
        <p className="text-sm text-sable/50 mb-6">De l’idée à la mise en vente, un pipeline hebdomadaire.</p>
        <div className="grid md:grid-cols-3 gap-4">
          {STEPS.map(s => (
            <Card key={s.n} className="p-6" hoverable={false}>
              <div className="font-marcellus text-or/40 text-4xl">{s.n}</div>
              <h3 className="font-marcellus text-sable text-lg mt-2">{s.title}</h3>
              <p className="text-sm text-sable/60 mt-2 leading-relaxed">{s.text}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* LAST WAVE + GUARANTEES */}
      <section className="grid md:grid-cols-2 gap-4">
        <Card className="p-6" hoverable={false}>
          <div className="flex items-center gap-2 text-zellige-light mb-3">
            <Puzzle size={18} />
            <h3 className="font-marcellus text-sable text-lg">Dernière vague</h3>
          </div>
          {lastWave ? (
            <>
              <p className="text-sm text-sable/70">
                <span className="text-or font-medium">{lastWave.id}</span>
                {' '}· {new Date(lastWave.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
              <p className="text-sm text-sable/50 mt-2">{lastWave.notes}</p>
              <button
                onClick={() => navigate('/roadmap')}
                className="text-sm text-or hover:text-or-light inline-flex items-center gap-1 mt-4 transition-colors"
              >
                Voir la roadmap <ArrowRight size={14} />
              </button>
            </>
          ) : (
            <p className="text-sm text-sable/50">Aucune vague enregistrée pour le moment.</p>
          )}
        </Card>
        <Card className="p-6" hoverable={false}>
          <div className="flex items-center gap-2 text-or mb-3">
            <ShieldCheck size={18} />
            <h3 className="font-marcellus text-sable text-lg">Nos engagements</h3>
          </div>
          <ul className="text-sm text-sable/60 space-y-2 leading-relaxed">
            <li>✓ 100 % original — jamais de copie ni de revente d’assets tiers.</li>
            <li>✓ Zéro dépense — outils open-source et gratuits uniquement.</li>
            <li>✓ Rien n’est publié automatiquement : Hicham publie depuis Studio.</li>
            <li>✓ Projections = hypothèses, jamais des revenus garantis.</li>
          </ul>
        </Card>
      </section>

      {/* CTA */}
      <section className="rounded-2xl border border-or/20 bg-gradient-to-br from-or/10 via-night-light to-night-light p-8 md:p-10 text-center">
        <h2 className="font-marcellus text-sable text-2xl md:text-3xl">Prêt à explorer le catalogue ?</h2>
        <p className="text-sm text-sable/60 mt-2 max-w-xl mx-auto">
          Chaque asset a sa fiche : prix test, checklist QA, fichiers sources et statut de production.
        </p>
        <button
          onClick={() => navigate('/catalogue')}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-or text-night font-semibold text-sm hover:bg-or-light transition-colors mt-6"
        >
          Voir le catalogue
          <ArrowRight size={16} />
        </button>
      </section>
    </div>
  );
}
