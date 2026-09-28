import { useState } from 'react';
import { AlertCircle, Info, TrendingUp, Coins } from 'lucide-react';
import { Card, SectionTitle } from '../components/ui';
import { DEVEX_RATE, MARKETPLACE_COMMISSION, DEVEX_THRESHOLD } from '../constants';

function ResultRow({ label, value, highlight = false, sub }) {
  return (
    <div className={`flex justify-between items-center py-3 border-b border-white/5 last:border-0 ${highlight ? 'text-or' : 'text-sable/80'}`}>
      <div>
        <span className={`text-sm ${highlight ? 'font-semibold' : ''}`}>{label}</span>
        {sub && <p className="text-xs text-sable/40 mt-0.5">{sub}</p>}
      </div>
      <span className={`font-mono text-sm ${highlight ? 'text-or font-bold text-base' : ''}`}>{value}</span>
    </div>
  );
}

export default function Simulator({ data }) {
  const [price, setPrice] = useState(199);

  // Calculations
  const revenuePerSale = price * (1 - MARKETPLACE_COMMISSION);
  const usdPerSale = revenuePerSale * DEVEX_RATE;
  const salesFor30k = DEVEX_THRESHOLD > 0 ? Math.ceil(DEVEX_THRESHOLD / revenuePerSale) : '—';
  const robuxFor1usd = DEVEX_RATE > 0 ? Math.ceil(1 / DEVEX_RATE) : '—';

  // Scenarios
  const scenarios = [10, 50, 100, 500, 1000].map(sales => ({
    sales,
    robux: Math.round(sales * revenuePerSale),
    usd: (sales * usdPerSale).toFixed(2),
    reached30k: sales * revenuePerSale >= DEVEX_THRESHOLD,
  }));

  // Popular prices from catalogue
  const cataloguePrices = [...new Set(data.assets.map(a => a.priceRobux))].sort((a, b) => a - b);

  return (
    <div className="space-y-8 fade-in max-w-2xl">
      <div>
        <h1 className="text-3xl font-marcellus text-sable">Simulateur de revenus</h1>
        <p className="text-sable/50 text-sm mt-1">
          Estimez vos gains DevEx selon votre tarification
        </p>
      </div>

      {/* Disclaimer */}
      <div className="flex gap-3 bg-or/5 border border-or/20 rounded-xl p-4">
        <AlertCircle size={16} className="text-or flex-shrink-0 mt-0.5" />
        <p className="text-xs text-sable/60 leading-relaxed">
          <span className="text-or font-medium">Hypothèses — pas des revenus garantis.</span> Les calculs utilisent le taux DevEx officiel de <strong className="text-sable/80">0,0038 \$/Robux</strong> et une commission marketplace de <strong className="text-sable/80">30 %</strong>. Les taux réels peuvent varier. Roblox requiert un minimum de <strong className="text-sable/80">30 000 Robux</strong> pour initier un échange DevEx.
        </p>
      </div>

      {/* Price input */}
      <Card className="p-6 space-y-5">
        <h3 className="font-marcellus text-sable text-lg">Prix de vente</h3>

        <div className="space-y-2">
          <div className="flex justify-between text-xs text-sable/50">
            <span>Prix en Robux</span>
            <span className="text-or font-medium">{price.toLocaleString('fr-FR')} R$</span>
          </div>
          <input
            type="range"
            min={25}
            max={2000}
            step={25}
            value={price}
            onChange={e => setPrice(Number(e.target.value))}
            className="w-full accent-or cursor-pointer"
          />
          <div className="flex justify-between text-xs text-sable/30">
            <span>25 R$</span>
            <span>2 000 R$</span>
          </div>
        </div>

        {/* Quick pick from catalogue */}
        <div>
          <p className="text-xs text-sable/40 mb-2">Raccourcis — prix de votre catalogue :</p>
          <div className="flex flex-wrap gap-2">
            {cataloguePrices.map(p => (
              <button
                key={p}
                onClick={() => setPrice(p)}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                  price === p
                    ? 'bg-or/20 border-or/40 text-or'
                    : 'bg-white/5 border-white/10 text-sable/60 hover:border-or/30 hover:text-sable'
                }`}
              >
                {p} R$
              </button>
            ))}
          </div>
        </div>

        {/* Manual input */}
        <div className="flex gap-3 items-center">
          <label className="text-xs text-sable/50 whitespace-nowrap">Ou saisir manuellement :</label>
          <input
            type="number"
            min={1}
            max={10000}
            value={price}
            onChange={e => setPrice(Math.max(1, Number(e.target.value)))}
            className="w-32 bg-night border border-white/10 rounded-lg px-3 py-2 text-sable text-sm text-center focus:outline-none focus:border-zellige/50"
          />
          <span className="text-xs text-sable/50">R$</span>
        </div>
      </Card>

      {/* Results per sale */}
      <Card className="p-6">
        <h3 className="font-marcellus text-sable text-lg mb-4">Par vente unitaire</h3>
        <ResultRow
          label="Prix affiché"
          value={`${price.toLocaleString('fr-FR')} R$`}
        />
        <ResultRow
          label="Commission marketplace (−30 %)"
          value={`−${Math.round(price * MARKETPLACE_COMMISSION).toLocaleString('fr-FR')} R$`}
          sub="Roblox retient 30 % de chaque vente"
        />
        <ResultRow
          label="Robux reçus"
          value={`${Math.round(revenuePerSale).toLocaleString('fr-FR')} R$`}
        />
        <ResultRow
          label="Équivalent USD (DevEx ~0,0035 \$/R$)"
          value={`\$${usdPerSale.toFixed(4)}`}
          sub="Avant impôts locaux éventuels"
          highlight
        />
      </Card>

      {/* Threshold info */}
      <Card className="p-5 flex gap-4 items-start">
        <div className="w-10 h-10 rounded-full bg-zellige/15 flex items-center justify-center flex-shrink-0">
          <Coins size={18} className="text-zellige-light" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-medium text-sable">Seuil DevEx — 30 000 Robux</h4>
          <p className="text-xs text-sable/50 leading-relaxed">
            Il vous faut <strong className="text-or">{salesFor30k} ventes</strong> à {price} R$ pour atteindre le seuil de 30 000 R$ net (après commission), soit environ <strong className="text-or">\${(DEVEX_THRESHOLD * DEVEX_RATE).toFixed(0)}</strong> USD.
          </p>
        </div>
      </Card>

      {/* Scenarios table */}
      <div>
        <SectionTitle subtitle="Gains estimés selon le nombre de ventes">
          📊 Scénarios de ventes
        </SectionTitle>
        <div className="overflow-x-auto rounded-xl border border-white/5">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 bg-night-lighter">
                <th className="px-4 py-3 text-left text-xs font-medium text-sable/50 uppercase tracking-wider">Ventes</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-sable/50 uppercase tracking-wider">Robux nets</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-sable/50 uppercase tracking-wider">USD DevEx</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-sable/50 uppercase tracking-wider">Seuil 30k</th>
              </tr>
            </thead>
            <tbody>
              {scenarios.map((s, i) => (
                <tr
                  key={s.sales}
                  className={`border-b border-white/5 last:border-0 transition-colors ${i % 2 === 0 ? 'bg-night-light' : 'bg-night'}`}
                >
                  <td className="px-4 py-3 font-medium text-sable">{s.sales.toLocaleString('fr-FR')}</td>
                  <td className="px-4 py-3 text-right text-or font-mono">{s.robux.toLocaleString('fr-FR')} R$</td>
                  <td className="px-4 py-3 text-right text-zellige-light font-mono">\${s.usd}</td>
                  <td className="px-4 py-3 text-center">
                    {s.reached30k
                      ? <span className="text-green-400 text-base">✓</span>
                      : <span className="text-sable/20 text-base">—</span>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DevEx info */}
      <div className="flex gap-3 bg-night-light border border-white/5 rounded-xl p-4">
        <Info size={15} className="text-sable/30 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-sable/40 leading-relaxed">
          Le programme DevEx (Developer Exchange) de Roblox permet d'échanger vos Robux gagnés contre des dollars américains. Le taux exact varie — consultez <strong className="text-sable/60">create.roblox.com/devex</strong> pour les conditions actuelles. Ces simulations sont fournies à titre indicatif uniquement.
        </p>
      </div>
    </div>
  );
}
