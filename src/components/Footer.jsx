import React from 'react';
import { Mic, ArrowRight, ShieldCheck, Mail } from 'lucide-react';

export default function Footer() {
  const links = [
    {
      title: 'Product',
      items: [
        { name: 'Symptom Engine', href: '#' },
        { name: 'Multilingual API', href: '#' },
        { name: 'Security Features', href: '#' },
        { name: 'Developer SDK', href: '#' }
      ]
    },
    {
      title: 'Company',
      items: [
        { name: 'About Us', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Press Kit', href: '#' },
        { name: 'Security & Trust', href: '#' }
      ]
    },
    {
      title: 'Resources',
      items: [
        { name: 'Clinical Studies', href: '#' },
        { name: 'Integration Guide', href: '#' },
        { name: 'Developer Portal', href: '#' },
        { name: 'Help Center', href: '#' }
      ]
    }
  ];

  return (
    <footer style={{
      background: 'rgba(5, 8, 20, 0.95)',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '80px 0 40px 0',
      position: 'relative',
      zIndex: 10
    }}>
      <div className="container">
        <div className="footer-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '48px',
          marginBottom: '60px'
        }}>
          {/* Logo & Newsletter */}
          <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '24px' }} className="footer-brand">
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '800', fontSize: '1.25rem', fontFamily: 'var(--font-heading)' }}>
              <div style={{
                background: 'var(--grad-hero)',
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 10px rgba(6, 182, 212, 0.3)'
              }}>
                <Mic size={16} color="#fff" />
              </div>
              <span>HealthCompass <span className="text-gradient" style={{ fontSize: '0.75rem', fontWeight: '600' }}>ASHA</span></span>
            </a>
            
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', maxWidth: '300px' }}>
              Voice-first clinical triage for the last mile of healthcare.
            </p>

            {/* Micro newsletter */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '320px' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Subscribe to our Clinical updates
              </label>
              <div style={{ display: 'flex', gap: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', padding: '6px', borderRadius: '10px' }}>
                <input
                  type="email"
                  placeholder="Enter email"
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '8px 12px',
                    color: '#fff',
                    outline: 'none',
                    fontSize: '0.85rem',
                    flex: 1
                  }}
                />
                <button style={{
                  background: 'var(--grad-hero)',
                  border: 'none',
                  color: '#fff',
                  cursor: 'pointer',
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Links columns */}
          {links.map((col, index) => (
            <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-primary)' }}>
                {col.title}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {col.items.map((item, i) => (
                  <li key={i}>
                    <a
                      href={item.href}
                      style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', transition: 'color 0.2s' }}
                      onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
                      onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Medical disclaimer panel */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.01)',
          border: '1px solid rgba(255,255,255,0.04)',
          borderRadius: '16px',
          padding: '20px 24px',
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
          lineHeight: 1.6,
          marginBottom: '40px'
        }}>
          <span style={{ fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
            Clinical Safety Disclaimer
          </span>
          HealthCompass provides healthcare accessibility guidance and informational triage support. It does not provide medical diagnoses, active treatment prescriptions, or definitive clinical instructions. If you are experiencing a severe or life-threatening medical emergency, please contact your local emergency services (like 108 or 911) or go to the nearest emergency room immediately.
        </div>

        {/* Bottom copyright */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: '32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '0.85rem',
          color: 'var(--text-muted)'
        }}>
          <span>&copy; {new Date().getFullYear()} HealthCompass. All rights reserved.</span>
          <div style={{ display: 'flex', gap: '24px' }}>
            <a href="#" style={{ transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>Privacy Policy</a>
            <a href="#" style={{ transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>Terms of Service</a>
            <a href="#" style={{ transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>Cookie Settings</a>
          </div>
        </div>
      </div>

      <style>{`
        .footer-grid {
          grid-template-columns: 1fr;
        }
        @media (min-width: 768px) {
          .footer-grid {
            grid-template-columns: repeat(5, 1fr);
          }
          .footer-brand {
            grid-column: span 2 !important;
          }
        }
      `}</style>
    </footer>
  );
}
