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

      {/* Problem & Why Existing Solutions Fail */}
      <section id="problem" style={{ padding: '80px 0', borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'relative' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '48px',
            alignItems: 'start'
          }} className="demo-layout">
            {/* Left: The Problem */}
            <div className="glass-card" style={{ padding: '32px', borderRadius: '24px', background: 'rgba(10, 15, 38, 0.4)' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-danger)', display: 'block', marginBottom: '12px' }}>
                The Last Mile Challenge
              </span>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '20px', lineHeight: 1.2 }}>
                The Diagnostics Gap at the Rural Frontier
              </h2>
              <p style={{ marginBottom: '20px', fontSize: '1.05rem', lineHeight: 1.6 }}>
                In low-resource settings, primary health centers are scarce, and the doctor-to-patient ratio is severely lopsided.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ background: 'rgba(244, 63, 94, 0.1)', color: 'var(--color-danger)', padding: '6px', borderRadius: '8px', fontWeight: 'bold' }}>01</div>
                  <div>
                    <h4 style={{ fontWeight: '700', color: '#fff' }}>The Literacy Constraint</h4>
                    <p style={{ fontSize: '0.9rem' }}>Traditional digital tools rely on text inputs, immediately alienating non-literate and elderly patients.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ background: 'rgba(244, 63, 94, 0.1)', color: 'var(--color-danger)', padding: '6px', borderRadius: '8px', fontWeight: 'bold' }}>02</div>
                  <div>
                    <h4 style={{ fontWeight: '700', color: '#fff' }}>The Dialect Barrier</h4>
                    <p style={{ fontSize: '0.9rem' }}>Patients describe pain using regional idioms. When a patient says "burning in the chest" in Telugu, standard translators miss the active cardiac urgency.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ background: 'rgba(244, 63, 94, 0.1)', color: 'var(--color-danger)', padding: '6px', borderRadius: '8px', fontWeight: 'bold' }}>03</div>
                  <div>
                    <h4 style={{ fontWeight: '700', color: '#fff' }}>Delayed Referrals</h4>
                    <p style={{ fontSize: '0.9rem' }}>Without objective triage, community health workers struggle to distinguish mild issues from emergencies, causing critical transit delays.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Why Existing Fail */}
            <div className="glass-card" style={{ padding: '32px', borderRadius: '24px', background: 'rgba(10, 15, 38, 0.4)', border: '1px solid rgba(244, 63, 94, 0.2)' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-primary)', display: 'block', marginBottom: '12px' }}>
                Systemic Bottlenecks
              </span>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '20px', lineHeight: 1.2 }}>
                Why Existing Solutions Fail
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <h4 style={{ fontWeight: '700', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-danger)' }} />
                    Telemedicine Assumes Connectivity
                  </h4>
                  <p style={{ fontSize: '0.95rem', marginTop: '4px' }}>High-bandwidth video consultations fail in low-network rural corridors where patients actually live.</p>
                </div>
                <div>
                  <h4 style={{ fontWeight: '700', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-danger)' }} />
                    Symptom Checkers Assume English Literacy
                  </h4>
                  <p style={{ fontSize: '0.95rem', marginTop: '4px' }}>Dropdown menus and checkboxes do not fit the fluid, verbal way rural patients describe physiological pain.</p>
                </div>
                <div>
                  <h4 style={{ fontWeight: '700', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-danger)' }} />
                    Pure AI Models Lack Safety Guardrails
                  </h4>
                  <p style={{ fontSize: '0.95rem', marginTop: '4px' }}>Large language models hallucinate clinical classifications. An AI must never guess when a patient presents with crushing chest pain.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Laxmi: The Last Mile Story */}
      <section id="story" style={{ padding: '80px 0', borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'relative' }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.05) 0%, rgba(0,0,0,0) 70%)',
          zIndex: -1,
          pointerEvents: 'none'
        }} />
        <div className="container" style={{ maxWidth: '900px' }}>
          <div className="glass-card" style={{ padding: '48px 40px', borderRadius: '32px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(11, 17, 44, 0.6) 0%, rgba(5, 8, 20, 0.8) 100%)', border: '1px solid rgba(6, 182, 212, 0.15)' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-primary)', display: 'block', marginBottom: '16px' }}>
              Human Impact Story
            </span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '24px', lineHeight: 1.15 }}>
              Meet Laxmi: The Last Mile
            </h2>
            <p style={{ fontSize: '1.15rem', lineHeight: 1.7, color: 'var(--text-primary)', fontStyle: 'italic', marginBottom: '24px' }}>
              "Laxmi is a 58-year-old agricultural worker in rural Andhra Pradesh. Yesterday evening, she felt a squeezing heaviness in her chest. She thought it was indigestion. Without a vehicle and 12km from the nearest clinic, she chose to wait it out."
            </p>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '32px' }}>
              By morning, she was too weak to stand. An Accredited Social Health Activist (ASHA) worker visited her, opened HealthCompass, and recorded Laxmi's description in native Telugu. The engine instantly recognized a coronary override, bypassed the AI, flagged a critical emergency, and generated a clinical summary. Laxmi was transported and treated within the golden hour.
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: 'rgba(6, 182, 212, 0.08)', border: '1px solid rgba(6, 182, 212, 0.2)', padding: '8px 20px', borderRadius: '9999px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-success)' }} />
              <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#22d3ee' }}>Patient Saved • Treated in 54 Mins</span>
            </div>
          </div>
        </div>
      </section>

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
              Bridge the last mile. <span className="text-gradient">Save the golden hour.</span>
            </h2>
            
            <p style={{
              fontSize: '1.1rem',
              color: 'var(--text-secondary)',
              maxWidth: '540px',
              margin: '0 auto'
            }}>
              Deploy HealthCompass in your district, clinic, or NGO network. Protect your community with voice-first triage.
            </p>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              justifyContent: 'center',
              marginTop: '12px'
            }}>
              <button onClick={startAssessment} className="btn btn-primary" style={{ fontSize: '1.05rem', padding: '14px 36px', border: 'none' }}>
                Launch Triage Portal <ArrowRight size={18} />
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
