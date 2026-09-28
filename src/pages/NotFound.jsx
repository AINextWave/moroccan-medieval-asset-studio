import { Home, BookOpen } from 'lucide-react';
import { navigate } from '../lib/nav';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center fade-in">
      {/* Arch illustration */}
      <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" className="w-28 h-28 mb-6 opacity-80">
        <path d="M15,100 L15,50 Q15,5 60,5 Q105,5 105,50 L105,100 Z" fill="#0F6B5C" opacity="0.25" />
        <path d="M25,100 L25,52 Q25,18 60,18 Q95,18 95,52 L95,100 Z" fill="none" stroke="#C9A227" strokeWidth="1.5" opacity="0.7" />
        <text x="60" y="68" textAnchor="middle" fill="#E8DCC8" fontSize="22" fontFamily="Marcellus, serif">404</text>
      </svg>
      <h1 className="font-marcellus text-sable text-3xl">Page introuvable</h1>
      <p className="text-sm text-sable/50 mt-3 max-w-md">
        Cette arche ne mène nulle part… La page demandée n’existe pas ou a été déplacée.
      </p>
      <div className="flex flex-wrap justify-center gap-3 mt-8">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-or text-night font-semibold text-sm hover:bg-or-light transition-colors"
        >
          <Home size={16} />
          Retour à l’accueil
        </button>
        <button
          onClick={() => navigate('/catalogue')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-zellige/40 text-zellige-light font-semibold text-sm hover:bg-zellige/10 transition-colors"
        >
          <BookOpen size={16} />
          Voir le catalogue
        </button>
      </div>
    </div>
  );
}
