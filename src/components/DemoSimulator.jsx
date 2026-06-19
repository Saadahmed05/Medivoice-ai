import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, ArrowRight, Play, Volume2, Globe, Heart, ShieldAlert, Sparkles, Navigation } from 'lucide-react';

const SAMPLES = {
  English: {
    speech: "I have a sudden sharp chest pain radiating to my left arm, and I'm struggling to breathe.",
    translation: "I have a sudden sharp chest pain radiating to my left arm, and I'm struggling to breathe.",
    analysis: "Potential Acute Coronary Syndrome (Myocardial Infarction warning). High risk.",
    severity: "emergency",
    clinics: "Mercy General Hospital (0.8 mi) - ER waiting room: 5 mins"
  },
  Spanish: {
    speech: "Tengo un dolor de cabeza muy fuerte desde ayer y siento náuseas con la luz.",
    translation: "I have a very severe headache since yesterday and feel nausea when exposed to light.",
    analysis: "Symptomatic Migraine with aura indicators. Moderate risk.",
    severity: "warning",
    clinics: "Apex Urgent Care Center (1.2 mi) - Open now"
  },
  Mandarin: {
    speech: "我喉咙痛，有点发烧，觉得全身酸痛没力气。",
    translation: "I have a sore throat, a mild fever, and feel body aches and fatigued all over.",
    analysis: "Acute Viral Syndrome (Common Cold / Early Influenza). Low risk.",
    severity: "safe",
    clinics: "Walgreens Pharmacy Clinician (0.4 mi) - Walk-ins welcome"
  },
  Arabic: {
    speech: "أشعر بألم شديد ومفاجئ في أسفل البطن من الجهة اليمنى مع غثيان.",
    translation: "I feel a severe and sudden pain in the lower right abdomen with nausea.",
    analysis: "Potential Acute Appendicitis warning signs. Immediate inspection recommended.",
    severity: "emergency",
    clinics: "Saint Jude Medical Center ER (2.1 mi) - ER waiting room: 12 mins"
  }
};

