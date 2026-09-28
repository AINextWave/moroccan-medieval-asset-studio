import { useState, useEffect, useCallback } from 'react';

const CATALOGUE_URL = '/data/catalogue.json';
const STORAGE_KEY = 'moroccan-medieval-studio';

function mergeWithLocalStorage(serverData) {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    const qaOverrides = stored.qaOverrides || {};
    const kanbanOverrides = stored.kanbanOverrides || {};

    const assets = serverData.assets.map(asset => ({
      ...asset,
      status: kanbanOverrides[asset.id] || asset.status,
      qa: asset.qa.map((item, idx) => ({
        ...item,
        done: qaOverrides[`${asset.id}-${idx}`] !== undefined
          ? qaOverrides[`${asset.id}-${idx}`]
          : item.done,
      })),
    }));

    return { ...serverData, assets };
  } catch {
    return serverData;
  }
}

export function useCatalogue() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(CATALOGUE_URL)
      .then(r => r.json())
      .then(json => {
        setData(mergeWithLocalStorage(json));
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Persist QA checkbox change
  const toggleQA = useCallback((assetId, qaIndex) => {
    setData(prev => {
      if (!prev) return prev;
      const assets = prev.assets.map(a => {
        if (a.id !== assetId) return a;
        const qa = a.qa.map((item, i) =>
          i === qaIndex ? { ...item, done: !item.done } : item
        );
        return { ...a, qa };
      });
      const next = { ...prev, assets };

      // Persist
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      const asset = next.assets.find(a => a.id === assetId);
      const qaOverrides = { ...(stored.qaOverrides || {}) };
      qaOverrides[`${assetId}-${qaIndex}`] = asset.qa[qaIndex].done;
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...stored, qaOverrides }));

      return next;
    });
  }, []);

  // Persist status change (kanban)
  const updateStatus = useCallback((assetId, newStatus) => {
    setData(prev => {
      if (!prev) return prev;
      const assets = prev.assets.map(a =>
        a.id === assetId ? { ...a, status: newStatus } : a
      );
      const next = { ...prev, assets };

      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      const kanbanOverrides = { ...(stored.kanbanOverrides || {}) };
      kanbanOverrides[assetId] = newStatus;
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...stored, kanbanOverrides }));

      return next;
    });
  }, []);

  return { data, loading, error, toggleQA, updateStatus };
}
