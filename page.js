export default function Home() {
  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      maxWidth: '700px',
      margin: '80px auto',
      padding: '40px',
      textAlign: 'center',
      background: '#fff',
      borderRadius: '24px',
      boxShadow: '0 4px 20px rgba(113, 106, 86, 0.1)'
    }}>
      <h1 style={{
        fontFamily: '"Playfair Display", serif',
        fontSize: '3rem',
        color: '#716a56',
        marginBottom: '16px',
        fontWeight: '800'
      }}>
        TheQuiltHub
      </h1>
      <p style={{
        fontSize: '1.2rem',
        color: '#666',
        marginBottom: '32px',
        lineHeight: '1.6'
      }}>
        Share profiles from our quilting community directory
      </p>
      <a
        href="https://thequilthub.com/pages/resource-hub"
        style={{
          display: 'inline-block',
          background: '#716a56',
          color: 'white',
          padding: '16px 40px',
          borderRadius: '50px',
          textDecoration: 'none',
          fontWeight: '700',
          fontSize: '1rem',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          boxShadow: '0 4px 16px rgba(113, 106, 86, 0.2)',
          transition: 'transform 0.3s'
        }}
        onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
        onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
      >
        Browse Directory
      </a>
    </div>
  );
}
