import { ExternalLink } from 'lucide-react';
import { navigate } from '../lib/nav';

const NAV = [
  { to: '/', label: 'Accueil' },
  { to: '/catalogue', label: 'Catalogue' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/simulator', label: 'Simulateur' },
  { to: '/pipeline', label: 'Pipeline' },
  { to: '/faq', label: 'FAQ' },
  { to: '/roadmap', label: 'Roadmap' },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/5 bg-[#0a1f2e]/60">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-10 grid gap-8 md:grid-cols-4">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <svg width="24" height="24" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
              <rect width="28" height="28" rx="6" fill="#0F6B5C" opacity="0.3" />
              <path d="M5,28 L5,14 Q5,2 14,2 Q23,2 23,14 L23,28 Z" fill="#0F6B5C" opacity="0.6" />
              <path d="M8,28 L8,15 Q8,6 14,6 Q20,6 20,15 L20,28 Z" fill="#C9A227" opacity="0.4" />
              <circle cx="14" cy="11" r="2.5" fill="#C9A227" opacity="0.9" />
            </svg>
            <span className="font-marcellus text-sable">Moroccan <span className="text-or">Medieval</span></span>
          </div>
          <p className="text-xs text-sable/40 leading-relaxed">
            Catalogue d’assets Roblox 100 % originaux créés avec l’IA —
            plugins Studio et packs 3D low-poly à la touche marocaine.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-xs font-semibold text-sable/50 uppercase tracking-wider mb-3">Navigation</h4>
          <ul className="space-y-2">
            {NAV.map(n => (
              <li key={n.to}>
                <button
                  onClick={() => navigate(n.to)}
                  className="text-xs text-sable/50 hover:text-or transition-colors"
                >
                  {n.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Pont Muse */}
        <div>
          <h4 className="text-xs font-semibold text-sable/50 uppercase tracking-wider mb-3">Pont Muse</h4>
          <p className="text-xs text-sable/40 leading-relaxed">
            Données nourries automatiquement par l’assistant IA depuis
            <code className="text-or/60"> data/catalogue.json</code>.
            Statuts et QA persistés en local.
          </p>
          <a
            href="https://github.com/AINextWave/moroccan-medieval-asset-studio"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-sable/50 hover:text-or transition-colors mt-3"
          >
            <ExternalLink size={13} />
            Dépôt GitHub
          </a>
        </div>

        {/* Infos */}
        <div>
          <h4 className="text-xs font-semibold text-sable/50 uppercase tracking-wider mb-3">Infos</h4>
          <ul className="text-xs text-sable/40 space-y-2 leading-relaxed">
            <li>✓ 100 % original, zéro asset tiers</li>
            <li>✓ Coût de production : 0 $</li>
            <li>✓ Publication manuelle depuis Studio</li>
            <li>✓ Projections = hypothèses</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-sable/30">© 2026 Moroccan Medieval — Asset Studio</p>
          <p className="text-xs text-sable/20">Fait avec l’IA, revu par Hicham</p>
        </div>
      </div>
    </footer>
  );
}
