import Papa from 'papaparse';

export const dynamic = 'force-dynamic';

const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTNSZyiX-M4hlyJFi1Zf9n4yzM_BdGqBydsKENJVfBKDqAdBkqtWyzTFP9yuhSSu-S_SLrjQbKTZhDK/pub?gid=1562851893&single=true&output=csv';

function slugify(text) {
  return String(text || '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '')
    .replace(/\-+/g, '-')
    .replace(/^\-+|\-+$/g, '');
}

async function getBusinessBySlug(slug) {
  try {
    const response = await fetch(SHEET_CSV_URL, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    
    const csvText = await response.text();
    
    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const business = results.data.find(row => {
            const name = row['Resource/Business Name:'];
            return name && slugify(name) === slug;
          });
          
          resolve(business || null);
        },
        error: (error) => reject(error)
      });
    });
  } catch (error) {
    console.error('Error fetching business:', error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  const business = await getBusinessBySlug(slug);
  
  if (!business) {
    return {
      title: 'Business Not Found | TheQuiltHub',
    };
  }
  
  const name = business['Resource/Business Name:'] || 'Business';
  const bio = business['Brief Description / Bio:'] || '';
  const category = business['Resource Type/Category:'] || '';
  const location = business['Full Location (City, State/Province, Country):'] || '';
  const photo = business['Logo or Profile Photo:'] || '';
  
  const description = bio || `${category}${location ? ' • ' + location : ''}`;
  const currentUrl = `https://share.thequilthub.com/share/${slug}`;
  
  return {
    title: `${name} | TheQuiltHub`,
    description: description,
    openGraph: {
      title: name,
      description: description,
      url: currentUrl,
      siteName: 'TheQuiltHub',
      images: photo ? [
        {
          url: photo,
          width: 1200,
          height: 630,
          alt: name,
        }
      ] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: name,
      description: description,
      images: photo ? [photo] : [],
    },
  };
}

export default async function SharePage({ params }) {
  const { slug } = params;
  const business = await getBusinessBySlug(slug);
  
  if (!business) {
    return (
      <div style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        maxWidth: '600px',
        margin: '80px auto',
        padding: '40px',
        textAlign: 'center',
        background: '#fff',
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(113, 106, 86, 0.1)'
      }}>
        <h1 style={{ 
          fontFamily: '"Playfair Display", serif',
          fontSize: '2rem',
          color: '#716a56',
          marginBottom: '16px'
        }}>
          Business Not Found
        </h1>
        <p style={{ color: '#666', marginBottom: '32px' }}>
          The profile you're looking for doesn't exist.
        </p>
        <a 
          href="https://thequilthub.com/pages/resource-hub"
          style={{
            display: 'inline-block',
            background: '#716a56',
            color: 'white',
            padding: '14px 32px',
            borderRadius: '50px',
            textDecoration: 'none',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            fontSize: '0.9rem'
          }}
        >
          Browse Directory
        </a>
      </div>
    );
  }
  
  const name = business['Resource/Business Name:'] || 'Business';
  const category = business['Resource Type/Category:'] || '';
  const location = business['Full Location (City, State/Province, Country):'] || '';
  const bio = business['Brief Description / Bio:'] || '';
  const photo = business['Logo or Profile Photo:'] || '';
  const website = business['Website URL (or Etsy/Blog):'] || '';
  const instagram = business['Instagram Handle:'] || '';
  const facebook = business['Facebook Page URL:'] || '';
  
  const shopifyUrl = `https://thequilthub.com/pages/business-profile?name=${encodeURIComponent(name)}`;
  
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            setTimeout(function() {
              window.location.href = "${shopifyUrl}";
            }, 2000);
          `
        }}
      />
      
      <div style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        margin: 0,
        padding: '24px',
        background: '#faf7f2',
        minHeight: '100vh'
      }}>
        <main style={{
          maxWidth: '800px',
          margin: '40px auto',
          background: '#ffffff',
          borderRadius: '24px',
          padding: '40px',
          boxShadow: '0 4px 20px rgba(113, 106, 86, 0.08)'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '32px'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #716a56',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 24px'
            }} />
            <style dangerouslySetInnerHTML={{
              __html: `
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `
            }} />
            <h2 style={{
              margin: 0,
              color: '#3c3424',
              fontSize: '1.5rem',
              fontWeight: '600'
            }}>
              Redirecting to TheQuiltHub...
            </h2>
            <p style={{
              color: '#6b6250',
              fontSize: '0.95rem',
              marginTop: '8px'
            }}>
              Taking you to {name}'s full profile
            </p>
          </div>
          
          {photo && (
            <div style={{
              textAlign: 'center',
              marginBottom: '24px'
            }}>
              <img 
                src={photo} 
                alt={name}
                style={{
                  maxWidth: '240px',
                  borderRadius: '16px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
                }}
              />
            </div>
          )}
          
          <h1 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: '2.5rem',
            fontWeight: '800',
            color: '#3c3424',
            margin: '0 0 12px',
            textAlign: 'center',
            lineHeight: '1.2'
          }}>
            {name}
          </h1>
          
          {(category || location) && (
            <p style={{
              textAlign: 'center',
              color: '#6b6250',
              fontSize: '1rem',
              margin: '0 0 20px'
            }}>
              {category && <strong>{category}</strong>}
              {category && location && ' • '}
              {location}
            </p>
          )}
          
          {bio && (
            <p style={{
              lineHeight: '1.8',
              color: '#4a4332',
              fontSize: '1.05rem',
              margin: '0 0 32px',
              textAlign: 'center'
            }}>
              {bio}
            </p>
          )}
          
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            justifyContent: 'center',
            marginBottom: '32px'
          }}>
            {website && (
              
                href={website.startsWith('http') ? website : `https://${website}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '10px 20px',
                  borderRadius: '999px',
                  background: '#716a56',
                  color: '#fff',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: '600'
                }}
              >
                🌐 Website
              </a>
            )}
            {instagram && (
              
                href={`https://instagram.com/${instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '10px 20px',
                  borderRadius: '999px',
                  background: '#e1306c',
                  color: '#fff',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: '600'
                }}
              >
                📷 Instagram
              </a>
            )}
            {facebook && (
              
                href={facebook.startsWith('http') ? facebook : `https://${facebook}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '10px 20px',
                  borderRadius: '999px',
                  background: '#1877f2',
                  color: '#fff',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: '600'
                }}
              >
                👥 Facebook
              </a>
            )}
          </div>
          
          <p style={{
            textAlign: 'center',
            fontSize: '0.9rem',
            color: '#6b6250',
            marginTop: '32px'
          }}>
            If you're not redirected automatically,{' '}
            <a 
              href={shopifyUrl}
              style={{
                color: '#716a56',
                fontWeight: 'bold',
                textDecoration: 'none'
              }}
            >
              click here
            </a>
            .
          </p>
        </main>
      </div>
    </>
  );
}
