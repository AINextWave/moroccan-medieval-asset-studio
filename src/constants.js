// Status configuration
export const STATUS_CONFIG = {
  'idée': {
    label: 'Idée',
    color: 'text-sable bg-sable/10 border-sable/20',
    dot: 'bg-sable',
    kanbanColor: 'border-t-sable/50',
  },
  'en-production': {
    label: 'En production',
    color: 'text-or bg-or/10 border-or/20',
    dot: 'bg-or',
    kanbanColor: 'border-t-or',
  },
  'staging': {
    label: 'Staging',
    color: 'text-terracotta bg-terracotta/10 border-terracotta/20',
    dot: 'bg-terracotta',
    kanbanColor: 'border-t-terracotta',
  },
  'testé': {
    label: 'Testé Studio',
    color: 'text-zellige-light bg-zellige/10 border-zellige/30',
    dot: 'bg-zellige-light',
    kanbanColor: 'border-t-zellige',
  },
  'publié': {
    label: 'Publié',
    color: 'text-green-400 bg-green-400/10 border-green-400/20',
    dot: 'bg-green-400',
    kanbanColor: 'border-t-green-400',
  },
  'archivé': {
    label: 'Archivé',
    color: 'text-sable/50 bg-sable/5 border-sable/15',
    dot: 'bg-sable/40',
    kanbanColor: 'border-t-sable/30',
  },
};

export const KANBAN_COLUMNS = [
  { id: 'idée', label: 'Idée' },
  { id: 'en-production', label: 'En production' },
  { id: 'staging', label: 'Staging' },
  { id: 'testé', label: 'Testé Studio' },
  { id: 'publié', label: 'Publié' },
  { id: 'archivé', label: 'Archivé' },
];

export const TYPE_CONFIG = {
  plugin: {
    label: 'Plugin Luau',
    icon: '⚙️',
    color: 'text-or border-or/30 bg-or/10',
  },
  pack: {
    label: 'Pack 3D',
    icon: '📦',
    color: 'text-zellige-light border-zellige/30 bg-zellige/10',
  },
};

// DevEx constants
export const DEVEX_RATE = 0.0038; // $ per Robux (DevEx official rate from user prompt)
export const MARKETPLACE_COMMISSION = 0.3; // 30%
export const DEVEX_THRESHOLD = 30000; // Robux minimum

