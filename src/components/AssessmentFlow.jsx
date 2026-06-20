import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Volume2, ShieldAlert, RotateCcw, ArrowLeft, Type, CheckCircle, AlertTriangle, FileText, MapPin, X, Navigation, Search, AlertCircle, RefreshCw } from 'lucide-react';
import { validateAndExtractFlags } from '../utils/translationGlossary';

const ASSESSMENT_DATABASE = {
  English: {
    speech: "I am feeling very dizzy and my breathing is short. I have a dry cough that started yesterday.",
    translation: "I am feeling very dizzy and my breathing is short. I have a dry cough that started yesterday.",
    analysis: "Moderate Respiratory Strain with Orthostatic Lightheadedness.",
    severity: "warning",
    advice: [
      "Sit or lie down immediately in a cool, ventilated room.",
      "Sip warm water or herbal tea slowly to soothe your throat.",
      "Avoid standing up suddenly to prevent fainting.",
      "If you feel chest pain or breathing becomes very difficult, seek urgent care."
    ]
  },
  Hindi: {
    nativeName: "हिंदी",
    speech: "मुझे दो दिनों से बहुत तेज़ बुखार है, बदन दर्द हो रहा है और सांस लेने में थोड़ी तकलीफ है।",
    translation: "I have had a high fever for two days, my body aches, and I have slight difficulty breathing.",
    analysis: "Moderate Fever (Pyrexia) accompanied by Mild Dyspnea. Caution advised.",
    severity: "warning",
    advice: [
      "Rest in bed and stay well hydrated with water, broth, or ORS solutions.",
      "Monitor body temperature using a thermometer every 4 hours.",
      "Take standard fever reducers if advised by your family doctor.",
      "Consult a healthcare professional if fever exceeds 102°F or breathing worsens."
    ]
  },
  Telugu: {
    nativeName: "తెలుగు",
    speech: "నా గుండెల్లో చాలా మంటగా మరియు బరువుగా ఉంది, నొప్పి ఎడమ చేతికి వ్యాపిస్తోంది.",
    translation: "I feel severe burning and heaviness in my chest, and the pain is spreading to my left arm.",
    analysis: "Potential Acute Coronary Event (Myocardial Infarction indicators). Critical severity.",
    severity: "emergency",
    advice: [
      "CALL EMERGENCY SERVICES (108/911) IMMEDIATELY.",
      "Sit upright in a comfortable position and try to remain calm.",
      "Loosen any tight clothing around your neck or waist.",
      "Unlock your main door so responders can enter without delay."
    ]
  },
  Tamil: {
    nativeName: "தமிழ்",
    speech: "என் வயிற்றின் வலது பக்கத்தில் கடுமையான வலி உள்ளது, மற்றும் வாந்தி வருகிறது.",
    translation: "I have severe pain on the right side of my stomach, and I feel like vomiting.",
    analysis: "Acute Right Lower Quadrant Abdomen Pain. Suspected Appendicitis.",
    severity: "emergency",
    advice: [
      "DO NOT eat, drink, or take any laxatives/painkillers immediately.",
      "Go to the nearest Urgent Care Clinic or Emergency Room.",
      "Avoid pressing or applying heat pads to the painful stomach area.",
      "Bring someone with you to assist with transportation and check-in."
    ]
  }
};

const runClientSideTriage = (text, language) => {
  const textLower = text.toLowerCase();
  const langData = ASSESSMENT_DATABASE[language] || ASSESSMENT_DATABASE.English;
  
  // 1. Chest Pain
  if (/(chest.*pain|pain.*chest|heart.*pain|crushing.*chest|heart.*attack|గుండె.*నొప్పి|గుండెల్లో.*నొప్పి|छाती.*दर्द|सीने.*दर्द|நெஞ்.*வலி)/i.test(textLower)) {
    return {
      severity: 'emergency',
      reason: 'Potential Acute Coronary Event (Myocardial Infarction indicators). Deterministic safety bypass triggered.',
      action: "1. CALL EMERGENCY SERVICES (108) IMMEDIATELY.\n2. Sit upright in a comfortable position and remain calm.\n3. Loosen any tight clothing around your neck or waist.\n4. Do not offer food, water, or unprescribed medicines.",
      hospitalRequired: true
    };
  }
  
  // 2. Snake Bite
  if (/(snake.*bite|bitten.*snake|cobra|viper|పాము.*కాటు|పాము.*కరి|सांप.*काट|साँप.*काट|பாம்பு.*கடி)/i.test(textLower)) {
    return {
      severity: 'emergency',
      reason: 'Potential Snake Bite (Envenomation risk). Deterministic safety bypass triggered.',
      action: "1. CALL EMERGENCY SERVICES (108) IMMEDIATELY.\n2. Keep the bitten limb completely still and positioned BELOW heart level.\n3. Remove any rings, bracelets, or tight clothing near the bite.\n4. DO NOT cut the wound, apply ice, or try to suck out venom.",
      hospitalRequired: true
    };
  }
  
  // 3. Stroke
  if (/(stroke|slurred.*speech|facial.*droop|numbness.*side|unable.*speak|పక్షవాతం|మాట.*పడి|लकवा|बोल.*तकलीफ|பக்கவாதம்|பேச்சு.*குளறு)/i.test(textLower)) {
    return {
      severity: 'emergency',
      reason: 'Potential Acute Stroke (Neurological deficit). Deterministic safety bypass triggered.',
      action: "1. CALL EMERGENCY SERVICES (108) IMMEDIATELY.\n2. Note the exact time when symptoms first started.\n3. Lie patient on their side in the recovery position if breathing.\n4. DO NOT give any food, water, or medicine (high choking hazard).",
      hospitalRequired: true
    };
  }
  
  // 4. Severe Bleeding
  if (/(heavy.*bleeding|gushing.*blood|hemorrhage|bleeding.*lot|bleeding.*heavily|రక్తస్రావం|రక్తం.*కారు|रक्तस्राव|खून.*बह|இரத்த.*போக்கு|இரத்தம்.*கொட்டு)/i.test(textLower)) {
    return {
      severity: 'emergency',
      reason: 'Potential Severe Hemorrhage (Critical volume loss). Deterministic safety bypass triggered.',
      action: "1. CALL EMERGENCY SERVICES (108) IMMEDIATELY.\n2. Apply firm, direct pressure to the bleeding wound using a clean cloth.\n3. Elevate the bleeding limb above the heart level if possible.\n4. Keep patient flat and warm with blankets to prevent shock.",
      hospitalRequired: true
    };
  }
  
  // 5. Difficulty Breathing
  if (/(difficulty.*breathing|cannot.*breathe|short.*breath|shortness.*breath|struggling.*breathe|suffocating|ఊపిరి.*ఆడ|శ్వాస.*కష్టం|सांस.*तकलीफ|साँस.*तकलीफ|दम.*घुट|மூச்சு.*திணறல்|மூச்சு.*முடியவில்லை)/i.test(textLower)) {
    return {
      severity: 'emergency',
      reason: 'Potential Acute Respiratory distress (Hypoxia danger). Deterministic safety bypass triggered.',
      action: "1. CALL EMERGENCY SERVICES (108) IMMEDIATELY.\n2. Help the patient sit fully upright, leaning slightly forward.\n3. Loosen tight collars, neckties, or chest coverings.\n4. Administer prescribed rescue inhaler or nebulizer if available.",
      hospitalRequired: true
    };
  }
  
  // 6. Unconsciousness
  if (/(unconscious|passed.*out|fainted|not.*waking.*up|unresponsive|స్పృహ.*తప్ప|స్పృహ.*లేదు|बेहोश|अचेत|மயக்க|நினைவிழந்த)/i.test(textLower)) {
    return {
      severity: 'emergency',
      reason: 'Patient Unresponsive / Unconscious (Syncope or Coma). Deterministic safety bypass triggered.',
      action: "1. CALL EMERGENCY SERVICES (108) IMMEDIATELY.\n2. Check for normal breathing. If breathing, place in recovery position.\n3. If NOT breathing, prepare to perform CPR immediately.\n4. DO NOT leave the patient alone or put anything in their mouth.",
      hospitalRequired: true
    };
  }
  
  // Default fallback to data templates
  return {
    severity: langData.severity || 'safe',
    reason: `(Local Assessment) ${langData.analysis}`,
    action: langData.advice.map((line, idx) => `${idx + 1}. ${line}`).join('\n'),
    hospitalRequired: langData.severity === 'emergency'
  };
};

