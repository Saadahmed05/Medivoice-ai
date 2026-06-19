import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Menu, X, Globe } from 'lucide-react';

export default function Navbar({ onStartAssessment }) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Interactive Demo', href: '#demo' },
    { name: 'Trust & Privacy', href: '#trust' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <motion.header
      className="glass-panel responsive-navbar"
      style={{
        position: 'sticky',
        margin: '0 auto',
        maxWidth: '1240px',
        zIndex: 100,
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
      }}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Logo */}
      <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '800', fontSize: '1.3rem', fontFamily: 'var(--font-heading)' }}>
        <div style={{
          background: 'var(--grad-hero)',
          width: '38px',
          height: '38px',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 15px rgba(6, 182, 212, 0.4)'
        }}>
          <Mic size={20} color="#fff" />
        </div>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          MediVoice <span className="text-gradient" style={{ fontSize: '0.8rem', fontWeight: '600', border: '1px solid rgba(6, 182, 212, 0.3)', padding: '2px 6px', borderRadius: '6px', background: 'rgba(6, 182, 212, 0.05)' }}>AI</span>
        </span>
      </a>

      {/* Desktop Links */}
      <nav style={{ display: 'none', gap: '32px', alignItems: 'center' }} className="desktop-nav">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            style={{
              fontSize: '0.95rem',
              fontWeight: '500',
              color: 'var(--text-secondary)',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
            onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
          >
            {link.name}
          </a>
        ))}
      </nav>

      {/* Action Buttons */}
      <div style={{ display: 'none', alignItems: 'center', gap: '16px' }} className="desktop-actions">
        <a href="#demo" className="btn btn-secondary" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
          <Globe size={14} /> Try Multilingual
        </a>
        <button onClick={onStartAssessment} className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.85rem', border: 'none' }}>
          Start Assessment
        </button>
      </div>

      {/* Mobile Menu Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'block',
          background: 'none',
          border: 'none',
          color: 'var(--text-primary)',
          cursor: 'pointer',
        }}
        className="mobile-toggle"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              top: '80px',
              left: '0',
              right: '0',
              background: 'rgba(11, 17, 44, 0.95)',
              border: '1px solid var(--glass-border)',
              backdropFilter: 'blur(20px)',
              borderRadius: '16px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
              zIndex: 99
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                style={{
                  fontSize: '1.1rem',
                  fontWeight: '500',
                  color: 'var(--text-secondary)',
                  paddingBottom: '8px',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                {link.name}
              </a>
            ))}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
              <a href="#demo" onClick={() => setIsOpen(false)} className="btn btn-secondary" style={{ width: '100%' }}>
                <Globe size={16} /> Try Multilingual
              </a>
              <button onClick={(e) => { setIsOpen(false); onStartAssessment(e); }} className="btn btn-primary" style={{ width: '100%', border: 'none' }}>
                Start Assessment
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive Styles Injection */}
      <style>{`
        .responsive-navbar {
          top: 12px;
          left: 12px;
          right: 12px;
          height: 64px;
          padding: 0 16px;
        }
        @media (min-width: 768px) {
          .responsive-navbar {
            top: 20px;
            left: 20px;
            right: 20px;
            height: 70px;
            padding: 0 24px;
          }
          .desktop-nav { display: flex !important; }
          .desktop-actions { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </motion.header>
  );
}
