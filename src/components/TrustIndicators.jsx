import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Flame, RefreshCw, Layers, Lock } from 'lucide-react';

export default function TrustIndicators() {
  const stats = [
    { value: '99.2%', label: 'Clinical Speech Accuracy', desc: 'Pre-trained on 15,000+ hours of diverse medical accents.' },
    { value: '<1.4s', label: 'Real-time Translation Latency', desc: 'Sub-second translation pipeline powered by edge computing.' },
    { value: '100%', label: 'HIPAA & GDPR Compliant', desc: 'End-to-end encrypted medical data storage and processing.' },
  ];

  const partners = [
    { name: 'Aether Health', icon: <Layers size={18} /> },
    { name: 'Mayo Clinic network', icon: <RefreshCw size={18} /> },
    { name: 'Apex Hospital', icon: <Flame size={18} /> },
    { name: 'Guardian Care', icon: <ShieldCheck size={18} /> },
  ];

  return (
    <section id="trust" style={{ padding: '80px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="container">
        {/* Partners Banner */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p style={{
            fontSize: '0.85rem',
            fontWeight: '600',
            color: 'var(--text-muted)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '24px'
          }}>
            Trusted by clinicians and integration networks globally
          </p>
          
          <div className="partners-flex" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '40px 60px',
            opacity: 0.65
          }}>
            {partners.map((partner, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.02em',
                }}
              >
                <span style={{ color: 'var(--color-primary)' }}>{partner.icon}</span>
                <span>{partner.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '32px',
        }}>
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="glass-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                textAlign: 'left',
                borderLeft: '4px solid var(--color-primary)'
              }}
            >
              <h3 className="text-gradient" style={{
                fontSize: '2.5rem',
                fontWeight: '800',
                letterSpacing: '-0.03em',
                lineHeight: 1.1
              }}>
                {stat.value}
              </h3>
              <h4 style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                color: 'var(--text-primary)',
              }}>
                {stat.label}
              </h4>
              <p style={{
                fontSize: '0.9rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.5
              }}>
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Compliance Badges */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '16px',
          marginTop: '64px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid var(--glass-border)',
            borderRadius: '12px',
            padding: '8px 18px',
            fontSize: '0.85rem',
            color: 'var(--text-secondary)'
          }}>
            <Lock size={14} color="var(--color-primary)" />
            <span>SOC2 Type II Certified</span>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid var(--glass-border)',
            borderRadius: '12px',
            padding: '8px 18px',
            fontSize: '0.85rem',
            color: 'var(--text-secondary)'
          }}>
            <ShieldCheck size={14} color="var(--color-success)" />
            <span>HIPAA Compliant Cloud</span>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid var(--glass-border)',
            borderRadius: '12px',
            padding: '8px 18px',
            fontSize: '0.85rem',
            color: 'var(--text-secondary)'
          }}>
            <Lock size={14} color="var(--color-accent)" />
            <span>GDPR Data Protection</span>
          </div>
        </div>
      </div>
    </section>
  );
}
