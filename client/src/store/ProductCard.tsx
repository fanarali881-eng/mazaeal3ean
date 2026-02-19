import { useState } from 'react';
import { useStore, Product, Variant } from './StoreContext';
import { useLocation } from 'wouter';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export default function ProductCard({ product, compact }: ProductCardProps) {
  const { addToCart } = useStore();
  const [, navigate] = useLocation();
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [added, setAdded] = useState(false);

  const variant = product.variants[selectedVariant];
  const hasDiscount = variant?.compareAtPrice && parseFloat(variant.compareAtPrice) > parseFloat(variant.price);
  const discountPercent = hasDiscount ? Math.round((1 - parseFloat(variant.price) / parseFloat(variant.compareAtPrice!)) * 100) : 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (variant) {
      addToCart(product, variant);
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    }
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: '8px',
      overflow: 'hidden',
      border: '1px solid #eee',
      cursor: 'pointer',
      transition: 'box-shadow 0.2s',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    }}
      onClick={() => navigate(`/store/product/${product.handle}`)}
      onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)')}
      onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}>
      {/* Image */}
      <div style={{ position: 'relative', paddingTop: '100%', background: '#f8f8f8' }}>
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {/* Badges */}
        <div style={{ position: 'absolute', top: '8px', right: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {product.isNew && (
            <span style={{ background: '#4CAF50', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>جديد</span>
          )}
          {hasDiscount && (
            <span style={{ background: '#f44336', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>-{discountPercent}%</span>
          )}
          {product.isOffer && !hasDiscount && (
            <span style={{ background: '#ff9800', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>عرض خاص</span>
          )}
        </div>
        {/* Add to cart button */}
        <button onClick={handleAdd}
          style={{
            position: 'absolute', bottom: '8px', left: '8px',
            background: added ? '#4CAF50' : 'white',
            color: added ? 'white' : '#333',
            border: '1px solid #ddd',
            borderRadius: '50%', width: '36px', height: '36px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', transition: 'all 0.2s',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}>
          {added ? '✓' : '+'}
        </button>
      </div>

      {/* Info */}
      <div style={{ padding: '10px', flex: 1, display: 'flex', flexDirection: 'column', direction: 'rtl' }}>
        <div style={{ fontSize: '12px', color: '#999', marginBottom: '4px' }}>{product.vendor}</div>
        <div style={{ fontSize: '13px', fontWeight: 500, color: '#333', marginBottom: '8px', lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as any }}>
          {product.title}
        </div>

        <div style={{ marginTop: 'auto' }}>
          {/* Price */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            {product.variants.length > 1 && <span style={{ fontSize: '12px', color: '#999' }}>من</span>}
            <span style={{ fontSize: '14px', fontWeight: 600, color: hasDiscount ? '#f44336' : '#333' }}>
              {variant?.price} KD
            </span>
            {hasDiscount && (
              <span style={{ fontSize: '12px', color: '#999', textDecoration: 'line-through' }}>
                {variant.compareAtPrice} KD
              </span>
            )}
          </div>

          {/* Variant selector */}
          {product.variants.length > 1 && !compact && (
            <div style={{ display: 'flex', gap: '4px', marginTop: '6px', flexWrap: 'wrap' }}>
              {product.variants.map((v, i) => (
                <button key={v.id} onClick={e => { e.stopPropagation(); setSelectedVariant(i); }}
                  style={{
                    padding: '3px 8px', fontSize: '10px', borderRadius: '4px', cursor: 'pointer',
                    background: selectedVariant === i ? '#4CAF50' : '#f5f5f5',
                    color: selectedVariant === i ? 'white' : '#666',
                    border: selectedVariant === i ? '1px solid #4CAF50' : '1px solid #ddd',
                  }}>
                  {v.title}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
