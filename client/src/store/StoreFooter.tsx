import { useLocation } from 'wouter';

export default function StoreFooter() {
  const [, navigate] = useLocation();

  return (
    <footer dir="rtl" style={{ background: '#1a1a1a', color: '#ccc', padding: '40px 0 20px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px', marginBottom: '30px' }}>
          {/* Customer support */}
          <div>
            <h3 style={{ color: 'white', fontSize: '16px', fontWeight: 600, marginBottom: '15px' }}>دعم العملاء</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a onClick={() => navigate('/store/contact')} style={{ color: '#ccc', fontSize: '13px', cursor: 'pointer', textDecoration: 'none' }}>تواصل معنا</a>
              <a onClick={() => navigate('/store/faq')} style={{ color: '#ccc', fontSize: '13px', cursor: 'pointer', textDecoration: 'none' }}>الأسئلة الشائعة</a>
              <a onClick={() => navigate('/store/stores')} style={{ color: '#ccc', fontSize: '13px', cursor: 'pointer', textDecoration: 'none' }}>معلومات عن المحلات</a>
              <a onClick={() => navigate('/store/about')} style={{ color: '#ccc', fontSize: '13px', cursor: 'pointer', textDecoration: 'none' }}>نبذة عنا</a>
            </div>
          </div>

          {/* Policies */}
          <div>
            <h3 style={{ color: 'white', fontSize: '16px', fontWeight: 600, marginBottom: '15px' }}>السياسات</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a style={{ color: '#ccc', fontSize: '13px', cursor: 'pointer', textDecoration: 'none' }}>سياسة الاستبدال والاسترجاع</a>
              <a style={{ color: '#ccc', fontSize: '13px', cursor: 'pointer', textDecoration: 'none' }}>شروط التوصيل</a>
              <a style={{ color: '#ccc', fontSize: '13px', cursor: 'pointer', textDecoration: 'none' }}>سياسة الخصوصية</a>
              <a style={{ color: '#ccc', fontSize: '13px', cursor: 'pointer', textDecoration: 'none' }}>الشروط والأحكام</a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 style={{ color: 'white', fontSize: '16px', fontWeight: 600, marginBottom: '15px' }}>تواصل معنا</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a href="tel:1809090" style={{ color: '#ccc', fontSize: '13px', textDecoration: 'none' }}>📞 1809090</a>
              <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                <a href="https://www.facebook.com/makanifoods" target="_blank" rel="noopener" style={{ color: '#ccc' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="https://www.instagram.com/makanifoods" target="_blank" rel="noopener" style={{ color: '#ccc' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ borderTop: '1px solid #333', paddingTop: '20px', textAlign: 'center' }}>
          <img src="https://makanifoods.com/cdn/shop/files/Makani_Logo_Horizontal.png?v=1719819498&width=120" alt="مكاني فودز" style={{ height: '30px', marginBottom: '10px', filter: 'brightness(2)' }} />
          <p style={{ fontSize: '12px', color: '#888' }}>© {new Date().getFullYear()} مكاني فودز</p>
        </div>
      </div>
    </footer>
  );
}
