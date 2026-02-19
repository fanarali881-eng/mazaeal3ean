import { useState } from 'react';
import { useStore } from './StoreContext';
import { useLocation } from 'wouter';

export default function StoreHeader() {
  const { categories, getCartCount, searchQuery, setSearchQuery, searchProducts } = useStore();
  const [, navigate] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const cartCount = getCartCount();

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    if (q.trim().length > 1) {
      setSearchResults(searchProducts(q).slice(0, 8));
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/store/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchResults([]);
    }
  };

  return (
    <header className="store-header" dir="rtl">
      {/* Top bar */}
      <div style={{ background: '#4CAF50', color: 'white', padding: '8px 0', fontSize: '13px', textAlign: 'center' }}>
        توصيل مجاني للطلبات فوق 10 د.ك | خدمة العملاء: 1809090
      </div>

      {/* Main header */}
      <div style={{ background: 'white', borderBottom: '1px solid #eee', padding: '12px 0' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
          {/* Logo */}
          <a onClick={() => navigate('/store')} style={{ cursor: 'pointer', flexShrink: 0 }}>
            <img src="https://makanifoods.com/cdn/shop/files/Makani_Logo_Horizontal.png?v=1719819498&width=200" alt="مكاني فودز" style={{ height: '45px' }} />
          </a>

          {/* Search bar - desktop */}
          <form onSubmit={handleSearchSubmit} style={{ flex: 1, maxWidth: '500px', position: 'relative' }} className="store-search-desktop">
            <input
              type="text"
              placeholder="ابحث عن منتجات..."
              value={searchQuery}
              onChange={e => handleSearch(e.target.value)}
              style={{ width: '100%', padding: '10px 40px 10px 15px', border: '2px solid #4CAF50', borderRadius: '25px', fontSize: '14px', outline: 'none', direction: 'rtl' }}
            />
            <button type="submit" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            </button>
            {/* Search dropdown */}
            {searchResults.length > 0 && (
              <div style={{ position: 'absolute', top: '100%', right: 0, left: 0, background: 'white', border: '1px solid #ddd', borderRadius: '8px', marginTop: '4px', zIndex: 100, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', maxHeight: '400px', overflow: 'auto' }}>
                {searchResults.map(p => (
                  <a key={p.id} onClick={() => { navigate(`/store/product/${p.handle}`); setSearchResults([]); setSearchQuery(''); }}
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', borderBottom: '1px solid #f0f0f0', cursor: 'pointer', textDecoration: 'none', color: '#333' }}>
                    <img src={p.image} alt="" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 500 }}>{p.title}</div>
                      <div style={{ fontSize: '12px', color: '#4CAF50' }}>{p.variants[0]?.price} KD</div>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </form>

          {/* Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexShrink: 0 }}>
            {/* Search mobile */}
            <button className="store-search-mobile-btn" onClick={() => setSearchOpen(!searchOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'none' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            </button>
            {/* Cart */}
            <a onClick={() => navigate('/store/cart')} style={{ cursor: 'pointer', position: 'relative' }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
              {cartCount > 0 && (
                <span style={{ position: 'absolute', top: '-8px', left: '-8px', background: '#4CAF50', color: 'white', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold' }}>
                  {cartCount}
                </span>
              )}
            </a>
            {/* Mobile menu */}
            <button className="store-mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'none' }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile search */}
      {searchOpen && (
        <div style={{ background: 'white', padding: '10px 20px', borderBottom: '1px solid #eee' }} className="store-search-mobile">
          <form onSubmit={handleSearchSubmit} style={{ position: 'relative' }}>
            <input type="text" placeholder="ابحث عن منتجات..." value={searchQuery} onChange={e => handleSearch(e.target.value)}
              style={{ width: '100%', padding: '10px 40px 10px 15px', border: '2px solid #4CAF50', borderRadius: '25px', fontSize: '14px', outline: 'none', direction: 'rtl' }} />
          </form>
        </div>
      )}

      {/* Navigation */}
      <nav className="store-nav-desktop" style={{ background: '#333', color: 'white' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'center', gap: '0' }}>
          {Object.entries(categories).map(([key, cat]) => (
            <div key={key} style={{ position: 'relative' }}
              onMouseEnter={() => setActiveDropdown(key)}
              onMouseLeave={() => setActiveDropdown(null)}>
              <a onClick={() => navigate(`/store/collection/${cat.handle}`)}
                style={{ display: 'block', padding: '12px 20px', color: 'white', cursor: 'pointer', fontSize: '14px', fontWeight: 500, whiteSpace: 'nowrap', textDecoration: 'none' }}>
                {cat.title}
                {cat.subcategories.length > 0 && <span style={{ marginRight: '5px', fontSize: '10px' }}>▼</span>}
              </a>
              {activeDropdown === key && cat.subcategories.length > 0 && (
                <div style={{ position: 'absolute', top: '100%', right: 0, background: 'white', minWidth: '220px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', borderRadius: '0 0 8px 8px', zIndex: 50, padding: '8px 0' }}>
                  {cat.subcategories.map(sub => (
                    <a key={sub.handle} onClick={() => { navigate(`/store/collection/${sub.handle}`); setActiveDropdown(null); }}
                      style={{ display: 'block', padding: '10px 20px', color: '#333', fontSize: '13px', cursor: 'pointer', textDecoration: 'none' }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#f5f5f5')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                      {sub.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <a onClick={() => navigate('/store/collection/all-products')}
            style={{ display: 'block', padding: '12px 20px', color: 'white', cursor: 'pointer', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}>
            جميع المنتجات
          </a>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, left: 0, zIndex: 200 }}>
          <div onClick={() => setMobileMenuOpen(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} />
          <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '300px', background: 'white', overflowY: 'auto', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <img src="https://makanifoods.com/cdn/shop/files/Makani_Logo_Horizontal.png?v=1719819498&width=150" alt="مكاني فودز" style={{ height: '35px' }} />
              <button onClick={() => setMobileMenuOpen(false)} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>✕</button>
            </div>
            {Object.entries(categories).map(([key, cat]) => (
              <div key={key} style={{ borderBottom: '1px solid #eee' }}>
                <a onClick={() => { navigate(`/store/collection/${cat.handle}`); setMobileMenuOpen(false); }}
                  style={{ display: 'block', padding: '12px 0', fontWeight: 600, fontSize: '15px', color: '#333', cursor: 'pointer', textDecoration: 'none' }}>
                  {cat.title}
                </a>
                {cat.subcategories.map(sub => (
                  <a key={sub.handle} onClick={() => { navigate(`/store/collection/${sub.handle}`); setMobileMenuOpen(false); }}
                    style={{ display: 'block', padding: '8px 15px', fontSize: '13px', color: '#666', cursor: 'pointer', textDecoration: 'none' }}>
                    {sub.title}
                  </a>
                ))}
              </div>
            ))}
            <a onClick={() => { navigate('/store/collection/all-products'); setMobileMenuOpen(false); }}
              style={{ display: 'block', padding: '12px 0', fontWeight: 600, fontSize: '15px', color: '#333', cursor: 'pointer', textDecoration: 'none', borderBottom: '1px solid #eee' }}>
              جميع المنتجات
            </a>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .store-search-desktop { display: none !important; }
          .store-search-mobile-btn { display: block !important; }
          .store-mobile-menu-btn { display: block !important; }
          .store-nav-desktop { display: none !important; }
        }
      `}</style>
    </header>
  );
}
