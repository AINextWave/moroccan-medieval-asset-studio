import { STATUS_CONFIG, TYPE_CONFIG } from '../constants';

export function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG['idée'];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border ${cfg.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

export function TypeBadge({ type }) {
  const cfg = TYPE_CONFIG[type] || TYPE_CONFIG['plugin'];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium border ${cfg.color}`}>
      <span>{cfg.icon}</span>
      {cfg.label}
    </span>
  );
}

export function ArchPlaceholder({ type }) {
  // Horseshoe arch SVG placeholder for missing thumbnails
  const colors = type === 'plugin'
    ? { bg: '#0E2A3A', arch: '#0F6B5C', accent: '#C9A227', icon: '⚙️' }
    : { bg: '#0E2A3A', arch: '#C96F4A', accent: '#C9A227', icon: '📦' };

  return (
    <div className="w-full h-full flex items-center justify-center relative" style={{ background: colors.bg }}>
      <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" className="w-20 h-20">
        {/* Horseshoe arch */}
        <path
          d="M15,100 L15,50 Q15,5 60,5 Q105,5 105,50 L105,100 Z"
          fill={colors.arch}
          opacity="0.3"
        />
        <path
          d="M25,100 L25,52 Q25,18 60,18 Q95,18 95,52 L95,100 Z"
          fill="none"
          stroke={colors.accent}
          strokeWidth="1.5"
          opacity="0.6"
        />
        {/* Zellige pattern inside */}
        <line x1="60" y1="18" x2="60" y2="45" stroke={colors.accent} strokeWidth="0.8" opacity="0.4" />
        <line x1="35" y1="60" x2="85" y2="60" stroke={colors.accent} strokeWidth="0.8" opacity="0.4" />
        <circle cx="60" cy="55" r="8" fill={colors.accent} opacity="0.15" />
      </svg>
      <span className="absolute text-2xl" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        {colors.icon}
      </span>
    </div>
  );
}

export function Spinner() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-2 border-zellige/20" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-or animate-spin" />
      </div>
    </div>
  );
}

export function QAProgress({ qa }) {
  const done = qa.filter(q => q.done).length;
  const total = qa.length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-sable/60">
        <span>QA</span>
        <span>{done}/{total}</span>
      </div>
      <div className="h-1 bg-night-lighter rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${pct}%`,
            background: pct === 100 ? '#4ade80' : pct > 50 ? '#C9A227' : '#0F6B5C',
          }}
        />
      </div>
    </div>
  );
}

export function Card({ children, className = '', onClick, hoverable = true }) {
  return (
    <div
      onClick={onClick}
      className={`
        bg-night-light border border-white/5 rounded-xl
        ${hoverable ? 'hover:border-zellige/40 hover:shadow-lg hover:shadow-zellige/10 transition-all duration-200' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export function SectionTitle({ children, subtitle }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-marcellus text-sable">{children}</h2>
      {subtitle && <p className="text-sm text-sable/50 mt-1">{subtitle}</p>}
    </div>
  );
}

export function EmptyState({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-lg font-medium text-sable/70 mb-1">{title}</h3>
      {description && <p className="text-sm text-sable/40">{description}</p>}
    </div>
  );
}
