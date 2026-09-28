import { LayoutDashboard, BookOpen, TrendingUp, Kanban, X, Home, HelpCircle, Map, Wrench } from 'lucide-react';
import { navigate } from '../lib/nav';

const NAV_ITEMS = [
  { id: 'home', label: 'Accueil', icon: Home },
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'catalogue', label: 'Catalogue', icon: BookOpen },
  { id: 'simulator', label: 'Simulateur', icon: TrendingUp },
  { id: 'pipeline', label: 'Pipeline', icon: Kanban },
  { id: 'outils', label: 'Outils', icon: Wrench },
];

const NAV_SECONDARY = [
  { id: 'faq', label: 'FAQ', icon: HelpCircle },
  { id: 'roadmap', label: 'Roadmap', icon: Map },
];

export default function Sidebar({ activePage, mobileOpen, onMobileClose }) {
  const go = (id) => { navigate('/' + id); onMobileClose(); };

  const renderItems = (items) => items.map(item => {
    const Icon = item.icon;
    const isActive = activePage === item.id;
    return (
      <button
        key={item.id}
        onClick={() => go(item.id)}
        className={`
          w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
          ${isActive
            ? 'bg-zellige/20 text-zellige-light border border-zellige/30'
            : 'text-sable/60 hover:text-sable hover:bg-white/5'
          }
        `}
      >
        <Icon size={16} className={isActive ? 'text-zellige-light' : 'text-sable/40'} />
        {item.label}
        {isActive && (
          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-or" />
        )}
      </button>
    );
  });

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 z-50 flex flex-col
        bg-[#0a1f2e] border-r border-white/5
        transition-transform duration-300
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="p-6 border-b border-white/5">
          <button onClick={() => go('home')} className="text-left w-full">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {/* Arch logo */}
                  <svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                    <rect width="28" height="28" rx="6" fill="#0F6B5C" opacity="0.3"/>
                    <path d="M5,28 L5,14 Q5,2 14,2 Q23,2 23,14 L23,28 Z" fill="#0F6B5C" opacity="0.6"/>
                    <path d="M8,28 L8,15 Q8,6 14,6 Q20,6 20,15 L20,28 Z" fill="#C9A227" opacity="0.4"/>
                    <circle cx="14" cy="11" r="2.5" fill="#C9A227" opacity="0.9"/>
                  </svg>
                  <span className="font-marcellus text-sable text-lg leading-tight">Moroccan</span>
                </div>
                <span className="font-marcellus text-or text-sm tracking-widest uppercase">Medieval</span>
              </div>
              <span
                role="button"
                tabIndex={0}
                onClick={(e) => { e.stopPropagation(); onMobileClose(); }}
                onKeyDown={(e) => { if (e.key === 'Enter') onMobileClose(); }}
                className="lg:hidden text-sable/40 hover:text-sable transition-colors p-1"
              >
                <X size={18} />
              </span>
            </div>
          </button>
          <p className="text-xs text-sable/40 mt-2 font-inter">Asset Studio</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {renderItems(NAV_ITEMS)}
          <div className="pt-3 mt-3 border-t border-white/5">
            <p className="text-[10px] uppercase tracking-widest text-sable/30 px-3 mb-1">Aide</p>
            {renderItems(NAV_SECONDARY)}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/5">
          <div className="text-xs text-sable/30 space-y-1">
            <p>Données depuis <span className="text-or/60">data/catalogue.json</span></p>
            <p className="text-sable/20">Persistance → localStorage</p>
          </div>
        </div>
      </aside>
    </>
  );
}
