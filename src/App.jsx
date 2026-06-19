import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustIndicators from './components/TrustIndicators';
import Features from './components/Features';
import DemoSimulator from './components/DemoSimulator';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import AssessmentFlow from './components/AssessmentFlow';
import { Mic, ArrowRight } from 'lucide-react';

export default function App() {
  const [showAssessment, setShowAssessment] = useState(false);

  const startAssessment = (e) => {
    if (e) e.preventDefault();
    setShowAssessment(true);
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* Dynamic ambient backgrounds */}
      <div className="bg-ambient">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      {/* Navigation */}
      <Navbar onStartAssessment={startAssessment} />

      {/* Hero Header */}
      <Hero onStartAssessment={startAssessment} />

      {/* Clinical Proof / Stats / Badges */}
      <TrustIndicators />

      {/* Feature Capabilities Grid */}
      <Features />

      {/* Interactive Simulator widget */}
      <DemoSimulator />

      {/* Accordion FAQ */}
      <FAQ />

      {/* High-Impact CTA Conversion Section */}
      <section style={{ padding: '80px 0 120px 0', position: 'relative' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <motion.div
            className="glass-card"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              padding: '60px 40px',
              borderRadius: '32px',
              textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(11, 17, 44, 0.8) 0%, rgba(5, 8, 20, 0.95) 100%)',
              border: '1px solid rgba(6, 182, 212, 0.2)',
              boxShadow: '0 40px 80px -20px rgba(0, 0, 0, 0.8), 0 0 50px rgba(6, 182, 212, 0.05)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '24px',
              overflow: 'hidden'
            }}
          >
            {/* CTA Ambient Glow inside card */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '400px',
              height: '400px',
              background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, rgba(0,0,0,0) 70%)',
              zIndex: -1,
              pointerEvents: 'none'
            }} />

            {/* Glowing Icon */}
            <div style={{
              background: 'var(--grad-hero)',
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 25px rgba(6, 182, 212, 0.4)',
              color: '#fff'
            }}>
              <Mic size={28} />
            </div>

            <h2 style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 800,
              maxWidth: '680px',
              lineHeight: 1.15
            }}>
              Ready to break language barriers in <span className="text-gradient">healthcare?</span>
            </h2>
            
            <p style={{
              fontSize: '1.1rem',
              color: 'var(--text-secondary)',
              maxWidth: '540px',
              margin: '0 auto'
            }}>
              Start your health assessment now in your native language or integrate our multilingual clinical APIs.
            </p>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              justifyContent: 'center',
              marginTop: '12px'
            }}>
              <button onClick={startAssessment} className="btn btn-primary" style={{ fontSize: '1.05rem', padding: '14px 36px', border: 'none' }}>
                Launch Assessment <ArrowRight size={18} />
              </button>
              <a href="#trust" className="btn btn-secondary" style={{ fontSize: '1.05rem', padding: '14px 36px' }}>
                View Clinical Security
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Conditional Fullscreen Voice Assessment Modal */}
      {showAssessment && (
        <AssessmentFlow onClose={() => setShowAssessment(false)} />
      )}
    </div>
  );
}
