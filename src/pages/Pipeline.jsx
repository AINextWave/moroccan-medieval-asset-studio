import { useState } from 'react';
import { GripVertical, Info } from 'lucide-react';
import { KANBAN_COLUMNS, STATUS_CONFIG } from '../constants';
import { TypeBadge, EmptyState } from '../components/ui';

function KanbanCard({ asset, onStatusChange, isDragging, dragHandleProps }) {
  return (
    <div
      {...dragHandleProps}
      className={`
        bg-night border border-white/5 rounded-lg p-3 space-y-2 cursor-grab active:cursor-grabbing
        hover:border-zellige/30 transition-all duration-200
        ${isDragging ? 'opacity-40 scale-95' : ''}
      `}
    >
      <div className="flex items-start gap-2">
        <GripVertical size={14} className="text-sable/20 mt-0.5 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-sable truncate">{asset.name}</p>
          <div className="mt-1">
            <TypeBadge type={asset.type} />
          </div>
        </div>
        <span className="text-xs text-or whitespace-nowrap">{asset.priceRobux} R$</span>
      </div>

      {/* QA mini */}
      {asset.qa && asset.qa.length > 0 && (
        <div className="flex gap-0.5">
          {asset.qa.map((item, i) => (
            <div
              key={i}
              title={item.label}
              className={`h-1 flex-1 rounded-full ${item.done ? 'bg-green-400/60' : 'bg-white/10'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Pipeline({ data, updateStatus }) {
  const [dragging, setDragging] = useState(null);
  const [dragOver, setDragOver] = useState(null);

  const handleDragStart = (e, asset) => {
    setDragging(asset);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', asset.id);
  };

  const handleDragOver = (e, colId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOver(colId);
  };

  const handleDrop = (e, colId) => {
    e.preventDefault();
    if (dragging && dragging.status !== colId) {
      updateStatus(dragging.id, colId);
    }
    setDragging(null);
    setDragOver(null);
  };

  const handleDragEnd = () => {
    setDragging(null);
    setDragOver(null);
  };

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 className="text-3xl font-marcellus text-sable">Pipeline de production</h1>
        <p className="text-sable/50 text-sm mt-1">
          Glissez-déposez les assets entre les colonnes — persisté en localStorage
        </p>
      </div>

      {/* Tip */}
      <div className="flex gap-2 items-center bg-night-light border border-white/5 rounded-lg px-4 py-3">
        <Info size={13} className="text-zellige-light flex-shrink-0" />
        <p className="text-xs text-sable/50">
          Glissez un asset vers la colonne cible pour changer son statut. Les changements sont sauvegardés automatiquement.
        </p>
      </div>

      {/* Kanban board */}
      <div className="flex gap-4 overflow-x-auto pb-4" style={{ minHeight: '60vh' }}>
        {KANBAN_COLUMNS.map(col => {
          const cfg = STATUS_CONFIG[col.id];
          const colAssets = data.assets.filter(a => a.status === col.id);
          const isOver = dragOver === col.id;

          return (
            <div
              key={col.id}
              onDragOver={e => handleDragOver(e, col.id)}
              onDrop={e => handleDrop(e, col.id)}
              onDragLeave={() => setDragOver(null)}
              className={`
                flex-none w-56 flex flex-col rounded-xl border transition-all duration-200
                ${isOver
                  ? 'border-zellige/60 bg-zellige/5'
                  : 'border-white/5 bg-night-light'
                }
              `}
            >
              {/* Column header */}
              <div className={`p-3 border-b-2 ${cfg?.kanbanColor || 'border-t-sable/30'}`}>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-sable">{col.label}</h3>
                  <span className="text-xs bg-white/10 rounded-full px-2 py-0.5 text-sable/60">
                    {colAssets.length}
                  </span>
                </div>
              </div>

              {/* Cards */}
              <div className="flex-1 p-3 space-y-2 min-h-[200px]">
                {colAssets.length === 0 && (
                  <div className={`
                    h-20 border-2 border-dashed rounded-lg flex items-center justify-center
                    transition-colors duration-200
                    ${isOver ? 'border-zellige/50 bg-zellige/10' : 'border-white/5'}
                  `}>
                    <span className="text-xs text-sable/20">Déposer ici</span>
                  </div>
                )}
                {colAssets.map(asset => (
                  <div
                    key={asset.id}
                    draggable
                    onDragStart={e => handleDragStart(e, asset)}
                    onDragEnd={handleDragEnd}
                  >
                    <KanbanCard
                      asset={asset}
                      onStatusChange={updateStatus}
                      isDragging={dragging?.id === asset.id}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {KANBAN_COLUMNS.map(col => {
          const cfg = STATUS_CONFIG[col.id];
          const count = data.assets.filter(a => a.status === col.id).length;
          return (
            <div key={col.id} className="bg-night-light border border-white/5 rounded-lg p-3 text-center">
              <div className={`text-2xl font-marcellus ${cfg?.dot?.replace('bg-', 'text-') || 'text-sable'}`}>
                {count}
              </div>
              <div className="text-xs text-sable/50 mt-1">{col.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