export default function DemoSimulator() {
  const [lang, setLang] = useState('English');
  const [state, setState] = useState('idle'); // idle -> listening -> translating -> analyzed
  const [typedSpeech, setTypedSpeech] = useState('');
  const [typedTranslation, setTypedTranslation] = useState('');

  const sample = SAMPLES[lang];

  useEffect(() => {
    setState('idle');
    setTypedSpeech('');
    setTypedTranslation('');
  }, [lang]);

  const startSimulation = () => {
    setState('listening');
    setTypedSpeech('');
    setTypedTranslation('');
    
    // Simulate Speech Recognition typing effect
    let speechText = sample.speech;
    let index = 0;
    const speechInterval = setInterval(() => {
      if (index < speechText.length) {
        setTypedSpeech((prev) => prev + speechText.charAt(index));
        index++;
      } else {
        clearInterval(speechInterval);
        
        // Wait 1 second, then transition to translating
        setTimeout(() => {
          setState('translating');
          
          // Simulate translation effect
          let transText = sample.translation;
          let transIndex = 0;
          const transInterval = setInterval(() => {
            if (transIndex < transText.length) {
              setTypedTranslation((prev) => prev + transText.charAt(transIndex));
              transIndex++;
            } else {
              clearInterval(transInterval);
              
              // Wait 1.2 seconds, then transition to analyzed
              setTimeout(() => {
                setState('analyzed');
              }, 1200);
            }
          }, 15);
        }, 1000);
      }
    }, 20);
  };

  return (
    <section id="demo" className="responsive-demo" style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="container">
        <div className="demo-layout" style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '60px',
          alignItems: 'center'
        }}>
          {/* Left copy */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <span style={{
              fontSize: '0.85rem',
              fontWeight: '700',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-primary)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <Sparkles size={14} /> Interactive Experience
            </span>
            
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              fontWeight: 800,
              lineHeight: 1.15
            }}>
              Test the AI <br />
              <span className="text-gradient">Voice Triage System</span>
            </h2>
            
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
              Experience how MediVoice AI listens, transcribes, translates, and analyzes medical urgency instantly. Pick a language below and simulate a patient speaking.
            </p>

            {/* Language Selector */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '8px' }}>
              {Object.keys(SAMPLES).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  style={{
                    background: lang === l ? 'rgba(6, 182, 212, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid',
                    borderColor: lang === l ? 'var(--color-primary)' : 'var(--glass-border)',
                    color: lang === l ? 'var(--text-primary)' : 'var(--text-secondary)',
                    padding: '8px 18px',
                    borderRadius: '10px',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Globe size={14} /> {l}
                </button>
              ))}
            </div>

            <div style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '12px',
              padding: '16px',
              fontSize: '0.9rem',
              color: 'var(--text-muted)'
            }}>
              <strong>Sample symptom:</strong> "{sample.speech}"
            </div>
          </div>

          {/* Right interactive panel */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="glass-panel" style={{
              width: '100%',
              maxWidth: '480px',
              padding: '28px',
              borderRadius: '24px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              {/* App Topbar */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: '16px',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                marginBottom: '20px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
                  <span style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-secondary)' }}>MEDIVOICE ENGINE ACTIVE</span>
                </div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Lat: 1.2s</span>
              </div>

              {/* Main Display screen */}
              <div style={{
                background: 'rgba(5, 8, 20, 0.4)',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '16px',
                padding: '20px',
                minHeight: '260px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                marginBottom: '24px',
                position: 'relative'
              }}>
                {state === 'idle' && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, gap: '16px', color: 'var(--text-muted)' }}>
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.02)',
                      padding: '16px',
                      borderRadius: '50%',
                      border: '1px solid rgba(255,255,255,0.05)'
                    }}>
                      <Mic size={32} />
                    </div>
                    <p style={{ fontSize: '0.9rem', textAlign: 'center' }}>Click the button below to simulate voice recording</p>
                  </div>
                )}

                {/* Simulated Transcript Waveform (Listening state) */}
                {state === 'listening' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary)', fontSize: '0.8rem', fontWeight: '600' }}>
                      <span className="blink-dot" /> RECORDING CLINICAL SPEECH ({lang})
                    </div>
                    <div style={{ display: 'flex', gap: '4px', height: '30px', alignItems: 'center', margin: '8px 0' }}>
                      {[15, 30, 45, 20, 10, 50, 40, 20, 35, 10, 40, 55, 25, 15, 45, 10].map((h, i) => (
                        <motion.div
                          key={i}
                          style={{ width: '3px', background: 'var(--color-primary)', borderRadius: '1px' }}
                          animate={{ height: [`${h/2}px`, `${h}px`, `${h/2}px`] }}
                          transition={{ duration: 0.8 + (i % 2) * 0.2, repeat: Infinity }}
                        />
                      ))}
                    </div>
                    <div style={{ fontSize: '1rem', fontStyle: 'italic', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                      {typedSpeech}
                      <span className="cursor" />
                    </div>
                  </div>
                )}

                {/* Translating / Analyzing State */}
                {(state === 'translating' || state === 'analyzed') && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
                    {/* Native Speech Box */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-muted)' }}>ORIGINAL SPEECH ({lang})</span>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{sample.speech}</p>
                    </div>

                    {/* Translation Box */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                      background: 'rgba(6, 182, 212, 0.05)',
                      padding: '12px',
                      borderRadius: '8px',
                      borderLeft: '2px solid var(--color-primary)'
                    }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Volume2 size={12} /> CLINICAL TRANSLATION (English)
                      </span>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontStyle: 'italic' }}>
                        {typedTranslation}
                        {state === 'translating' && <span className="cursor" />}
                      </p>
                    </div>

                    {/* AI Diagnostic Output */}
                    {state === 'analyzed' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '12px',
                          borderTop: '1px solid rgba(255,255,255,0.06)',
                          paddingTop: '16px'
                        }}
                      >
                        {/* Urgent Alert Banner */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          fontSize: '0.85rem',
                          fontWeight: '600',
                          background: sample.severity === 'emergency' ? 'rgba(244, 63, 94, 0.1)' : sample.severity === 'warning' ? 'rgba(234, 179, 8, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                          border: '1px solid',
                          borderColor: sample.severity === 'emergency' ? 'rgba(244, 63, 94, 0.2)' : sample.severity === 'warning' ? 'rgba(234, 179, 8, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                          color: sample.severity === 'emergency' ? 'var(--color-danger)' : sample.severity === 'warning' ? '#f59e0b' : 'var(--color-success)',
                        }}>
                          <ShieldAlert size={16} />
                          <span>
                            {sample.severity === 'emergency' ? 'RED CRITICAL EMERGENCY ALERT' : sample.severity === 'warning' ? 'AMBER MODERATE ALERT' : 'GREEN ASSIGNED CARE LEVEL'}
                          </span>
                        </div>

                        {/* Analysis info */}
                        <div>
                          <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-muted)' }}>AI CLINICAL SYNTHESIS</span>
                          <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', marginTop: '4px' }}>{sample.analysis}</p>
                        </div>

                        {/* Nearby Clinic Map Integration */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '8px',
                          background: 'rgba(255,255,255,0.02)',
                          padding: '10px',
                          borderRadius: '8px',
                          border: '1px solid rgba(255,255,255,0.05)'
                        }}>
                          <Navigation size={14} style={{ marginTop: '2px', color: 'var(--color-primary)' }} />
                          <div>
                            <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-muted)' }}>NEAREST OPTIMIZED CARE</span>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginTop: '2px' }}>{sample.clinics}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}
              </div>

              {/* Action Button */}
              <button
                onClick={startSimulation}
                disabled={state === 'listening' || state === 'translating'}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: state === 'listening' || state === 'translating' ? 'rgba(255,255,255,0.05)' : 'var(--grad-hero)',
                  border: 'none',
                  color: '#ffffff',
                  padding: '14px',
                  borderRadius: '12px',
                  fontWeight: '600',
                  cursor: state === 'listening' || state === 'translating' ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s',
                  boxShadow: state === 'listening' || state === 'translating' ? 'none' : '0 4px 15px rgba(6, 182, 212, 0.3)'
                }}
              >
                {state === 'idle' && (
                  <>
                    <Mic size={18} /> Speak Sample Symptom
                  </>
                )}
                {state === 'listening' && (
                  <>
                    <span className="spinning-loader" /> Capturing Voice...
                  </>
                )}
                {state === 'translating' && (
                  <>
                    <span className="spinning-loader" style={{ borderColor: 'var(--color-accent) transparent transparent transparent' }} /> Processing Triage...
                  </>
                )}
                {state === 'analyzed' && (
                  <>
                    <Mic size={18} /> Test Another Language
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .responsive-demo {
          padding: 50px 0;
        }
        .demo-layout {
          grid-template-columns: 1fr;
        }
        @media (min-width: 768px) {
          .responsive-demo {
            padding: 100px 0;
          }
        }
        @media (min-width: 992px) {
          .demo-layout {
            grid-template-columns: 1fr 1fr;
          }
        }
        .blink-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--color-primary);
          animation: blink 1s infinite alternate;
        }
        @keyframes blink {
          0% { opacity: 0.3; }
          100% { opacity: 1; }
        }
        .cursor {
          display: inline-block;
          width: 2px;
          height: 15px;
          background: var(--color-primary);
          margin-left: 2px;
          animation: blink 0.8s infinite;
        }
        .spinning-loader {
          width: 16px;
          height: 16px;
          border: 2px solid transparent;
          border-top: 2px solid #fff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
      `}</style>
    </section>
  );
}
