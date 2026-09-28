export const VALID_PAGES = ['home', 'dashboard', 'catalogue', 'simulator', 'pipeline', 'faq', 'roadmap', 'outils'];

export function parseRoute() {
  const hash = (typeof window !== 'undefined' ? window.location.hash : '').replace(/^#/, '') || '/';
  const segs = hash.split('/').filter(Boolean);
  if (segs.length === 0) return { page: 'home', id: null };
  if (segs[0] === 'asset' && segs[1]) return { page: 'asset', id: decodeURIComponent(segs[1]) };
  if (VALID_PAGES.includes(segs[0])) return { page: segs[0], id: null };
  return { page: '404', id: null };
}

export function navigate(to) {
  const target = '#' + (to.startsWith('/') ? to : '/' + to);
  if (window.location.hash === target) {
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  } else {
    window.location.hash = target;
  }
}
