import { useMemo } from 'react';
import { Package, Puzzle, Layers, DollarSign, CalendarDays, Clock, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';
import { StatusBadge, TypeBadge, Card, SectionTitle } from '../components/ui';
import { STATUS_CONFIG } from '../constants';

function getWaveLabel(wave) {
  if (wave.label) return wave.label;
  if (wave.id === 'vague-1') return 'Vague 1 — Production initiale';
  if (wave.id === 'vague-2') return 'Vague 2 — Pivot Moroccan Medieval';
  return wave.id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

function getWaveStatus(wave, assets) {
  if (wave.status) return wave.status;
  const waveAssets = assets.filter(a => wave.assets.includes(a.id));
  if (waveAssets.length === 0) return 'planifiée';
  const allCompleted = waveAssets.every(a => a.status === 'publié' || a.status === 'archivé');
  if (allCompleted) return 'terminée';
  return 'en-cours';
}

function KpiCard({ icon: Icon, label, value, sub, color = 'text-or' }) {
  return (
    <Card className="p-5 flex items-center gap-4">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-white/5`}>
        <Icon size={20} className={color} />
      </div>
      <div>
        <div className={`text-2xl font-marcellus ${color}`}>{value}</div>
        <div className="text-xs text-sable/60">{label}</div>
        {sub && <div className="text-[11px] text-sable/40 mt-0.5">{sub}</div>}
      </div>
    </Card>
  );
}

function WaveCard({ wave, assets }) {
  const waveAssets = assets.filter(a => wave.assets.includes(a.id));
  const waveStatus = getWaveStatus(wave, assets);
  const waveLabel = getWaveLabel(wave);

  const statusColors = {
    'terminée': 'bg-green-400/10 border-green-400/20 text-green-400',
    'en-cours': 'bg-or/10 border-or/20 text-or',
    'planifiée': 'bg-sable/10 border-sable/20 text-sable/60',
  };
  const statusLabels = {
    'terminée': '✓ Terminée',
    'en-cours': '⟳ En cours',
    'planifiée': '◇ Planifiée',
  };

  return (
    <Card className="p-5 space-y-3">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-marcellus text-sable text-base">{waveLabel}</h3>
          <div className="flex items-center gap-1.5 text-xs text-sable/50 mt-0.5">
            <CalendarDays size={12} />
            {new Date(wave.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
        </div>
        <span className={`text-xs px-2 py-0.5 rounded-full border ${statusColors[waveStatus] || statusColors['planifiée']}`}>
          {statusLabels[waveStatus]}
        </span>
      </div>

      {wave.notes && (
        <p className="text-xs text-sable/50 leading-relaxed italic border-l-2 border-zellige/30 pl-3">
          {wave.notes}
        </p>
      )}

      <div className="flex flex-wrap gap-2 pt-1">
        {waveAssets.map(asset => (
          <div key={asset.id} className="flex items-center gap-1.5 bg-white/5 rounded-lg px-2.5 py-1 border border-white/5">
            <span className="text-xs">{asset.type === 'plugin' ? '⚙️' : '📦'}</span>
            <span className="text-xs text-sable/80 font-medium">{asset.name}</span>
            <StatusBadge status={asset.status} />
          </div>
        ))}
      </div>
    </Card>
  );
}

export default function Dashboard({ data }) {
  const stats = useMemo(() => {
    const assets = data.assets;
    const plugins = assets.filter(a => a.type === 'plugin');
    const packs = assets.filter(a => a.type === 'pack');
    const staging = assets.filter(a => a.status === 'staging');
    const published = assets.filter(a => a.status === 'publié');
    const activeAssets = assets.filter(a => a.status !== 'archivé');
    const avgPrice = activeAssets.length
      ? Math.round(activeAssets.reduce((s, a) => s + a.priceRobux, 0) / activeAssets.length)
      : 0;
    const totalRobux = activeAssets.reduce((s, a) => s + a.priceRobux, 0);

    return { plugins, packs, staging, published, avgPrice, totalRobux, assets, activeAssets };
  }, [data]);

  // Next weekly wave target analysis
  const currentWave = data.waves[data.waves.length - 1] || data.waves[0];
  const currentWaveAssets = stats.assets.filter(a => currentWave?.assets.includes(a.id));
  const pluginsInCurrentWave = currentWaveAssets.filter(a => a.type === 'plugin');
  const packsInCurrentWave = currentWaveAssets.filter(a => a.type === 'pack');

  // Status distribution
  const statusDist = Object.entries(STATUS_CONFIG).map(([key, cfg]) => ({
    key,
    label: cfg.label,
    count: stats.assets.filter(a => a.status === key).length,
    dot: cfg.dot,
  })).filter(s => s.count > 0);

  return (
    <div className="space-y-8 fade-in">
      <div>
        <h1 className="text-3xl font-marcellus text-sable">Dashboard</h1>
        <p className="text-sable/50 text-sm mt-1">
          Vue d'ensemble du catalogue et de la production Roblox Moroccan Medieval
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard
          icon={Layers}
          label="Assets au catalogue"
          value={stats.activeAssets.length}
          sub={`${stats.plugins.length} plugins · ${stats.packs.filter(p => p.status !== 'archivé').length} packs`}
          color="text-sable"
        />
        <KpiCard
          icon={Clock}
          label="En staging"
          value={stats.staging.length}
          sub="Prêts pour tests Studio"
          color="text-terracotta"
        />
        <KpiCard
          icon={CheckCircle2}
          label="Publiés"
          value={stats.published.length}
          sub="Live Creator Store"
          color="text-green-400"
        />
        <KpiCard
          icon={TrendingUp}
          label="Prix moyen catalogue"
          value={`${stats.avgPrice} R$`}
          sub={`≈ \$${(stats.avgPrice * 0.0038 * 0.7).toFixed(2)} USD net / vente`}
          color="text-or"
        />
      </div>

      {/* Target Weekly Wave Card */}
      <Card className="p-6 border-or/20 bg-gradient-to-r from-night-light via-night-light to-zellige/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/5">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider bg-or/20 text-or border border-or/30">
                Cadence Hebdomadaire
              </span>
              <span className="text-xs text-sable/50">Cible : 1 plugin + 1 pack (8–10 props)</span>
            </div>
            <h3 className="font-marcellus text-xl text-sable mt-2">
              Objectif Vague Actuelle : {getWaveLabel(currentWave)}
            </h3>
            <p className="text-xs text-sable/60 mt-1">
              {currentWave.notes}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-night/60 rounded-xl px-4 py-2 border border-white/5 text-center">
              <div className="text-lg font-marcellus text-or">{pluginsInCurrentWave.length} / 1</div>
              <div className="text-[10px] text-sable/40 uppercase">Plugin Luau</div>
            </div>
            <div className="bg-night/60 rounded-xl px-4 py-2 border border-white/5 text-center">
              <div className="text-lg font-marcellus text-zellige-light">{packsInCurrentWave.length} / 1</div>
              <div className="text-[10px] text-sable/40 uppercase">Pack Props (10 props)</div>
            </div>
          </div>
        </div>

        <div className="pt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-sable/60">
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-or" />
            <span>Pack phare en cours : <strong className="text-sable">Moroccan Medieval Props Pack (10 props, 2 864 tris)</strong></span>
          </div>
          <span className="text-terracotta font-medium">Statut vague : En staging QA</span>
        </div>
      </Card>

      {/* Status distribution */}
      <Card className="p-5">
        <h3 className="text-sm font-medium text-sable/60 mb-4 uppercase tracking-wider">Répartition par statut</h3>
        <div className="space-y-3">
          {statusDist.map(s => {
            const pct = Math.round((s.count / stats.assets.length) * 100);
            return (
              <div key={s.key} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${s.dot}`} />
                    <span className="text-sable/70">{s.label}</span>
                  </div>
                  <span className="text-sable/50">{s.count} asset{s.count > 1 ? 's' : ''} ({pct}%)</span>
                </div>
                <div className="h-1.5 bg-night rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${s.dot}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* All waves timeline */}
      <div>
        <SectionTitle subtitle="Chronologie des vagues de production et historique des livraisons">
          ⏳ Timeline des vagues de production
        </SectionTitle>
        <div className="relative pl-6 space-y-4">
          {/* Vertical line */}
          <div className="absolute left-2 top-0 bottom-0 w-px bg-zellige/20" />

          {data.waves.map((wave) => {
            const waveStatus = getWaveStatus(wave, stats.assets);
            const dotColors = {
              'terminée': 'bg-green-400',
              'en-cours': 'bg-or',
              'planifiée': 'bg-sable/40',
            };
            return (
              <div key={wave.id} className="relative">
                {/* Dot */}
                <div className={`absolute -left-4 top-5 w-3 h-3 rounded-full border-2 border-[#0a1f2e] ${dotColors[waveStatus] || 'bg-sable/40'}`} />
                <WaveCard wave={wave} assets={stats.assets} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
