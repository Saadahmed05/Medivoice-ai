import React from 'react';
import { motion } from 'framer-motion';
import { Mic, Globe, AlertTriangle, MapPin } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <Mic size={24} />,
      title: 'Voice First Interface',
      description: 'Speak your symptoms naturally. Our custom clinical-grade speech engine instantly transcribes and maps complex medical symptoms in real-time.',
      color: 'var(--color-primary)',
      gradient: 'rgba(6, 182, 212, 0.15)'
    },
    {
      icon: <Globe size={24} />,
      title: 'Multilingual Support',
      description: 'Consult in your native language. Breaking down linguistic barriers in medicine with instant translations and context preservation in 50+ languages.',
      color: 'var(--color-accent)',
      gradient: 'rgba(99, 102, 241, 0.15)'
    },
    {
      icon: <AlertTriangle size={24} />,
      title: 'Emergency Detection',
      description: 'Continuous risk assessment. The AI identifies high-severity symptoms and clinical warning flags, warning you instantly to seek urgent emergency care.',
      color: 'var(--color-danger)',
      gradient: 'rgba(244, 63, 94, 0.15)'
    },
    {
      icon: <MapPin size={24} />,
      title: 'Nearby Healthcare Access',
      description: 'Instant care routing. Automatically locates, ranks, and maps closest open pharmacies, urgent care facilities, and specialized hospitals.',
      color: 'var(--color-success)',
      gradient: 'rgba(16, 185, 129, 0.15)'
    }
  ];

  return (
    <section id="features" style={{ padding: '100px 0', position: 'relative' }}>
      {/* Decorative background blur */}
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '-10%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, rgba(0,0,0,0) 70%)',
        filter: 'blur(60px)',
        zIndex: -1,
        pointerEvents: 'none'
      }} />

      <div className="container">
        {/* Header Title */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 64px auto' }}>
          <span style={{
            fontSize: '0.85rem',
            fontWeight: '700',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--color-primary)',
            display: 'block',
            marginBottom: '12px'
          }}>
            Startup Capabilities
          </span>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            marginBottom: '20px',
            lineHeight: 1.15
          }}>
            Intelligent Care, <span className="text-gradient">Accessible Everywhere</span>
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
            MediVoice AI combines voice diagnostics, real-time natural language translation, and instant clinical routing into a single, seamless digital healthcare assistant.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="features-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px'
        }}>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="glass-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              {/* Feature Icon Container */}
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: feature.color,
                background: feature.gradient,
                border: `1px solid ${feature.color}33`,
                boxShadow: `0 8px 20px -6px ${feature.color}`
              }}>
                {feature.icon}
              </div>

              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: 'var(--text-primary)',
                letterSpacing: '-0.01em'
              }}>
                {feature.title}
              </h3>
              
              <p style={{
                fontSize: '0.95rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6
              }}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
