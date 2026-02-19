import { useRef } from 'react';
import { useStore } from './StoreContext';
import { useLocation } from 'wouter';
import ProductCard from './ProductCard';
import StoreHeader from './StoreHeader';
import StoreFooter from './StoreFooter';

function ProductCarousel({ title, products, viewAllLink }: { title: string; products: any[]; viewAllLink?: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [, navigate] = useLocation();

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = dir === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  if (!products.length) return null;

  return (
    <section style={{ padding: '30px 0' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#333', textAlign: 'center' }}>{title}</h2>
        </div>
        <div style={{ position: 'relative' }}>
          <button onClick={() => scroll('right')} style={{
            position: 'absolute', right: '-15px', top: '50%', transform: 'translateY(-50%)', zIndex: 10,
            background: 'white', border: '1px solid #ddd', borderRadius: '50%', width: '40px', height: '40px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}>▶</button>
          <button onClick={() => scroll('left')} style={{
            position: 'absolute', left: '-15px', top: '50%', transform: 'translateY(-50%)', zIndex: 10,
            background: 'white', border: '1px solid #ddd', borderRadius: '50%', width: '40px', height: '40px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}>◀</button>
          <div ref={scrollRef} style={{
            display: 'flex', gap: '15px', overflowX: 'auto', scrollBehavior: 'smooth', padding: '5px 0',
            scrollbarWidth: 'none', msOverflowStyle: 'none',
          }}>
            {products.map(p => (
              <div key={p.id} style={{ minWidth: '200px', maxWidth: '200px', flexShrink: 0 }}>
                <ProductCard product={p} compact />
              </div>
            ))}
          </div>
        </div>
        {viewAllLink && (
          <div style={{ textAlign: 'center', marginTop: '15px' }}>
            <a onClick={() => navigate(viewAllLink)} style={{
              color: '#4CAF50', fontWeight: 600, fontSize: '14px', cursor: 'pointer', textDecoration: 'underline',
            }}>عرض الكل</a>
          </div>
        )}
      </div>
    </section>
  );
}

function CategoryCards({ categories }: { categories: { handle: string; title: string; image: string }[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [, navigate] = useLocation();

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = dir === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <section style={{ padding: '30px 0' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#333', textAlign: 'center', marginBottom: '20px' }}>الأكثر زيارة</h2>
        <div style={{ position: 'relative' }}>
          <button onClick={() => scroll('right')} style={{
            position: 'absolute', right: '-15px', top: '50%', transform: 'translateY(-50%)', zIndex: 10,
            background: 'white', border: '1px solid #ddd', borderRadius: '50%', width: '40px', height: '40px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}>▶</button>
          <button onClick={() => scroll('left')} style={{
            position: 'absolute', left: '-15px', top: '50%', transform: 'translateY(-50%)', zIndex: 10,
            background: 'white', border: '1px solid #ddd', borderRadius: '50%', width: '40px', height: '40px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}>◀</button>
          <div ref={scrollRef} style={{
            display: 'flex', gap: '15px', overflowX: 'auto', scrollBehavior: 'smooth', padding: '5px 0',
            scrollbarWidth: 'none',
          }}>
            {categories.map(cat => (
              <div key={cat.handle} onClick={() => navigate(`/store/collection/${cat.handle}`)}
                style={{
                  minWidth: '220px', maxWidth: '220px', flexShrink: 0, cursor: 'pointer',
                  borderRadius: '8px', overflow: 'hidden', border: '1px solid #eee',
                  display: 'flex', alignItems: 'center', background: 'white',
                  transition: 'box-shadow 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}>
                <img src={cat.image} alt={cat.title} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                <div style={{ padding: '10px', fontSize: '14px', fontWeight: 600, color: '#333', direction: 'rtl' }}>{cat.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BrandLogos() {
  const brands = [
    { name: "Chef's Palette", logo: "https://makanifoods.com/cdn/shop/files/chefs_palette_logo.png?v=1719819498&width=150" },
    { name: "Mr. Cleavers", logo: "https://makanifoods.com/cdn/shop/files/mr_cleavers_logo.png?v=1719819498&width=150" },
    { name: "Diamantina", logo: "https://makanifoods.com/cdn/shop/files/diamantina_logo.png?v=1719819498&width=150" },
    { name: "Lamb Weston", logo: "https://makanifoods.com/cdn/shop/files/lamb_weston_logo.png?v=1719819498&width=150" },
    { name: "Ardo", logo: "https://makanifoods.com/cdn/shop/files/ardo_logo.png?v=1719819498&width=150" },
    { name: "Sadia", logo: "https://makanifoods.com/cdn/shop/files/sadia_logo.png?v=1719819498&width=150" },
    { name: "Ocean's Pride", logo: "https://makanifoods.com/cdn/shop/files/oceans_pride_logo.png?v=1719819498&width=150" },
    { name: "Chefs Choice", logo: "https://makanifoods.com/cdn/shop/files/chefs_choice_logo.png?v=1719819498&width=150" },
  ];

  return (
    <section style={{ padding: '30px 0', background: '#f9f9f9' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '30px', alignItems: 'center' }}>
        {brands.map(b => (
          <div key={b.name} style={{ width: '120px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.7 }}>
            <img src={b.logo} alt={b.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
              onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default function StorePage() {
  const { products, getProductsByCollection, isLoading } = useStore();

  if (isLoading) {
    return (
      <div dir="rtl">
        <StoreHeader />
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '50px', height: '50px', border: '4px solid #eee', borderTop: '4px solid #4CAF50', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 15px' }} />
            <p style={{ color: '#666' }}>جاري تحميل المتجر...</p>
          </div>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const newArrivals = getProductsByCollection('new-arrivals');
  const bestSellers = getProductsByCollection('frontpage').length > 0
    ? getProductsByCollection('frontpage')
    : products.slice(0, 15);
  const offers = getProductsByCollection('promotion');
  const oceansPride = getProductsByCollection('oceans-pride');

  const visitedCategories = [
    { handle: 'frozen_fries-appetizers', title: 'بطاطا مقلية ومقبلات', image: 'https://cdn.shopify.com/s/files/1/0846/7093/9421/collections/French_Fries.jpg?v=1719819498&width=300' },
    { handle: 'frozen_beef', title: 'لحم بقر و عجل', image: 'https://cdn.shopify.com/s/files/1/0846/7093/9421/collections/Beef_Veal.jpg?v=1719819498&width=300' },
    { handle: 'frozen_poultry', title: 'دواجن', image: 'https://cdn.shopify.com/s/files/1/0846/7093/9421/collections/Poultry.jpg?v=1719819498&width=300' },
    { handle: 'frozen_seafood', title: 'مأكولات بحرية', image: 'https://cdn.shopify.com/s/files/1/0846/7093/9421/collections/Seafood.jpg?v=1719819498&width=300' },
    { handle: 'frozen_vegetables-fruits', title: 'خضار وفواكه', image: 'https://cdn.shopify.com/s/files/1/0846/7093/9421/collections/Vegetables_Fruits.jpg?v=1719819498&width=300' },
    { handle: 'chilled-dry_cheese', title: 'ألبان ، أجبان ، وبيض', image: 'https://cdn.shopify.com/s/files/1/0846/7093/9421/collections/Cheese.jpg?v=1719819498&width=300' },
  ];

  return (
    <div dir="rtl" style={{ background: '#fafafa', minHeight: '100vh' }}>
      <StoreHeader />

      {/* Hero Banner */}
      <section style={{ background: 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)', padding: '50px 20px', textAlign: 'center', color: 'white' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '10px' }}>مكاني فودز</h1>
          <p style={{ fontSize: '18px', opacity: 0.9, marginBottom: '20px' }}>مختصوا الأغذية المجمدة - توصيل لباب بيتك</p>
          <p style={{ fontSize: '14px', opacity: 0.8 }}>توصيل مجاني للطلبات فوق 10 د.ك</p>
        </div>
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <ProductCarousel title="وصل حديثاً" products={newArrivals} viewAllLink="/store/collection/new-arrivals" />
      )}

      {/* Best Sellers */}
      <ProductCarousel title="الأكثر مبيعا" products={bestSellers.slice(0, 15)} viewAllLink="/store/collection/all-products" />

      {/* Most Visited Categories */}
      <CategoryCards categories={visitedCategories} />

      {/* Offers */}
      {offers.length > 0 && (
        <ProductCarousel title="عروض خاصة" products={offers} viewAllLink="/store/collection/promotion" />
      )}

      {/* Ocean's Pride */}
      {oceansPride.length > 0 && (
        <ProductCarousel title="أوشنز برايد" products={oceansPride.slice(0, 15)} viewAllLink="/store/collection/oceans-pride" />
      )}

      {/* Brand Logos */}
      <BrandLogos />

      <StoreFooter />

      <style>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
