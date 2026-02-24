import { useState, useRef, useEffect, useCallback } from 'react';
import { useStore } from './StoreContext';
import { useLang } from './LanguageContext';
import { useLocation } from 'wouter';
import ProductCard from './ProductCard';
import StoreHeader from './StoreHeader';
import StoreFooter from './StoreFooter';
import CartDrawer from './CartDrawer';

/* ── Hero Section - Al Ain Farms style ── */
function HeroSection() {
  const { t, dir, isRTL } = useLang();
  const [, navigate] = useLocation();

  return (
    <section style={{
      position: 'relative', overflow: 'hidden',
      minHeight: '420px', display: 'flex', alignItems: 'center',
    }}>
      {/* Background banner image */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: 'url(/product-images/banner-hero-milk.png)',
        backgroundSize: 'cover', backgroundPosition: 'center',
      }} />
      {/* Overlay for text readability */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        background: isRTL
          ? 'linear-gradient(to left, rgba(26,39,68,0.85) 0%, rgba(26,39,68,0.5) 50%, transparent 100%)'
          : 'linear-gradient(to right, rgba(26,39,68,0.85) 0%, rgba(26,39,68,0.5) 50%, transparent 100%)',
      }} />

      <div style={{
        maxWidth: '1400px', margin: '0 auto', padding: '60px 40px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        width: '100%', position: 'relative', zIndex: 1,
      }}>
        <div style={{ maxWidth: '550px' }}>
          <h1 style={{
            fontSize: '42px', fontWeight: 800, color: 'white', lineHeight: 1.3,
            marginBottom: '16px',
          }}>
            {isRTL ? 'مزارع العين' : 'Al Ain Farms'}
          </h1>
          <p style={{
            fontSize: '22px', color: 'rgba(255,255,255,0.95)', fontWeight: 500,
            marginBottom: '8px',
          }}>
            {isRTL ? 'بكل حب،،، صُنع محلياً' : 'Made with Love... Locally'}
          </p>
          <p style={{
            fontSize: '16px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6,
            marginBottom: '30px',
          }}>
            {isRTL
              ? 'أكبر شركة ألبان متكاملة في الإمارات. منتجات طازجة من الحليب والعصائر والدواجن والبيض.'
              : 'The largest integrated dairy company in the UAE. Fresh milk, juices, poultry, and eggs.'}
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/store/collection/dairy')} style={{
              background: '#c8102e', color: 'white', border: 'none', padding: '14px 32px',
              borderRadius: '30px', fontSize: '15px', fontWeight: 700, cursor: 'pointer',
              transition: 'all 0.3s',
            }}>
              {isRTL ? 'تسوق الآن' : 'Shop Now'}
            </button>
            <button onClick={() => navigate('/store/collection/promotion')} style={{
              background: 'transparent', color: 'white', border: '2px solid white', padding: '14px 32px',
              borderRadius: '30px', fontSize: '15px', fontWeight: 700, cursor: 'pointer',
              transition: 'all 0.3s',
            }}>
              {isRTL ? 'عروض خاصة' : 'Special Offers'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Product Carousel ── */
function ProductCarousel({ title, products, viewAllLink, titleUnderline }: { title: string; products: any[]; viewAllLink?: string; titleUnderline?: boolean }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [, navigate] = useLocation();
  const { t } = useLang();
  const [canNext, setCanNext] = useState(false);
  const [canPrev, setCanPrev] = useState(false);

  const checkScroll = useCallback(() => {
    if (scrollRef.current) {
      const el = scrollRef.current;
      const { scrollLeft, scrollWidth, clientWidth } = el;
      const atStart = Math.abs(scrollLeft) < 5;
      const atEnd = Math.abs(scrollLeft) + clientWidth >= scrollWidth - 5;
      setCanNext(!atEnd);
      setCanPrev(!atStart);
    }
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      setTimeout(checkScroll, 100);
      el.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      return () => { el.removeEventListener('scroll', checkScroll); window.removeEventListener('resize', checkScroll); };
    }
  }, [checkScroll, products]);

  const scrollNext = () => {
    if (scrollRef.current && canNext) {
      const isRTL = getComputedStyle(scrollRef.current).direction === 'rtl';
      scrollRef.current.scrollBy({ left: isRTL ? -350 : 350, behavior: 'smooth' });
    }
  };
  const scrollPrev = () => {
    if (scrollRef.current && canPrev) {
      const isRTL = getComputedStyle(scrollRef.current).direction === 'rtl';
      scrollRef.current.scrollBy({ left: isRTL ? 350 : -350, behavior: 'smooth' });
    }
  };

  if (!products.length) return null;

  return (
    <section style={{ padding: '40px 0' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
        <h2 className="store-section-title" style={{ fontSize: '28px', fontWeight: 700, color: '#1a2744', textAlign: 'center', marginBottom: '25px', textDecoration: titleUnderline ? 'underline' : 'none', textUnderlineOffset: '8px' }}>{title}</h2>
        <div style={{ position: 'relative' }}>
          <div className="store-carousel-arrows" style={{
            position: 'absolute', right: '-5px', top: '40%', transform: 'translateY(-50%)', zIndex: 10,
            display: 'flex', flexDirection: 'column', gap: '4px',
          }}>
            <button onClick={scrollNext} style={{
              background: 'white', border: 'none', borderRadius: '50%', width: '44px', height: '44px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: canNext ? 'pointer' : 'default', boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
            }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={canNext ? '#1a2744' : '#ddd'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg></button>
            <button onClick={scrollPrev} style={{
              background: 'white', border: 'none', borderRadius: '50%', width: '44px', height: '44px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: canPrev ? 'pointer' : 'default', boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
            }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={canPrev ? '#1a2744' : '#ddd'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg></button>
          </div>

          <div ref={scrollRef} className="product-carousel-items" style={{
            display: 'flex', gap: '0', overflowX: 'auto', scrollBehavior: 'smooth', padding: '5px 0',
            scrollbarWidth: 'none',
          }}>
            {products.map(p => (
              <div key={p.id} className="store-product-carousel-item" style={{ minWidth: 'calc(25% - 1px)', maxWidth: 'calc(25% - 1px)', flexShrink: 0, borderLeft: '1px solid #f0f0f0' }}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
        {viewAllLink && (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <a onClick={() => navigate(viewAllLink)} style={{
              display: 'inline-block', background: '#c8102e', color: 'white', padding: '10px 30px', borderRadius: '25px',
              fontWeight: 600, fontSize: '14px', cursor: 'pointer', textDecoration: 'none',
            }}>{t('store.viewAll')}</a>
          </div>
        )}
      </div>
    </section>
  );
}

/* ── Category Cards - Al Ain Farms style ── */
function CategoryCards() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [, navigate] = useLocation();
  const { t, isRTL } = useLang();
  const [canNext, setCanNext] = useState(false);
  const [canPrev, setCanPrev] = useState(false);

  const cats = [
    { handle: 'dairy', titleKey: 'cat.milk', emoji: '🥛', color: '#e8f4fd' },
    { handle: 'dairy_flavored', titleKey: 'cat.flavored', emoji: '🍫', color: '#fde8e8' },
    { handle: 'yoghurt-laban_yoghurt', titleKey: 'cat.yoghurt', emoji: '🥄', color: '#f0e8fd' },
    { handle: 'yoghurt-laban_laban', titleKey: 'cat.laban', emoji: '🥤', color: '#e8fde8' },
    { handle: 'juices', titleKey: 'cat.juice', emoji: '🍊', color: '#fdf4e8' },
    { handle: 'cheese', titleKey: 'cat.cheese', emoji: '🧀', color: '#fdfde8' },
    { handle: 'poultry-eggs_chicken', titleKey: 'cat.poultry', emoji: '🍗', color: '#fde8f0' },
    { handle: 'poultry-eggs_eggs', titleKey: 'cat.eggs', emoji: '🥚', color: '#f5f0e0' },
  ];

  const checkScroll = useCallback(() => {
    if (scrollRef.current) {
      const el = scrollRef.current;
      const { scrollLeft, scrollWidth, clientWidth } = el;
      const atStart = Math.abs(scrollLeft) < 5;
      const atEnd = Math.abs(scrollLeft) + clientWidth >= scrollWidth - 5;
      setCanNext(!atEnd);
      setCanPrev(!atStart);
    }
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      setTimeout(checkScroll, 100);
      el.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      return () => { el.removeEventListener('scroll', checkScroll); window.removeEventListener('resize', checkScroll); };
    }
  }, [checkScroll]);

  const scrollNext = () => {
    if (scrollRef.current && canNext) {
      const isRTL2 = getComputedStyle(scrollRef.current).direction === 'rtl';
      scrollRef.current.scrollBy({ left: isRTL2 ? -350 : 350, behavior: 'smooth' });
    }
  };
  const scrollPrev = () => {
    if (scrollRef.current && canPrev) {
      const isRTL2 = getComputedStyle(scrollRef.current).direction === 'rtl';
      scrollRef.current.scrollBy({ left: isRTL2 ? 350 : -350, behavior: 'smooth' });
    }
  };

  return (
    <section style={{ padding: '40px 0', background: '#f8f9fa' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
        <h2 className="store-section-title" style={{ fontSize: '28px', fontWeight: 700, color: '#1a2744', textAlign: 'center', marginBottom: '25px' }}>
          {isRTL ? 'تسوق حسب الفئة' : 'Shop by Category'}
        </h2>
        <div style={{ position: 'relative' }}>
          <div className="store-carousel-arrows" style={{
            position: 'absolute', right: '-5px', top: '50%', transform: 'translateY(-50%)', zIndex: 10,
            display: 'flex', flexDirection: 'column', gap: '4px',
          }}>
            <button onClick={scrollNext} style={{
              background: 'white', border: 'none', borderRadius: '50%', width: '44px', height: '44px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: canNext ? 'pointer' : 'default', boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
            }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={canNext ? '#1a2744' : '#ddd'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg></button>
            <button onClick={scrollPrev} style={{
              background: 'white', border: 'none', borderRadius: '50%', width: '44px', height: '44px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: canPrev ? 'pointer' : 'default', boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
            }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={canPrev ? '#1a2744' : '#ddd'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg></button>
          </div>
          <div ref={scrollRef} style={{
            display: 'flex', gap: '16px', overflowX: 'auto', scrollBehavior: 'smooth', padding: '5px 0',
            scrollbarWidth: 'none',
          }}>
            {cats.map(cat => (
              <div key={cat.handle} className="store-category-card" onClick={() => navigate(`/store/collection/${cat.handle}`)}
                style={{
                  minWidth: '160px', maxWidth: '160px', flexShrink: 0, cursor: 'pointer',
                  borderRadius: '16px', overflow: 'hidden', border: '1px solid #eee',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', background: cat.color,
                  transition: 'all 0.3s', padding: '24px 16px', textAlign: 'center',
                }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                <span style={{ fontSize: '48px', marginBottom: '12px' }}>{cat.emoji}</span>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#1a2744' }}>{t(cat.titleKey)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── About Al Ain Farms Section ── */
function AboutSection() {
  const { isRTL } = useLang();

  const features = isRTL ? [
    { icon: '🐄', title: 'مزارع محلية', desc: 'منتجات من مزارعنا في الإمارات' },
    { icon: '✅', title: 'جودة عالية', desc: 'معايير جودة عالمية' },
    { icon: '🚚', title: 'توصيل سريع', desc: 'توصيل طازج لباب بيتك' },
    { icon: '🌿', title: 'طبيعي 100%', desc: 'بدون مواد حافظة' },
  ] : [
    { icon: '🐄', title: 'Local Farms', desc: 'Products from our UAE farms' },
    { icon: '✅', title: 'High Quality', desc: 'International quality standards' },
    { icon: '🚚', title: 'Fast Delivery', desc: 'Fresh delivery to your door' },
    { icon: '🌿', title: '100% Natural', desc: 'No preservatives' },
  ];

  return (
    <section style={{ padding: '50px 0', background: '#f8f9fa' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
          {features.map((f, i) => (
            <div key={i} style={{
              textAlign: 'center', padding: '30px 16px', background: 'white',
              borderRadius: '16px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            }}>
              <span style={{ fontSize: '40px', display: 'block', marginBottom: '12px' }}>{f.icon}</span>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1a2744', marginBottom: '8px' }}>{f.title}</h3>
              <p style={{ fontSize: '13px', color: '#666', margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          section > div > div[style*="grid-template-columns"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ── Main Store Page ── */
export default function StorePage() {
  const { products, getProductsByCollection, isLoading } = useStore();
  const { t, dir, isRTL } = useLang();

  if (isLoading) {
    return (
      <div dir={dir}>
        <StoreHeader />
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '50px', height: '50px', border: '4px solid #eee', borderTop: '4px solid #c8102e', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 15px' }} />
            <p style={{ color: '#666' }}>{t('store.loading')}</p>
          </div>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const newArrivals = getProductsByCollection('new-arrivals').slice(0, 10);
  const bestSellers = getProductsByCollection('frontpage').slice(0, 12);
  const offers = getProductsByCollection('promotion');
  const dairyProducts = getProductsByCollection('dairy').slice(0, 10);

  return (
    <div dir={dir} style={{ background: '#fff', minHeight: '100vh', width: '100%', overflow: 'hidden' }}>
      <StoreHeader />
      <CartDrawer />

      {/* Hero Section */}
      <HeroSection />

      {/* Category Cards */}
      <CategoryCards />

      {/* Best Sellers / Featured */}
      <ProductCarousel title={t('store.bestSellers')} products={bestSellers} viewAllLink="/store/collection/dairy" />

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <ProductCarousel title={t('store.newArrivals')} products={newArrivals} viewAllLink="/store/collection/new-arrivals" />
      )}

      {/* About Section - Features */}
      <AboutSection />

      {/* Special Offers */}
      {offers.length > 0 && (
        <ProductCarousel title={t('store.specialOffers')} products={offers} viewAllLink="/store/collection/promotion" />
      )}

      <StoreFooter />

      <style>{`
        div::-webkit-scrollbar { display: none; }
        
        @media (max-width: 768px) {
          .store-product-carousel-item {
            min-width: calc(50% - 1px) !important;
            max-width: calc(50% - 1px) !important;
          }
          .store-category-card {
            min-width: 130px !important;
            max-width: 130px !important;
          }
          .store-section-title {
            font-size: 22px !important;
          }
          .store-carousel-arrows {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
