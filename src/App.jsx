import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Catalogue from './pages/Catalogue';
import Simulator from './pages/Simulator';
import Pipeline from './pages/Pipeline';
import FAQ from './pages/FAQ';
import Roadmap from './pages/Roadmap';
import Outils from './pages/Outils';
import AssetPage from './pages/AssetPage';
import NotFound from './pages/NotFound';
import { Spinner } from './components/ui';
import { useCatalogue } from './hooks/useCatalogue';
import { parseRoute } from './lib/nav';

export default function App() {
  const [route, setRoute] = useState(parseRoute);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data, loading, error, toggleQA, updateStatus } = useCatalogue();

  useEffect(() => {
    const onHashChange = () => {
      setRoute(parseRoute());
      setMobileOpen(false);
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const renderPage = () => {
    if (loading) return <Spinner />;
    if (error) return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <div className="text-4xl mb-3">⚠️</div>
        <h3 className="text-lg text-terracotta font-marcellus">Erreur de chargement</h3>
        <p className="text-sm text-sable/50 mt-2">{error}</p>
        <p className="text-xs text-sable/30 mt-1">Vérifiez que <code className="text-or/60">public/data/catalogue.json</code> existe</p>
      </div>
    );
    if (!data) return null;

    switch (route.page) {
      case 'home': return <Home data={data} />;
      case 'dashboard': return <Dashboard data={data} />;
      case 'catalogue': return <Catalogue data={data} toggleQA={toggleQA} updateStatus={updateStatus} />;
      case 'simulator': return <Simulator data={data} />;
      case 'pipeline': return <Pipeline data={data} updateStatus={updateStatus} />;
      case 'faq': return <FAQ />;
      case 'roadmap': return <Roadmap data={data} />;
      case 'outils': return <Outils />;
      case 'asset': {
        const asset = data.assets.find(a => a.id === route.id);
        return asset
          ? <AssetPage asset={asset} toggleQA={toggleQA} updateStatus={updateStatus} />
          : <NotFound />;
      }
      default: return <NotFound />;
    }
  };

  // Sidebar highlights 'catalogue' when viewing an asset detail page
  const activeNav = route.page === 'asset' ? 'catalogue' : route.page;

  return (
    <div className="min-h-screen bg-night font-inter flex flex-col">
      {/* Zellige background pattern */}
      <div className="zellige-bg" />

      {/* Sidebar */}
      <Sidebar
        activePage={activeNav}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      {/* Main content */}
      <div className="lg:pl-64 relative z-10 flex flex-col flex-1">
        {/* Top bar (mobile) */}
        <header className="lg:hidden sticky top-0 z-30 flex items-center gap-4 px-4 py-3 bg-night/90 backdrop-blur-sm border-b border-white/5">
          <button
            onClick={() => setMobileOpen(true)}
            className="text-sable/60 hover:text-sable transition-colors"
          >
            <Menu size={20} />
          </button>
          <span className="font-marcellus text-sable text-base">Moroccan Medieval</span>
          <span className="text-xs text-sable/30 ml-auto">Asset Studio</span>
        </header>

        {/* Page */}
        <main className="p-6 md:p-8 max-w-7xl mx-auto w-full flex-1">
          {renderPage()}
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
