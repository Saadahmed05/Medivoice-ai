import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Shield, Activity, Star } from 'lucide-react';

export default function Hero({ onStartAssessment }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="responsive-hero" style={{
      position: 'relative',
      minHeight: 'calc(100vh - 120px)',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden'
    }}>
      {/* Decorative Blur Backlights */}
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '-5%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, rgba(0,0,0,0) 70%)',
        filter: 'blur(50px)',
        zIndex: -1,
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="hero-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '60px',
          alignItems: 'center'
        }}>
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
          >
            {/* Startup Tagline */}
            <motion.div
              variants={itemVariants}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(6, 182, 212, 0.08)',
                border: '1px solid rgba(6, 182, 212, 0.2)',
                borderRadius: '9999px',
                padding: '6px 16px',
                width: 'fit-content',
                alignSelf: 'flex-start'
              }}
            >
              <Star size={14} fill="#06b6d4" color="#06b6d4" />
              <span style={{ fontSize: '0.85rem', fontWeight: '600', letterSpacing: '0.05em', color: '#22d3ee', textTransform: 'uppercase' }}>
                Next-Gen Healthcare AI
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
                lineHeight: 1.05,
                fontWeight: 800,
                color: 'var(--text-primary)',
                letterSpacing: '-0.03em'
              }}
            >
              Your Voice.<br />
              Your Health.<br />
              <span className="text-gradient">Your Language.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={itemVariants}
              style={{
                fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
                color: 'var(--text-secondary)',
                maxWidth: '540px',
                fontWeight: 400,
                lineHeight: 1.6
              }}
            >
              Speak your symptoms and receive instant, secure healthcare guidance in your native language. Powered by clinical-grade AI.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '16px',
                marginTop: '8px'
              }}
            >
              <button onClick={onStartAssessment} className="btn btn-primary" style={{ fontSize: '1.05rem', padding: '14px 32px', border: 'none' }}>
                Start Assessment <ArrowRight size={18} />
              </button>
              <a href="#demo" className="btn btn-secondary" style={{ fontSize: '1.05rem', padding: '14px 32px' }}>
                <Play size={16} fill="currentColor" /> Watch 2-Min Demo
              </a>
            </motion.div>

            {/* Micro Trust Indicators */}
            <motion.div
              variants={itemVariants}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
                marginTop: '16px',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                paddingTop: '24px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Shield size={18} color="#10b981" />
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '500' }}>HIPAA Compliant</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Activity size={18} color="#06b6d4" />
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '500' }}>99.2% Translation Accuracy</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Visual (Floating dashboard mockup) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%'
            }}
          >
            {/* Ambient Background Glow behind illustration */}
            <div style={{
              position: 'absolute',
              width: '110%',
              height: '110%',
              background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, rgba(0,0,0,0) 65%)',
              zIndex: -1,
              filter: 'blur(30px)'
            }} />

            {/* Glowing Orbit Rings */}
            <div style={{
              position: 'absolute',
              border: '1px dashed rgba(255,255,255,0.05)',
              borderRadius: '50%',
              width: '120%',
              height: '120%',
              pointerEvents: 'none',
              animation: 'spin 120s linear infinite'
            }} />

            {/* Main Interactive Floating Glass Card */}
            <div
              className="glass-card floating-element"
              style={{
                width: '100%',
                maxWidth: '600px',
                padding: '12px',
                background: 'rgba(10, 15, 38, 0.6)',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                boxShadow: '0 30px 60px -15px rgba(0,0,0,0.8), 0 0 50px rgba(6, 182, 212, 0.1)',
                borderRadius: '24px'
              }}
            >
              {/* Image with backup glowing wave if image doesn't load */}
              <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(5, 8, 20, 0.4)' }}>
                <img
                  src="/dashboard_mockup.png"
                  alt="MediVoice AI Dashboard Mockup"
                  onError={(e) => {
                    // Fallback to beautiful CSS waveform representation if image file doesn't exist yet
                    e.target.style.display = 'none';
                    document.getElementById('waveform-fallback').style.display = 'flex';
                  }}
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    borderRadius: '16px',
                  }}
                />
                
                {/* Fallback component */}
                <div
                  id="waveform-fallback"
                  style={{
                    display: 'none',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '24px',
                    width: '100%',
                    padding: '48px 24px',
                    height: '350px',
                  }}
                >
                  <div style={{
                    background: 'rgba(6, 182, 212, 0.05)',
                    border: '1px solid rgba(6, 182, 212, 0.2)',
                    padding: '12px 24px',
                    borderRadius: '12px',
                    fontSize: '0.9rem',
                    color: '#22d3ee',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 0 20px rgba(6, 182, 212, 0.15)'
                  }}>
                    <Activity size={16} className="pulse-icon" /> AI VOICE TRANSLATOR IN ACTION
                  </div>
                  
                  {/* Waveform Lines */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', height: '60px', width: '100%', justifyContent: 'center' }}>
                    {[20, 40, 15, 60, 80, 45, 90, 30, 75, 40, 85, 20, 50, 10, 65, 30, 80, 45, 20].map((h, i) => (
                      <motion.div
                        key={i}
                        style={{
                          width: '4px',
                          background: i % 2 === 0 ? 'var(--color-primary)' : 'var(--color-accent)',
                          borderRadius: '2px',
                          boxShadow: '0 0 8px currentColor'
                        }}
                        animate={{ height: [`${h / 2}px`, `${h}px`, `${h / 2}px`] }}
                        transition={{
                          duration: 1 + (i % 3) * 0.2,
                          repeat: Infinity,
                          ease: 'easeInOut'
                        }}
                      />
                    ))}
                  </div>

                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center', maxWidth: '320px' }}>
                    Speak naturally. The AI translates Spanish, Mandarin, Arabic, and 50+ languages instantly.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .responsive-hero {
          padding: 40px 0 60px 0;
        }
        .hero-grid {
          grid-template-columns: 1fr;
        }
        @media (min-width: 768px) {
          .responsive-hero {
            padding: 80px 0 120px 0;
          }
        }
        @media (min-width: 992px) {
          .hero-grid {
            grid-template-columns: 1.1fr 0.9fr;
          }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .pulse-icon {
          animation: pulse 1.5s infinite alternate ease-in-out;
        }
        @keyframes pulse {
          0% { opacity: 0.6; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1.05); }
        }
      `}</style>
    </section>
  );
}