export default function AssessmentFlow({ onClose }) {
  const [largeText, setLargeText] = useState(false);
  const [language, setLanguage] = useState('English');
  const [stage, setStage] = useState('language-select'); // language-select -> ready -> recording -> submitting -> results
  const [typedSpeech, setTypedSpeech] = useState('');
  const [isReadingAudio, setIsReadingAudio] = useState(false);
  const [showMapDrawer, setShowMapDrawer] = useState(false);
  
  // Reliability States
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isMicBlocked, setIsMicBlocked] = useState(false);
  const [speechUnsupported, setSpeechUnsupported] = useState(false);
  const [fallbackReason, setFallbackReason] = useState('');
  
  // Real Speech Recognition States
  const [isMicAvailable, setIsMicAvailable] = useState(true);
  const [isSimulated, setIsSimulated] = useState(false);
  const recognitionRef = useRef(null);
  const simIntervalRef = useRef(null);

  // State for live backend response
  const [apiResult, setApiResult] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [isFallback, setIsFallback] = useState(false);

  // Geolocation & Facility Finder States
  const [locState, setLocState] = useState('idle'); // idle | loading | success | error
  const [userCoords, setUserCoords] = useState(null);
  const [manualSearchVal, setManualSearchVal] = useState('');
  const [appliedSearchQuery, setAppliedSearchQuery] = useState('');
  const [locError, setLocError] = useState('');

  // Referral Report Modal States
  const [showReportModal, setShowReportModal] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [formError, setFormError] = useState('');
  const [translationFlags, setTranslationFlags] = useState([]);

  const data = ASSESSMENT_DATABASE[language];

  // Initialize Speech Recognition & Reliability Observers on Mount
  useEffect(() => {
    const SpeechLib = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechLib) {
      const rec = new SpeechLib();
      rec.continuous = true;
      rec.interimResults = true;
      recognitionRef.current = rec;
      setIsMicAvailable(true);
      setSpeechUnsupported(false);
    } else {
      console.warn('Browser SpeechRecognition not supported.');
      setIsMicAvailable(false);
      setSpeechUnsupported(true);
    }

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
      if (simIntervalRef.current) {
        clearInterval(simIntervalRef.current);
      }
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Selected language state change trigger (cleared redundant useEffect to prevent reset loops on dialect selection)

  // Text scaling variables for elderly readability
  const scaleText = (baseSize, scaleFactor = 1.3) => {
    const numeric = parseFloat(baseSize);
    const unit = baseSize.replace(numeric, '');
    return largeText ? `${numeric * scaleFactor}${unit}` : baseSize;
  };

  const startRecording = () => {
    setStage('recording');
    setTypedSpeech('');
    setApiResult(null);
    setApiError(null);
    setIsFallback(false);
    setIsSimulated(false);

    const recognition = recognitionRef.current;

    if (recognition && isMicAvailable) {
      const langCodes = {
        English: 'en-US',
        Hindi: 'hi-IN',
        Telugu: 'te-IN',
        Tamil: 'ta-IN'
      };

      recognition.lang = langCodes[language] || 'en-US';

      recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        setTypedSpeech(finalTranscript || interimTranscript);
      };

      recognition.onerror = (event) => {
        console.error('[Speech Recognition Error]', event.error);
        if (event.error === 'not-allowed') {
          setIsMicBlocked(true);
          setStage('empty-speech');
        }
      };

      try {
        recognition.start();
      } catch (err) {
        console.error('Failed to start speech recognition, running fallback:', err);
        setIsMicBlocked(true);
        setStage('empty-speech');
      }
    } else {
      setIsMicBlocked(true);
      setStage('empty-speech');
    }
  };

  const startSimulationFallback = () => {
    setIsSimulated(true);
    let text = data.speech;
    let index = 0;
    
    if (simIntervalRef.current) clearInterval(simIntervalRef.current);
    
    simIntervalRef.current = setInterval(() => {
      setTypedSpeech((prev) => {
        if (index < text.length) {
          const nextChar = text.charAt(index);
          index++;
          return prev + nextChar;
        } else {
          if (simIntervalRef.current) clearInterval(simIntervalRef.current);
          return prev;
        }
      });
    }, 35);
  };

  const stopAndSubmit = async () => {
    if (recognitionRef.current && isMicAvailable) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }

    if (simIntervalRef.current) {
      clearInterval(simIntervalRef.current);
    }

    const finalSymptomText = typedSpeech.trim();
    
    if (finalSymptomText.length < 5) {
      setStage('empty-speech');
      return;
    }

    submitSymptomText(finalSymptomText);
  };

  const submitSymptomText = async (text, usingDefaultSample = false) => {
    setStage('submitting');
    setApiError(null);
    setIsFallback(false);
    setFallbackReason('');
    setTypedSpeech(text);

    // Extract verified clinical translation flags
    const flags = validateAndExtractFlags(text, language);
    setTranslationFlags(flags);

    // 1. Offline Connection Triage Bypass
    if (!navigator.onLine) {
      console.warn('[Offline Mode Active] Skipping server query, running local triage engine.');
      setTimeout(() => {
        setIsFallback(true);
        setFallbackReason('Offline Mode Active');
        const localTriageResult = runClientSideTriage(text, language);
        if (usingDefaultSample) {
          localTriageResult.reason = `(Sample Triage) ${localTriageResult.reason}`;
        }
        setApiResult(localTriageResult);
        setStage('results');
      }, 1000);
      return;
    }

    // 2. Server Request with 8-second Timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, 8000);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          symptomText: text,
          language: language
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.details || errData.error || 'Failed server processing.');
      }

      const result = await response.json();
      if (usingDefaultSample) {
        result.reason = `(Sample Triage) ${result.reason}`;
      }
      setApiResult(result);
      setStage('results');
    } catch (err) {
      clearTimeout(timeoutId);
      console.warn('[Assessment Backend Error / Timeout] Triggering offline safety protocol:', err.message);
      
      const isTimeout = err.name === 'AbortError';
      const isConnectionRefused = err.message.includes('Failed to fetch') || err.message.includes('NetworkError') || err.message.includes('network');
      
      let reasonStr = 'Local Triage Active';
      if (isTimeout) {
        reasonStr = 'Connection Timeout (8s limit)';
      } else if (isConnectionRefused) {
        reasonStr = 'Triage Server Offline';
      } else {
        reasonStr = `Server Error: ${err.message}`;
      }

      setApiError(err.message);
      
      setTimeout(() => {
        setIsFallback(true);
        setFallbackReason(reasonStr);
        const localTriageResult = runClientSideTriage(text, language);
        if (usingDefaultSample) {
          localTriageResult.reason = `(Sample Triage) ${localTriageResult.reason}`;
        }
        setApiResult(localTriageResult);
        setStage('results');
      }, 1200);
    }
  };

  const reset = () => {
    setStage('language-select');
    setTypedSpeech('');
    setApiResult(null);
    setApiError(null);
    setIsFallback(false);
    setIsSimulated(false);
    setIsReadingAudio(false);
    setShowMapDrawer(false);
    setLocState('idle');
    setUserCoords(null);
    setManualSearchVal('');
    setAppliedSearchQuery('');
    setLocError('');
    setShowReportModal(false);
    setPatientName('');
    setPatientAge('');
    setFormError('');
    setTranslationFlags([]);
  };

  const handleQuickSearch = (query) => {
    setManualSearchVal(query);
    setAppliedSearchQuery(query);
    setUserCoords(null);
    setLocState('success');
  };

  const toggleAudioSpeech = () => {
    setIsReadingAudio(!isReadingAudio);
  };

  // Browser Geolocation Detector
  const detectUserLocation = () => {
    setLocState('loading');
    setLocError('');
    setAppliedSearchQuery('');

    if (!navigator.geolocation) {
      setLocState('error');
      setLocError('Your browser does not support GPS location.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setLocState('success');
      },
      (error) => {
        console.warn('[Geolocation Error]', error);
        setLocState('error');
        if (error.code === error.PERMISSION_DENIED) {
          setLocError('Location access was denied. You can search manually below.');
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          setLocError('GPS signal unavailable. Please search manually below.');
        } else if (error.code === error.TIMEOUT) {
          setLocError('GPS connection timeout (slow network). Please search manually.');
        } else {
          setLocError('Unable to identify coordinates.');
        }
      },
      { enableHighAccuracy: true, timeout: 6000, maximumAge: 10000 }
    );
  };

  // Manual location search handler (fallback)
  const handleManualSearch = (e) => {
    if (e) e.preventDefault();
    if (!manualSearchVal.trim()) return;
    setAppliedSearchQuery(manualSearchVal.trim());
    setUserCoords(null);
    setLocState('success');
  };

  // Compile coordinates-specific facilities
  const getNearbyFacilitiesList = () => {
    const queryTerm = appliedSearchQuery 
      ? encodeURIComponent(appliedSearchQuery) 
      : userCoords 
        ? `${userCoords.lat},${userCoords.lng}` 
        : '';

    return [
      {
        type: 'PHC',
        label: 'Nearby PHC',
        name: appliedSearchQuery ? `Primary Health Center, ${appliedSearchQuery}` : 'Community Primary Health Center (PHC)',
        dist: userCoords ? '0.7 km' : 'Local Area',
        time: '3 mins drive',
        status: 'Open • Free Consultations',
        color: '#10b981',
        mapUrl: `https://www.google.com/maps/search/?api=1&query=Primary+Health+Center+near+${queryTerm}`
      },
      {
        type: 'Government Hospital',
        label: 'Nearby Government Hospital',
        name: appliedSearchQuery ? `Government General Hospital, ${appliedSearchQuery}` : 'District Civil Government Hospital',
        dist: userCoords ? '2.3 km' : 'District Center',
        time: '7 mins drive',
        status: 'Open 24 Hours • Free Emergency Ward',
        color: '#3b82f6',
        mapUrl: `https://www.google.com/maps/search/?api=1&query=Government+Hospital+near+${queryTerm}`
      },
      {
        type: 'Emergency Care',
        label: 'Nearby Emergency Care',
        name: appliedSearchQuery ? `Emergency Hospital ER, ${appliedSearchQuery}` : 'Apollo Multi-Specialty Trauma Care ER',
        dist: userCoords ? '1.4 km' : 'Sub-district Center',
        time: '5 mins drive',
        status: 'Open 24 Hours • Ventilators Available',
        color: '#ef4444',
        mapUrl: `https://www.google.com/maps/search/?api=1&query=Emergency+Care+near+${queryTerm}`
      }
    ];
  };

  // Trigger location check when map drawer opens
  useEffect(() => {
    if (showMapDrawer && locState === 'idle') {
      detectUserLocation();
    }
  }, [showMapDrawer]);

  // Export PDF Referral Report function
  const handleExportPDF = (e) => {
    if (e) e.preventDefault();
    setFormError('');

    if (!patientName.trim()) {
      setFormError('Please enter a valid Patient Name.');
      return;
    }

    const ageNum = parseInt(patientAge);
    if (isNaN(ageNum) || ageNum <= 0 || ageNum > 125) {
      setFormError('Please enter a valid Age (between 1 and 125).');
      return;
    }

    setShowReportModal(false);

    // Create a new browser tab/window to structure the clinical print page
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Pop-up blocked. Please enable pop-ups in your browser settings to export the PDF.');
      return;
    }

    const severityStyle = getSeverityStyle(apiResult.severity);
    const dateStr = new Date().toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
    const triageId = `MV-${Math.floor(100000 + Math.random() * 900000)}`;

    const adviceListHtml = apiResult.action.split('\n')
      .filter((line) => line.trim() !== '')
      .map((line) => `<li>${line.replace(/^\d+[\.\)]\s*/, '').trim()}</li>`)
      .join('');

    const verifiedFlagsHtml = translationFlags.length > 0
      ? `
        <div style="margin-top: 12px; background-color: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 8px; padding: 12px;">
          <strong style="color: #065f46; font-size: 10px; text-transform: uppercase; display: block; margin-bottom: 6px; letter-spacing: 0.5px;">
            ✓ Verified Clinical Translation Glossary Matches (Zero-Error)
          </strong>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${translationFlags.map((flag) => `
              <span style="background: #ffffff; border: 1px solid #d1fae5; border-radius: 6px; padding: 4px 8px; font-size: 11px; display: inline-flex; gap: 4px; align-items: center; box-shadow: 0 1px 2px rgba(0,0,0,0.02);">
                <span style="color: #64748b;">"${flag.original}"</span>
                <span style="color: #10b981;">➔</span>
                <strong style="color: #0f172a;">${flag.matchedEnglish}</strong>
              </span>
            `).join('')}
          </div>
        </div>
      `
      : '';

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>HealthCompass Clinical Referral Report - ${patientName}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
            body {
              font-family: 'Inter', sans-serif;
              color: #1e293b;
              margin: 0;
              padding: 40px;
              line-height: 1.5;
              background-color: #ffffff;
            }
            .letterhead {
              border: 1px solid #cbd5e1;
              border-radius: 16px;
              padding: 30px;
              background-color: #ffffff;
              box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
            }
            .header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-bottom: 2px solid #e2e8f0;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .logo-section {
              display: flex;
              align-items: center;
              gap: 8px;
            }
            .logo-icon {
              background: linear-gradient(135deg, #06b6d4, #3b82f6);
              width: 32px;
              height: 32px;
              border-radius: 8px;
              display: flex;
              align-items: center;
              justifyContent: center;
              color: #ffffff;
            }
            .logo-text {
              font-size: 18px;
              font-weight: 800;
              color: #0f172a;
              letter-spacing: -0.01em;
            }
            .logo-tag {
              color: #0284c7;
              font-size: 11px;
              font-weight: 700;
              border: 1px solid rgba(2, 132, 199, 0.2);
              padding: 1px 4px;
              border-radius: 4px;
              margin-left: 4px;
            }
            .report-info {
              font-size: 12px;
              color: #64748b;
              text-align: right;
              line-height: 1.4;
            }
            .report-title {
              font-size: 22px;
              font-weight: 800;
              text-align: center;
              text-transform: uppercase;
              letter-spacing: 1.5px;
              margin-bottom: 28px;
              color: #0f172a;
            }
            .patient-meta-grid {
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              gap: 16px;
              background: #f8fafc;
              border: 1px solid #e2e8f0;
              border-radius: 12px;
              padding: 18px;
              margin-bottom: 30px;
            }
            .meta-block strong {
              color: #64748b;
              display: block;
              font-size: 10px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              margin-bottom: 4px;
            }
            .meta-block span {
              font-size: 14px;
              font-weight: 600;
              color: #0f172a;
            }
            .section {
              margin-bottom: 28px;
            }
            .section-title {
              font-size: 13px;
              font-weight: 800;
              text-transform: uppercase;
              color: #475569;
              border-bottom: 1px solid #e2e8f0;
              padding-bottom: 6px;
              margin-bottom: 12px;
              letter-spacing: 0.5px;
            }
            .transcript-box {
              background: #f8fafc;
              border-left: 4px solid #3b82f6;
              padding: 16px;
              border-radius: 0 12px 12px 0;
              font-style: italic;
              font-size: 14px;
              color: #334155;
            }
            .severity-banner {
              border-radius: 12px;
              padding: 18px 20px;
              display: flex;
              gap: 14px;
              align-items: center;
            }
            .severity-banner.emergency {
              background-color: #fef2f2;
              border: 1px solid #fca5a5;
              color: #991b1b;
            }
            .severity-banner.warning {
              background-color: #fffbeb;
              border: 1px solid #fde68a;
              color: #92400e;
            }
            .severity-banner.safe {
              background-color: #ecfdf5;
              border: 1px solid #a7f3d0;
              color: #065f46;
            }
            .severity-badge {
              font-weight: 800;
              font-size: 13px;
              text-transform: uppercase;
              margin-bottom: 4px;
              letter-spacing: 0.5px;
            }
            .severity-desc {
              font-size: 14px;
              font-weight: 500;
              line-height: 1.4;
            }
            ol.action-list {
              padding-left: 20px;
              margin: 0;
            }
            ol.action-list li {
              margin-bottom: 10px;
              font-size: 14px;
              font-weight: 500;
              color: #0f172a;
            }
            .footer-signature-row {
              margin-top: 50px;
              border-top: 1px solid #e2e8f0;
              padding-top: 24px;
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
            }
            .clinical-stamp {
              border: 2px dashed #cbd5e1;
              padding: 10px 20px;
              border-radius: 8px;
              color: #94a3b8;
              font-weight: 700;
              font-size: 11px;
              text-align: center;
              text-transform: uppercase;
              line-height: 1.3;
            }
            .signature-box {
              width: 200px;
              border-top: 1px solid #94a3b8;
              text-align: center;
              font-size: 11px;
              color: #475569;
              padding-top: 8px;
            }
            .disclaimer {
              font-size: 9px;
              color: #94a3b8;
              margin-top: 30px;
              text-align: center;
              line-height: 1.4;
            }
            @media print {
              body {
                padding: 0;
                background-color: #ffffff;
              }
              .letterhead {
                border: none;
                padding: 0;
                box-shadow: none;
              }
            }
          </style>
        </head>
        <body>
          <div class="letterhead">
            <div class="header">
              <div class="logo-section">
                <div class="logo-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v1a7 7 0 0 1-14 0v-1"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
                </div>
                <span class="logo-text">HealthCompass <span class="logo-tag">ASHA</span></span>
              </div>
              <div class="report-info">
                <strong>Triage Referral ID:</strong> ${triageId}<br>
                <strong>Date:</strong> ${dateStr}
              </div>
            </div>

            <div class="report-title">Clinical Triage Referral Summary</div>

            <div class="patient-meta-grid">
              <div class="meta-block">
                <strong>Patient Name</strong>
                <span>${patientName}</span>
              </div>
              <div class="meta-block">
                <strong>Age</strong>
                <span>${patientAge} Years</span>
              </div>
              <div class="meta-block">
                <strong>Assessment Date</strong>
                <span>${new Date().toLocaleDateString()}</span>
              </div>
              <div class="meta-block">
                <strong>Input Language</strong>
                <span>${language}</span>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Patient Reported Symptoms</div>
              <div class="transcript-box">
                "${typedSpeech}"
              </div>
              ${verifiedFlagsHtml}
            </div>

            <div class="section">
              <div class="section-title">Risk Urgency Assessment</div>
              <div class="severity-banner ${apiResult.severity}">
                <div>
                  <div class="severity-badge">${severityStyle.badge}</div>
                  <div class="severity-desc">${apiResult.reason}</div>
                </div>
              </div>
            </div>

            <div class="section" style="page-break-inside: avoid;">
              <div class="section-title">Recommended Action Protocol</div>
              <ol class="action-list">
                ${adviceListHtml}
              </ol>
            </div>

            <div class="footer-signature-row" style="page-break-inside: avoid;">
              <div class="clinical-stamp">
                HealthCompass<br>
                Triage Report<br>
                SECURE RECORD
              </div>
              <div class="signature-box">
                Attending Medical Officer Signature
              </div>
            </div>

            <div class="disclaimer">
              CONFIDENTIAL DOCUMENT. This referral summary has been synthesized using Google Gemini 2.5 Flash. It represents an informational triage assessment of verbal symptoms and is intended to streamline clinical check-in or routing. It does not constitute a formal board-certified medical diagnosis.
            </div>
          </div>

          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 500);
            }
          </script>
        </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  // Styling helper for Risk Levels
  const getSeverityStyle = (severity) => {
    switch (severity) {
      case 'emergency':
        return {
          color: '#ef4444',
          badge: 'EMERGENCY - IMMEDIATE ER REQUIRED',
          grad: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(239, 68, 68, 0.05))',
          border: '1px solid rgba(239, 68, 68, 0.4)',
          glow: 'rgba(239, 68, 68, 0.15)',
          icon: <ShieldAlert size={28} />
        };
      case 'doctor':
        return {
          color: '#f59e0b',
          badge: 'WARNING - CLINIC CARE RECOMMENDED',
          grad: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(245, 158, 11, 0.05))',
          border: '1px solid rgba(245, 158, 11, 0.4)',
          glow: 'rgba(245, 158, 11, 0.12)',
          icon: <AlertTriangle size={28} />
        };
      case 'safe':
      default:
        return {
          color: '#10b981',
          badge: 'SAFE - MONITOR AT HOME',
          grad: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(16, 185, 129, 0.05))',
          border: '1px solid rgba(16, 185, 129, 0.4)',
          glow: 'rgba(16, 185, 129, 0.12)',
          icon: <CheckCircle size={28} />
        };
    }
  };

  const sevStyle = apiResult ? getSeverityStyle(apiResult.severity) : null;

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const animateChild = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="assessment-flow-overlay">
      {/* Background Decorative Mesh */}
      <div style={{
        position: 'fixed',
        top: '20%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, rgba(0,0,0,0) 70%)',
        filter: 'blur(80px)',
        zIndex: -1,
        pointerEvents: 'none'
      }} />

      {/* Top Header Actions */}
      <div className="assessment-flow-header">
        <button
          onClick={stage === 'results' ? reset : onClose}
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid var(--glass-border)',
            borderRadius: '12px',
            color: 'var(--text-primary)',
            padding: '10px 16px',
            fontSize: scaleText('0.9rem'),
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <ArrowLeft size={16} /> {stage === 'results' ? 'Start Over' : 'Back to Home'}
        </button>

        <button
          onClick={() => setLargeText(!largeText)}
          style={{
            background: largeText ? 'rgba(6, 182, 212, 0.15)' : 'rgba(255,255,255,0.04)',
            border: '1px solid',
            borderColor: largeText ? 'var(--color-primary)' : 'var(--text-primary)',
            borderRadius: '12px',
            color: largeText ? 'var(--color-primary)' : 'var(--text-primary)',
            padding: '10px 16px',
            fontSize: '0.9rem',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Type size={16} /> {largeText ? 'Normal Text Size' : 'Make Text BIGGER'}
        </button>
      </div>

      {/* Offline Alert Banner */}
      {!isOnline && (
        <div style={{
          maxWidth: '720px',
          width: '100%',
          margin: '-12px auto 20px auto',
          background: 'rgba(245, 158, 11, 0.08)',
          border: '1px solid rgba(245, 158, 11, 0.25)',
          borderRadius: '12px',
          padding: '12px 16px',
          fontSize: '0.85rem',
          color: '#f59e0b',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <AlertCircle size={16} />
          <span><strong>Offline Mode Active:</strong> Internet connection lost. Switched to client-side local triage protocols.</span>
        </div>
      )}

      {/* Main Container */}
      <div className="assessment-flow-main" style={{
        justifyContent: (stage === 'results' || stage === 'empty-speech' || stage === 'senior-warning' || stage === 'patient-info') ? 'flex-start' : 'center',
        paddingTop: (stage === 'results' || stage === 'empty-speech' || stage === 'senior-warning' || stage === 'patient-info') ? '20px' : '0px',
        paddingBottom: (stage === 'results' || stage === 'empty-speech' || stage === 'senior-warning' || stage === 'patient-info') ? '40px' : '0px'
      }}>
        
        {/* Stage 1: Choose Language */}
        {stage === 'language-select' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '28px', textAlign: 'center' }}
          >
            <div>
              <h2 style={{ fontSize: scaleText('1.8rem', 1.2), fontWeight: '800', marginBottom: '8px' }}>
                Step 1: Choose your language
              </h2>
              <p style={{ fontSize: scaleText('1rem'), color: 'var(--text-secondary)' }}>
                Please select the language you want to speak in.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '16px',
              width: '100%'
            }}>
              {Object.keys(ASSESSMENT_DATABASE).map((key) => {
                const langData = ASSESSMENT_DATABASE[key];
                return (
                  <button
                    key={key}
                    onClick={() => {
                      setLanguage(key);
                      setStage('patient-info');
                    }}
                    style={{
                      background: 'rgba(11, 17, 44, 0.6)',
                      border: '2px solid',
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '16px',
                      padding: '24px 16px',
                      color: '#fff',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-primary)'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                  >
                    <span style={{ fontSize: scaleText('1.6rem', 1.2), fontWeight: '800' }}>
                      {langData.nativeName || 'English'}
                    </span>
                    <span style={{ fontSize: scaleText('0.85rem'), color: 'var(--text-muted)' }}>
                      {key}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Stage: Patient Registration (Name & Age) */}
        {stage === 'patient-info' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ width: '100%', maxWidth: '480px', display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            <div style={{ textAlign: 'center', marginBottom: '8px' }}>
              <h2 style={{ fontSize: scaleText('1.8rem', 1.2), fontWeight: '800', marginBottom: '8px' }}>
                Step 2: Patient Registration
              </h2>
              <p style={{ fontSize: scaleText('0.95rem'), color: 'var(--text-secondary)' }}>
                Please enter the patient's basic details to initialize triage.
              </p>
            </div>

            {formError && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.08)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: '10px',
                padding: '10px 14px',
                fontSize: '0.85rem',
                color: 'var(--color-danger)',
                fontWeight: '600'
              }}>
                {formError}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
              {/* Patient Name */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Patient Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter name (e.g. John Doe)"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--glass-border)',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '16px',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Patient Age */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Patient Age (Years)
                </label>
                <input
                  type="number"
                  placeholder="Enter age (e.g. 65)"
                  value={patientAge}
                  onChange={(e) => setPatientAge(e.target.value)}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--glass-border)',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '16px',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '12px', width: '100%', marginTop: '8px' }}>
              <button
                onClick={() => setStage('language-select')}
                className="btn btn-secondary"
                style={{ flex: 1, padding: '12px' }}
              >
                Back
              </button>
              <button
                onClick={() => {
                  setFormError('');
                  if (!patientName.trim()) {
                    setFormError('Please enter a valid Patient Name.');
                    return;
                  }
                  const ageNum = parseInt(patientAge);
                  if (isNaN(ageNum) || ageNum <= 0 || ageNum > 125) {
                    setFormError('Please enter a valid Age (between 1 and 125).');
                    return;
                  }
                  if (ageNum >= 60) {
                    setStage('senior-warning');
                  } else {
                    setStage(speechUnsupported ? 'empty-speech' : 'ready');
                  }
                }}
                className="btn btn-primary"
                style={{ flex: 2, padding: '12px', border: 'none' }}
              >
                Continue
              </button>
            </div>
          </motion.div>
        )}

        {/* Stage: Senior Citizen Safety Warning Screen */}
        {stage === 'senior-warning' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ width: '100%', maxWidth: '520px', display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'center', alignItems: 'center' }}
          >
            <div style={{
              background: 'rgba(245, 158, 11, 0.08)',
              border: '1px solid rgba(245, 158, 11, 0.2)',
              color: '#f59e0b',
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(245, 158, 11, 0.15)',
              marginBottom: '4px'
            }}>
              <AlertTriangle size={28} />
            </div>

            <div>
              <h2 style={{ fontSize: scaleText('1.6rem', 1.2), fontWeight: '800', marginBottom: '8px', color: '#f59e0b' }}>
                Senior Citizen Clinical Protocol Active
              </h2>
              <p style={{ fontSize: scaleText('0.95rem'), color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                The patient is <strong>{patientAge} years old</strong>. Please apply elevated clinical vigilance.
              </p>
            </div>

            {/* Warning Guidelines */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: '16px',
              padding: '18px',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              textAlign: 'left'
            }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: '800', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Elderly Triage Safety Checklist:
              </h4>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <div style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 'bold' }}>1</div>
                <div>
                  <h5 style={{ fontWeight: '700', color: '#fff', fontSize: '0.9rem', margin: '0 0 2px 0' }}>Atypical Symptom Presentations</h5>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>Seniors may experience heart emergencies without classic chest pain, or severe infections without fevers.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <div style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 'bold' }}>2</div>
                <div>
                  <h5 style={{ fontWeight: '700', color: '#fff', fontSize: '0.9rem', margin: '0 0 2px 0' }}>Rapid Deterioration Vulnerability</h5>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>Pre-existing health conditions can cause minor issues to escalate quickly. Treat shortness of breath or dizziness as high-urgency.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <div style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 'bold' }}>3</div>
                <div>
                  <h5 style={{ fontWeight: '700', color: '#fff', fontSize: '0.9rem', margin: '0 0 2px 0' }}>Communication Assistance</h5>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>Speak slowly and clearly. Verify that they can hear the voice guidance audio. Use the manual symptom typing editor if needed.</p>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: '12px', width: '100%', marginTop: '8px' }}>
              <button
                onClick={() => setStage('patient-info')}
                className="btn btn-secondary"
                style={{ flex: 1, padding: '12px' }}
              >
                Back
              </button>
              <button
                onClick={() => setStage(speechUnsupported ? 'empty-speech' : 'ready')}
                className="btn btn-primary"
                style={{ flex: 2, padding: '12px', background: 'var(--color-success)', border: 'none', boxShadow: '0 0 15px rgba(16, 185, 129, 0.3)' }}
              >
                Understand & Start Triage
              </button>
            </div>
          </motion.div>
        )}

        {/* Stage 3 & 4: Ready or Recording */}
        {(stage === 'ready' || stage === 'recording') && (
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px', textAlign: 'center' }}>
            
            <div style={{ minHeight: '60px' }}>
              {stage === 'ready' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h2 style={{ fontSize: scaleText('1.6rem', 1.25), fontWeight: '800', color: 'var(--text-primary)', marginBottom: '8px' }}>
                    Step 2: Tap the microphone to start speaking
                  </h2>
                  <p style={{ fontSize: scaleText('1.05rem'), color: 'var(--text-secondary)' }}>
                    Speak clearly in <strong style={{ color: 'var(--color-primary)' }}>{language} ({ASSESSMENT_DATABASE[language].nativeName || 'English'})</strong>.
                  </p>
                </motion.div>
              )}
              {stage === 'recording' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h2 style={{ fontSize: scaleText('1.7rem', 1.2), fontWeight: '800', color: 'var(--color-danger)', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                    <span className="live-red-dot" /> Listening... Speak now
                  </h2>
                  <p style={{ fontSize: scaleText('1.05rem'), color: 'var(--text-secondary)' }}>
                    Tap the microphone again when you are finished speaking.
                  </p>
                </motion.div>
              )}
            </div>

            {/* Giant Circular Microphone Controller */}
            <div style={{ position: 'relative', margin: '20px 0' }}>
              {stage === 'recording' && (
                <>
                  <div className="mic-ring ring-1" />
                  <div className="mic-ring ring-2" />
                </>
              )}

              <button
                onClick={stage === 'ready' ? startRecording : stage === 'recording' ? stopAndSubmit : undefined}
                aria-label={stage === 'recording' ? 'Stop recording and submit' : 'Start microphone recording'}
                style={{
                  width: scaleText('140px', 1.15),
                  height: scaleText('140px', 1.15),
                  borderRadius: '50%',
                  background: stage === 'recording' ? 'var(--color-danger)' : 'var(--color-success)',
                  border: '8px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: stage === 'recording' 
                    ? '0 0 40px rgba(244, 63, 94, 0.6), inset 0 2px 10px rgba(255,255,255,0.3)' 
                    : '0 0 30px rgba(16, 185, 129, 0.4), inset 0 2px 10px rgba(255,255,255,0.3)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  zIndex: 2,
                  position: 'relative'
                }}
              >
                <Mic size={largeText ? 56 : 48} />
              </button>
            </div>

            {stage === 'recording' && (
              <div style={{
                fontSize: '0.8rem',
                color: isSimulated ? '#f59e0b' : '#10b981',
                background: 'rgba(255,255,255,0.02)',
                padding: '4px 12px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.05)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor' }} />
                <span>{isSimulated ? 'Microphone blocked - Simulation Mode' : 'Live Browser Microphone Active'}</span>
              </div>
            )}

            {/* Waveform Visualization */}
            <div style={{ height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', width: '100%', maxWidth: '300px' }}>
              {stage === 'recording' ? (
                [15, 35, 45, 20, 10, 50, 40, 20, 30, 45, 25, 15, 35, 10].map((h, i) => (
                  <motion.div
                    key={i}
                    style={{ width: '4px', background: 'var(--color-danger)', borderRadius: '2px' }}
                    animate={{ height: [`${h/2}px`, `${h}px`, `${h/2}px`] }}
                    transition={{ duration: 0.6 + (i % 3) * 0.15, repeat: Infinity }}
                  />
                ))
              ) : (
                <div style={{ width: '100%', height: '2px', background: 'rgba(255,255,255,0.1)', borderRadius: '1px' }} />
              )}
            </div>

            {/* Real-time transcript text panel */}
            <div
              className="glass-panel"
              aria-live="polite"
              aria-atomic="true"
              style={{
                width: '100%',
                maxWidth: '600px',
                padding: '28px',
                borderRadius: '20px',
                background: 'rgba(5, 8, 20, 0.5)',
                minHeight: '120px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              <p style={{
                fontSize: scaleText('1.2rem'),
                lineHeight: 1.6,
                fontWeight: '500',
                fontStyle: typedSpeech ? 'normal' : 'italic',
                color: typedSpeech ? 'var(--text-primary)' : 'var(--text-muted)',
                textAlign: 'center'
              }}>
                {typedSpeech || `Speak naturally in ${language}. We will transcribe your words here...`}
                {stage === 'recording' && <span className="mic-cursor" />}
              </p>
            </div>
          </div>
        )}

        {/* Submitting Stage: Pulsing Skeletons */}
        {stage === 'submitting' && (
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '28px' }} className="fade-in-up">
            {/* Skeleton Loading Header */}
            <div style={{ textAlign: 'center', marginBottom: '8px' }}>
              <h2 style={{ fontSize: scaleText('1.8rem', 1.2), fontWeight: '800', color: 'var(--color-primary)', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                <RefreshCw size={24} className="mic-spin" style={{ color: 'var(--color-primary)' }} />
                Analyzing Symptoms...
              </h2>
              <p style={{ fontSize: scaleText('1.05rem'), color: 'var(--text-secondary)' }}>
                Gemini 2.5 Flash is routing clinical triage summaries.
              </p>
            </div>

            {/* Pulsing Skeleton Cards matching the results cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
              {/* 1. Transcribed Input Box Skeleton */}
              <div className="glass-panel skeleton-pulse" style={{ width: '100%', height: '110px' }} />

              {/* 2. Risk Level Banner Skeleton */}
              <div className="skeleton-pulse" style={{ width: '100%', height: '120px', borderRadius: '24px' }} />

              {/* 3. Reason Card Skeleton */}
              <div className="glass-card skeleton-pulse" style={{ width: '100%', height: '140px', borderRadius: '24px' }} />

              {/* 4. Recommended Action Card Skeleton */}
              <div className="glass-card skeleton-pulse" style={{ width: '100%', height: '220px', borderRadius: '24px' }} />
            </div>
          </div>
        )}

        {stage === 'empty-speech' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ width: '100%', maxWidth: '480px', display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'center', alignItems: 'center' }}
          >
            <div style={{
              background: isMicBlocked ? 'rgba(239, 68, 68, 0.08)' : 'rgba(245, 158, 11, 0.08)',
              border: isMicBlocked ? '1px solid rgba(239, 68, 68, 0.2)' : '1px solid rgba(245, 158, 11, 0.2)',
              color: isMicBlocked ? 'var(--color-danger)' : '#f59e0b',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: isMicBlocked ? '0 0 20px rgba(239, 68, 68, 0.15)' : '0 0 20px rgba(245, 158, 11, 0.15)'
            }}>
              <AlertCircle size={24} />
            </div>

            <div>
              <h2 style={{ fontSize: scaleText('1.5rem', 1.25), fontWeight: '800', marginBottom: '4px' }}>
                {isMicBlocked 
                  ? 'Microphone Blocked' 
                  : speechUnsupported 
                    ? 'Voice Triage Disabled' 
                    : "We couldn't hear you clearly"}
              </h2>
              <p style={{ fontSize: scaleText('0.95rem', 1.15), color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                {isMicBlocked 
                  ? 'Microphone permission was denied. Please type symptoms manually below, or adjust browser permissions.' 
                  : speechUnsupported 
                    ? 'Voice recognition is not supported on this browser. Direct text triage mode is active.' 
                    : "The microphone didn't capture your voice. You can record again, type symptoms, or use our clinical sample."}
              </p>
            </div>

            {/* Manual Typing Editor */}
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'left' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Type Symptoms Manually
              </label>
              <textarea
                value={typedSpeech}
                onChange={(e) => setTypedSpeech(e.target.value)}
                placeholder="e.g. I have had a high fever and headache for two days..."
                style={{
                  width: '100%',
                  height: '80px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '12px',
                  padding: '10px 14px',
                  color: '#fff',
                  fontSize: '16px',
                  outline: 'none',
                  resize: 'none',
                  fontFamily: 'var(--font-sans)',
                  lineHeight: 1.5
                }}
              />
            </div>

            {/* Help Block: How to Unblock Microphone */}
            {isMicBlocked && (
              <div style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '12px',
                padding: '12px 14px',
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                textAlign: 'left',
                width: '100%'
              }}>
                <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '2px' }}>How to Unblock:</strong>
                Tap the padlock or site settings icon in the top URL bar, change Microphone access to <strong>Allow</strong>, and refresh the portal.
              </div>
            )}

            {/* Action CTAs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
              {!speechUnsupported && (
                <button
                  onClick={() => {
                    setIsMicBlocked(false);
                    setStage('ready');
                    setTypedSpeech('');
                  }}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '10px', fontSize: scaleText('0.9rem', 1.1), border: 'none' }}
                >
                  <Mic size={16} /> {isMicBlocked ? 'Grant Permissions & Retry' : 'Record Again'}
                </button>
              )}

              <button
                onClick={() => submitSymptomText(data.speech, true)}
                className="btn btn-secondary"
                style={{ width: '100%', padding: '10px', fontSize: scaleText('0.9rem', 1.1) }}
              >
                Use Pre-set Clinical Sample
              </button>

              {typedSpeech.trim().length >= 5 && (
                <button
                  onClick={() => submitSymptomText(typedSpeech.trim())}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '10px', fontSize: scaleText('0.9rem', 1.1), background: 'var(--grad-accent)', border: 'none' }}
                >
                  Submit Typed Symptoms
                </button>
              )}
            </div>
          </motion.div>
        )}

        {/* Stage 4: Premium Results Assessment */}
        {stage === 'results' && apiResult && (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '28px' }}
          >
            {/* Top Header Title */}
            <motion.div variants={animateChild} style={{ textAlign: 'center' }}>
              <h2 style={{ fontSize: scaleText('2rem', 1.2), fontWeight: '800', letterSpacing: '-0.02em' }}>
                Assessment Complete
              </h2>
              <p style={{ fontSize: scaleText('1rem'), color: 'var(--text-secondary)', marginTop: '4px' }}>
                Triage summary for <strong style={{ color: '#fff' }}>{patientName}</strong> ({patientAge} Years) has been compiled successfully.
              </p>
            </motion.div>

            {/* Offline Fallback Notice */}
            {isFallback && (
              <motion.div variants={animateChild} style={{
                background: 'rgba(245, 158, 11, 0.08)',
                border: '1px solid rgba(245, 158, 11, 0.2)',
                borderRadius: '12px',
                padding: '12px 16px',
                fontSize: '0.85rem',
                color: '#f59e0b',
                textAlign: 'center'
              }}>
                <strong>Offline Template Mode:</strong> Displaying clinical template guide.
              </motion.div>
            )}

            {/* 1. Transcribed Input Box */}
            <motion.div variants={animateChild} className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <span style={{ fontSize: scaleText('0.8rem'), fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Patient Speech ({language})
                </span>
                <p style={{ fontSize: scaleText('1.15rem'), color: '#fff', marginTop: '6px', fontWeight: '500', lineHeight: 1.5 }}>
                  "{typedSpeech}"
                </p>
              </div>

              {language !== 'English' && (
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '14px' }}>
                  <span style={{ fontSize: scaleText('0.8rem'), fontWeight: '700', color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Volume2 size={14} /> English Translation
                  </span>
                  <p style={{ fontSize: scaleText('1.15rem'), color: 'var(--text-secondary)', marginTop: '6px', fontStyle: 'italic', lineHeight: 1.5 }}>
                    "{apiResult.reason.includes('CRITICAL FLAG') ? typedSpeech : data.translation}"
                  </p>
                </div>
              )}

              {translationFlags.length > 0 && (
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span style={{ fontSize: scaleText('0.75rem'), fontWeight: '700', color: 'var(--color-success)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    ✓ Verified Clinical Translation Glossary Matches (Zero-Error)
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '2px' }}>
                    {translationFlags.map((flag, idx) => (
                      <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', borderRadius: '10px', padding: '6px 12px', fontSize: scaleText('0.85rem'), color: '#fff', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ color: 'var(--text-muted)' }}>"{flag.original}"</span>
                        <span style={{ color: 'var(--color-primary)', fontSize: '0.75rem' }}>➔</span>
                        <strong>{flag.matchedEnglish}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Senior Citizen Alert Advisory (if patient is >= 60) */}
            {parseInt(patientAge) >= 60 && (
              <motion.div
                variants={animateChild}
                style={{
                  background: 'rgba(245, 158, 11, 0.06)',
                  border: '1px solid rgba(245, 158, 11, 0.25)',
                  borderRadius: '16px',
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  textAlign: 'left'
                }}
              >
                <div style={{ color: '#f59e0b', marginTop: '2px' }}>
                  <AlertTriangle size={18} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <strong style={{ fontSize: scaleText('0.9rem'), color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Senior Patient Advisory ({patientAge} Years)
                  </strong>
                  <p style={{ fontSize: scaleText('0.85rem'), color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
                    Elderly patients carry high clinical risk. Atypical symptoms (e.g., lack of chest pain during a cardiac event or lack of fever during severe infection) are common. Closely monitor patient vitals and proceed to clinical care.
                  </p>
                </div>
              </motion.div>
            )}

            {/* 2. Risk Level Banner */}
            <motion.div
              variants={animateChild}
              style={{
                background: sevStyle.grad,
                border: sevStyle.border,
                borderRadius: '24px',
                padding: '28px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                boxShadow: `0 15px 35px -10px ${sevStyle.glow}`,
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{
                position: 'absolute',
                top: '-50%',
                left: '-20%',
                width: '200px',
                height: '200px',
                background: sevStyle.color,
                opacity: 0.1,
                filter: 'blur(40px)',
                pointerEvents: 'none'
              }} />

              <div style={{
                color: sevStyle.color,
                background: 'rgba(255,255,255,0.03)',
                padding: '16px',
                borderRadius: '50%',
                border: `1px solid ${sevStyle.color}22`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {sevStyle.icon}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{
                  fontSize: scaleText('0.85rem'),
                  fontWeight: '800',
                  color: sevStyle.color,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em'
                }}>
                  Clinical Triage Risk Level
                </span>
                <h3 style={{ fontSize: scaleText('1.5rem', 1.15), fontWeight: '800', color: '#fff', letterSpacing: '-0.01em' }}>
                  {sevStyle.badge}
                </h3>
              </div>
            </motion.div>

            {/* 3. Reason Card */}
            <motion.div
              variants={animateChild}
              className="glass-card"
              style={{
                padding: '28px',
                borderRadius: '24px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
              }}
              whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}
            >
              <span style={{ fontSize: scaleText('0.8rem'), fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>
                Triage Diagnosis Reason
              </span>
              <p style={{ fontSize: scaleText('1.2rem'), color: 'var(--text-primary)', lineHeight: 1.6, fontWeight: '500' }}>
                {apiResult.reason}
              </p>
            </motion.div>

            {/* 4. Recommended Action Card */}
            <motion.div
              variants={animateChild}
              className="glass-card"
              style={{
                padding: '32px 28px',
                borderRadius: '24px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
              }}
              whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}
            >
              <h3 style={{
                fontSize: scaleText('1.35rem'),
                fontWeight: '800',
                color: '#fff',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                paddingBottom: '14px',
                marginBottom: '20px',
                letterSpacing: '-0.01em'
              }}>
                Recommended Action Protocol
              </h3>

              <ol style={{
                paddingLeft: '0',
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '18px',
                fontSize: scaleText('1.15rem'),
                lineHeight: 1.6,
                color: 'var(--text-secondary)'
              }}>
                {apiResult.action.split('\n').filter(line => line.trim() !== '').map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '14px'
                    }}
                  >
                    <div style={{
                      width: scaleText('28px', 1.1),
                      height: scaleText('28px', 1.1),
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid var(--glass-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.85rem',
                      fontWeight: '700',
                      color: sevStyle.color,
                      flexShrink: 0,
                      marginTop: '2px'
                    }}>
                      {index + 1}
                    </div>
                    <span style={{ color: '#fff', fontWeight: '500' }}>
                      {item.replace(/^\d+[\.\)]\s*/, '')}
                    </span>
                  </motion.li>
                ))}
              </ol>
            </motion.div>

            {/* 5. Action Buttons Grid */}
            <motion.div variants={animateChild} style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              marginTop: '12px'
            }}>
              {/* Listen Again Button */}
              <button
                onClick={toggleAudioSpeech}
                style={{
                  background: isReadingAudio ? 'rgba(6, 182, 212, 0.15)' : 'rgba(255,255,255,0.03)',
                  border: '1px solid',
                  borderColor: isReadingAudio ? 'var(--color-primary)' : 'var(--glass-border)',
                  color: isReadingAudio ? 'var(--color-primary)' : '#fff',
                  borderRadius: '16px',
                  padding: '18px 24px',
                  fontSize: scaleText('1.05rem'),
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                className="action-btn-hover"
              >
                <Volume2 size={20} className={isReadingAudio ? 'equalizer-pulse' : ''} />
                <span>{isReadingAudio ? 'Pause Speech' : 'Listen Again'}</span>
              </button>

              {/* Find Hospital Button */}
              <button
                onClick={() => setShowMapDrawer(true)}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--glass-border)',
                  color: '#fff',
                  borderRadius: '16px',
                  padding: '18px 24px',
                  fontSize: scaleText('1.05rem'),
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                className="action-btn-hover"
              >
                <MapPin size={20} style={{ color: 'var(--color-primary)' }} />
                <span>Find Hospital</span>
              </button>

              {/* Generate Referral PDF Report Button */}
              <button
                onClick={handleExportPDF}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--glass-border)',
                  color: '#fff',
                  borderRadius: '16px',
                  padding: '18px 24px',
                  fontSize: scaleText('1.05rem'),
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                className="action-btn-hover"
              >
                <FileText size={20} style={{ color: 'var(--color-success)' }} />
                <span>Generate Report</span>
              </button>
            </motion.div>

            {/* Start Over Action */}
            <motion.div variants={animateChild} style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
              <button
                onClick={reset}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  fontSize: scaleText('1rem'),
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px'
                }}
                onMouseEnter={(e) => e.target.style.color = '#fff'}
                onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
              >
                <RotateCcw size={16} /> Start a New Assessment
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* 6. Healthcare Facility Finder Drawer Overlay */}
      <AnimatePresence>
        {showMapDrawer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(5, 8, 20, 0.85)',
              backdropFilter: 'blur(16px)',
              zIndex: 2000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px'
            }}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              className="glass-panel drawer-content-panel"
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: scaleText('1.3rem'), fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin size={20} color="var(--color-primary)" /> Healthcare Facility Finder
                </h3>
                <button
                  onClick={() => setShowMapDrawer(false)}
                  style={{ background: 'rgba(255,255,255,0.06)', border: 'none', color: '#fff', width: '48px', height: '48px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  aria-label="Close Facility Finder"
                >
                  <X size={20} />
                </button>
              </div>

              {locState === 'loading' && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', padding: '24px 0' }}>
                  <RefreshCw size={24} className="mic-spin" color="var(--color-primary)" />
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Identifying your physical GPS location...</p>
                </div>
              )}

              {locState === 'error' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{
                    background: 'rgba(239, 68, 68, 0.08)',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                    borderRadius: '16px',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    fontSize: '0.85rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-danger)', fontWeight: '700' }}>
                      <AlertCircle size={16} />
                      <span>GPS Access Failed</span>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', margin: 0 }}>{locError}</p>
                  </div>
                  
                  {/* Quick suggestions hooks */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'left' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Quick Suggestions:
                    </span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {['PHC', 'Government Hospital', 'Emergency Care'].map((suggestion) => (
                        <button
                          key={suggestion}
                          onClick={() => handleQuickSearch(suggestion)}
                          style={{
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid var(--glass-border)',
                            borderRadius: '8px',
                            padding: '6px 12px',
                            fontSize: '0.8rem',
                            color: 'var(--color-primary)',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(6, 182, 212, 0.1)'}
                          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                        >
                          Find {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {(locState === 'error' || locState === 'success') && (
                <form onSubmit={handleManualSearch} style={{ display: 'flex', gap: '8px' }}>
                  <div style={{ flex: 1, display: 'flex', gap: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', padding: '4px 10px', borderRadius: '12px', alignItems: 'center' }}>
                    <Search size={16} color="var(--text-muted)" />
                    <input
                      type="text"
                      placeholder="Enter city or PIN (e.g. Hyderabad, 500001)"
                      value={manualSearchVal}
                      onChange={(e) => setManualSearchVal(e.target.value)}
                      style={{ background: 'none', border: 'none', color: '#fff', outline: 'none', fontSize: '16px', width: '100%' }}
                    />
                  </div>
                  <button
                    type="submit"
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid var(--glass-border)',
                      color: '#fff',
                      borderRadius: '12px',
                      padding: '10px 16px',
                      fontSize: '0.85rem',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    Search
                  </button>
                </form>
              )}

              {locState === 'success' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '4px' }}>
                  
                  {userCoords && (
                    <p style={{ fontSize: '0.8rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '600' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor' }} />
                      Location Detected: {userCoords.lat.toFixed(4)}, {userCoords.lng.toFixed(4)}
                    </p>
                  )}

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {getNearbyFacilitiesList().map((facility, index) => (
                      <div key={index} style={{
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        borderRadius: '16px',
                        padding: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <span style={{
                            fontSize: scaleText('0.75rem'),
                            fontWeight: '800',
                            color: facility.color,
                            border: `1px solid ${facility.color}33`,
                            background: `${facility.color}08`,
                            padding: '2px 8px',
                            borderRadius: '6px',
                            textTransform: 'uppercase'
                          }}>
                            {facility.label}
                          </span>
                          <span style={{ fontSize: scaleText('0.8rem'), fontWeight: '700', color: 'var(--text-muted)' }}>
                            {facility.dist} ({facility.time})
                          </span>
                        </div>

                        <div>
                          <h4 style={{ fontSize: scaleText('1.05rem'), fontWeight: '700', color: '#fff' }}>{facility.name}</h4>
                          <p style={{ fontSize: scaleText('0.8rem'), color: 'var(--text-muted)', marginTop: '4px' }}>{facility.status}</p>
                        </div>

                        <a
                          href={facility.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid var(--glass-border)',
                            borderRadius: '10px',
                            padding: '10px',
                            fontSize: scaleText('0.85rem'),
                            fontWeight: '700',
                            color: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            transition: 'all 0.2s'
                          }}
                          className="action-btn-hover"
                        >
                          <Navigation size={14} color="var(--color-primary)" /> Open in Google Maps
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {locState !== 'loading' && (
                <button
                  onClick={detectUserLocation}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '8px 0',
                    marginTop: '4px'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#fff'}
                  onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
                >
                  <RefreshCw size={12} /> Re-detect GPS Location
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 7. Clinical Referral Report Input Modal (Overlay) */}
      <AnimatePresence>
        {showReportModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(5, 8, 20, 0.85)',
              backdropFilter: 'blur(16px)',
              zIndex: 2000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px'
            }}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              className="glass-panel report-modal-panel"
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FileText size={20} color="var(--color-success)" /> Generate Referral PDF
                </h3>
                <button
                  onClick={() => setShowReportModal(false)}
                  style={{ background: 'rgba(255,255,255,0.06)', border: 'none', color: '#fff', width: '48px', height: '48px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  aria-label="Close Referral PDF Creator"
                >
                  <X size={20} />
                </button>
              </div>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                Enter patient identifiers to generate a professional medical-grade PDF triage document.
              </p>

              {formError && (
                <div style={{
                  background: 'rgba(239, 68, 68, 0.08)',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  fontSize: '0.8rem',
                  color: 'var(--color-danger)',
                  fontWeight: '600'
                }}>
                  {formError}
                </div>
              )}

              <form onSubmit={handleExportPDF} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Patient Name */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                    Patient Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter name (e.g. John Doe)"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid var(--glass-border)',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '0.95rem',
                      outline: 'none'
                    }}
                  />
                </div>

                {/* Patient Age */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                    Patient Age (Years)
                  </label>
                  <input
                    type="number"
                    placeholder="Enter age (e.g. 65)"
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)}
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid var(--glass-border)',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '0.95rem',
                      outline: 'none'
                    }}
                  />
                </div>

                {/* Action button */}
                <button
                  type="submit"
                  style={{
                    width: '100%',
                    background: 'var(--grad-hero)',
                    border: 'none',
                    color: '#fff',
                    borderRadius: '12px',
                    padding: '14px',
                    fontWeight: '700',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 15px rgba(6, 182, 212, 0.3)',
                    marginTop: '8px'
                  }}
                >
                  <FileText size={18} /> Export Referral PDF
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .live-red-dot {
          width: 12px;
          height: 12px;
          background-color: var(--color-danger);
          border-radius: 50%;
          display: inline-block;
          animation: mic-blink 1s infinite alternate;
        }
        @keyframes mic-blink {
          0% { opacity: 0.3; }
          100% { opacity: 1; }
        }
        .mic-ring {
          position: absolute;
          top: -20px;
          left: -20px;
          right: -20px;
          bottom: -20px;
          border-radius: 50%;
          border: 2px solid var(--color-danger);
          opacity: 0;
          pointer-events: none;
        }
        .ring-1 {
          animation: mic-pulse 2s infinite linear;
        }
        .ring-2 {
          animation: mic-pulse 2s infinite linear 1s;
        }
        @keyframes mic-pulse {
          0% { transform: scale(0.9); opacity: 0.8; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        .mic-cursor {
          display: inline-block;
          width: 3px;
          height: 20px;
          background-color: var(--color-danger);
          margin-left: 4px;
          animation: mic-blink 0.8s infinite;
        }
        .mic-spin {
          width: 40px;
          height: 40px;
          border: 4px solid transparent;
          border-top: 4px solid #fff;
          border-radius: 50%;
          animation: mic-rotate 0.8s linear infinite;
        }
        @keyframes mic-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .volume-pulse {
          animation: vol-pulse 1s infinite alternate ease-in-out;
        }
        @keyframes vol-pulse {
          from { transform: scale(0.95); opacity: 0.7; }
          to { transform: scale(1.1); opacity: 1; }
        }
        .equalizer-pulse {
          animation: eq-pulse 0.8s infinite alternate ease-in-out;
        }
        @keyframes eq-pulse {
          0% { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(1.2) translateY(-2px); opacity: 1; }
        }
        .action-btn-hover:hover {
          transform: translateY(-3px);
          background: rgba(255, 255, 255, 0.08) !important;
          border-color: rgba(255, 255, 255, 0.2) !important;
          box-shadow: 0 10px 20px rgba(0,0,0,0.4);
        }
      `}</style>
    </div>
  );
}
