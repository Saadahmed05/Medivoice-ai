import React from 'react';
import { motion } from 'framer-motion';
import { Mic, Globe, AlertTriangle, MapPin } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <Mic size={24} />,
      title: '1. Verbal Intake',
      description: 'ASHA workers record symptoms in regional dialects directly on low-spec phones, removing literacy and typing barriers for patients.',
      color: 'var(--color-primary)',
      gradient: 'rgba(6, 182, 212, 0.15)'
    },
    {
      icon: <Globe size={24} />,
      title: '2. Dialect Translation',
      description: 'Context-aware speech translation maps colloquial, localized descriptions of pain into standard clinical English terminology instantly.',
      color: 'var(--color-accent)',
      gradient: 'rgba(99, 102, 241, 0.15)'
    },
    {
      icon: <AlertTriangle size={24} />,
      title: '3. Safety Overrides',
      description: 'Deterministic overrides bypass LLM logic for stroke, cardiovascular, respiratory, and environmental hazards to enforce clinical safety.',
      color: 'var(--color-danger)',
      gradient: 'rgba(244, 63, 94, 0.15)'
    },
    {
      icon: <MapPin size={24} />,
      title: '4. Referral Routing',
      description: 'Locates nearest open Public Health Centers (PHCs) and compiles structured clinical summaries to accelerate ER check-ins.',
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
            ASHA Worker Workflow
          </span>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            marginBottom: '20px',
            lineHeight: 1.15
          }}>
            Accredited Social Triage, <span className="text-gradient">Saving Lives in Seconds</span>
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
            HealthCompass combines voice dialect intake, context preservation, safety rules, and local care routing into a rugged public health utility.
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
