import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    q: "How accurate is MediVoice AI's clinical triage?",
    a: "MediVoice AI utilizes a custom speech-to-text pipeline trained on thousands of hours of diverse medical accents and terms, achieving a 99.2% clinical transcription rate. Our triage logic is calibrated against the Emergency Severity Index (ESI) standard to ensure warning flags are correctly categorized."
  },
  {
    q: "Is my medical voice data encrypted and secure?",
    a: "Absolutely. Security is central to our infrastructure. All audio inputs and transcripts are protected by TLS 1.3 in transit and AES-256 at rest. We do not sell or store patient data, and our cloud database complies fully with HIPAA, SOC2 Type II, and GDPR."
  },
  {
    q: "Which languages and dialects are supported?",
    a: "We currently support 50+ languages and dialects. This includes Spanish, Mandarin, Cantonese, Arabic, Hindi, Tagalog, French, Vietnamese, and Portuguese. Accent tolerance is built-in to prevent misdiagnosis due to regional variations."
  },
  {
    q: "Can MediVoice AI diagnose diseases or replace a physician?",
    a: "No. MediVoice AI is a triage assistant, not a diagnostic system. It translates, summarizes symptoms, and alerts users of clinical risks, directing them to appropriate local care options (ER, urgent care, primary care, pharmacy). It does not replace professional medical advice."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (idx) => {
    setActiveIndex(activeIndex === idx ? null : idx);
  };

  return (
    <section id="faq" style={{ padding: '100px 0', position: 'relative' }}>
      {/* Glow ambient background element */}
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '-10%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(6, 182, 212, 0.05) 0%, rgba(0,0,0,0) 70%)',
        filter: 'blur(50px)',
        zIndex: -1,
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ maxWidth: '800px' }}>
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span style={{
            fontSize: '0.85rem',
            fontWeight: '700',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--color-accent)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '12px'
          }}>
            <HelpCircle size={14} /> Common Inquiries
          </span>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 2.6rem)',
            fontWeight: 800
          }}>
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
        </div>

        {/* Accordions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {FAQS.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <div
                key={index}
                className="glass-panel"
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: isOpen ? '1px solid rgba(6, 182, 212, 0.3)' : '1px solid var(--glass-border)',
                  background: isOpen ? 'rgba(11, 17, 44, 0.6)' : 'var(--glass-bg)',
                  transition: 'all 0.3s'
                }}
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggle(index)}
                  style={{
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    padding: '20px 24px',
                    textAlign: 'left',
                    color: 'var(--text-primary)',
                    fontSize: '1.05rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px'
                  }}
                >
                  <span>{faq.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    style={{ display: 'inline-flex', color: isOpen ? 'var(--color-primary)' : 'var(--text-secondary)' }}
                  >
                    <ChevronDown size={20} />
                  </motion.span>
                </button>

                {/* Accordion Body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{
                        padding: '0 24px 20px 24px',
                        color: 'var(--text-secondary)',
                        fontSize: '0.95rem',
                        lineHeight: 1.6,
                        borderTop: '1px solid rgba(255, 255, 255, 0.04)',
                        paddingTop: '16px'
                      }}>
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
