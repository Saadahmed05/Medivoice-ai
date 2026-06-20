import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    q: "Is HealthCompass a diagnostic tool or a replacement for doctors?",
    a: "No. HealthCompass is a clinical triage and routing assistant. It does not replace a doctor’s diagnosis; it helps community health workers and patients identify risk levels (Green/Amber/Red) and directs them to appropriate local care options (PHCs, urgent care, or ERs) to save lives and prevent system bottlenecks."
  },
  {
    q: "How does the system handle regional dialects and accents?",
    a: "Our dialect translation layer is trained on natural, verbal speech patterns and local idioms rather than formal text. By checking descriptions of symptoms in Telugu, Tamil, Hindi, and English, the engine maps colloquial terms directly to clinical definitions without losing context."
  },
  {
    q: "Are patient details and voice records secure?",
    a: "Absolutely. HealthCompass does not store patient voice recordings or transcripts on public servers. The system processes inputs securely in memory and compiles the clinical referral summary locally in the browser, protecting patient confidentiality and aligning with public health security standards."
  },
  {
    q: "What happens if there is no internet connection in a village?",
    a: "Safety is our priority. If the server is offline or running on slow networks, HealthCompass falls back to a local deterministic template mode based on the selected language, ensuring community workers still receive essential safety guidelines and facility details."
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
