import { useState } from 'react';
import { STATUS_CONFIG, TYPE_CONFIG } from '../constants';
import { ArchPlaceholder, StatusBadge, TypeBadge, QAProgress } from './ui';

export default function AssetCard({ asset, onClick }) {
  const [imgError, setImgError] = useState(false);
  const qaTotal = asset.qa.length;
  const qaDone = asset.qa.filter(q => q.done).length;

  const showThumb = asset.thumbnail && !imgError;

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer bg-night-light border border-white/5 rounded-xl overflow-hidden
                 hover:border-zellige/40 hover:shadow-xl hover:shadow-zellige/10
                 transition-all duration-250 hover:-translate-y-0.5 fade-in flex flex-col justify-between"
    >
      <div>
        {/* Arch thumbnail area */}
        <div className="relative aspect-video w-full overflow-hidden bg-night flex items-center justify-center">
          {showThumb ? (
            <img
              src={`/${asset.thumbnail}`}
              alt={asset.name}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <ArchPlaceholder type={asset.type} />
          )}

          {/* Horseshoe arch overlay frame */}
          <div className="absolute inset-0 pointer-events-none border-b border-white/10">
            <svg viewBox="0 0 100 80" preserveAspectRatio="none" className="w-full h-full opacity-30">
              <path
                d="M5,80 L5,35 Q5,5 50,5 Q95,5 95,35 L95,80"
                fill="none"
                stroke="#C9A227"
                strokeWidth="1.2"
              />
            </svg>
          </div>

          {/* Type badge top-right */}
          <div className="absolute top-2 right-2 drop-shadow-md">
            <TypeBadge type={asset.type} />
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-marcellus text-sable text-base leading-tight group-hover:text-or transition-colors duration-200">
              {asset.name}
            </h3>
            <p className="text-xs text-sable/50 mt-1 line-clamp-2 font-inter leading-relaxed">
              {asset.description}
            </p>
          </div>

          {/* Tags */}
          {asset.tags && asset.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {asset.tags.slice(0, 3).map(tag => (
                <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-sable/40">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer & QA */}
      <div className="p-4 pt-0 space-y-2">
        <div className="flex items-center justify-between pt-2 border-t border-white/5">
          <StatusBadge status={asset.status} />
          <div className="text-right">
            <div className="text-or font-semibold text-sm">
              {asset.priceRobux.toLocaleString('fr-FR')} R$
            </div>
            {asset.polycount && (
              <div className="text-[10px] text-sable/40">{asset.polycount.toLocaleString()} tris</div>
            )}
          </div>
        </div>

        {/* QA mini bar */}
        <QAProgress qa={asset.qa} />
      </div>
    </div>
  );
}
