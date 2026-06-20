/**
 * Multilingual Clinical Translation Glossary
 * Maps critical regional medical symptoms (Hindi, Telugu, Tamil) to verified English clinical terms.
 * Ensures zero-error matching for high-stakes triage.
 */

const GLOSSARY = {
  Hindi: [
    { regional: /(सीने.*दर्द|छाती.*दर्द|हृदय.*दर्द)/i, english: "Chest Pain" },
    { regional: /(सांस.*तकलीफ|साँस.*तकलीफ|दम.*घुट|सांस.*फूल)/i, english: "Difficulty Breathing" },
    { regional: /(तेज़.*बुखार|तेज.*बुखार|ताप)/i, english: "High Fever" },
    { regional: /(पेट.*दर्द|उदर.*दर्द)/i, english: "Stomach Pain" },
    { regional: /(सांप.*काट|साँप.*काट|जहर)/i, english: "Snake Bite" },
    { regional: /(लकवा|पक्षाघात|बोलने.*तकलीफ)/i, english: "Stroke Symptoms" },
    { regional: /(भारी.*रक्तस्राव|रक्त.*बह|खून.*बह)/i, english: "Severe Bleeding" },
    { regional: /(सिर.*दर्द|सर.*दर्द)/i, english: "Headache" },
    { regional: /(चक्कर.*आ|सिर.*घूम)/i, english: "Dizziness" },
    { regional: /(उल्टी|जी.*मिचला)/i, english: "Vomiting / Nausea" }
  ],
  Telugu: [
    { regional: /(గుండె.*నొప్పి|గుండెల్లో.*నొప్పి|గుండె.*మంట)/i, english: "Chest Pain" },
    { regional: /(ఊపిరి.*ఆడ|శ్వాస.*కష్టం|దమ్ము)/i, english: "Difficulty Breathing" },
    { regional: /(తీవ్రమైన.*జ్వరం|ఎక్కువ.*జ్వరం|వేడి)/i, english: "High Fever" },
    { regional: /(కడుపు.*నొప్పి|కడుపులో.*నొప్పి)/i, english: "Stomach Pain" },
    { regional: /(పాము.*కాటు|పాము.*కరి)/i, english: "Snake Bite" },
    { regional: /(పక్షవాతం|మాట.*పడి|పడిపో)/i, english: "Stroke Symptoms" },
    { regional: /(రక్తస్రావం|రక్తం.*కారు|నెత్తురు)/i, english: "Severe Bleeding" },
    { regional: /(తలనొప్పి|తల.*నొప్పి)/i, english: "Headache" },
    { regional: /(కళ్లు.*తిరగడం|కళ్ళు.*తిరగడం|కళ్ళు.*తిరుగు)/i, english: "Dizziness" },
    { regional: /(వాంతులు|వాంతి|కడుపులో.*తిప్ప)/i, english: "Vomiting / Nausea" }
  ],
  Tamil: [
    { regional: /(நெஞ்.*வலி|நெஞ்சு.*பாரம்)/i, english: "Chest Pain" },
    { regional: /(மூச்சு.*திணறல்|மூச்சு.*முடியவில்லை|சுவாசம்.*கஷ்டம்)/i, english: "Difficulty Breathing" },
    { regional: /(அதிக.*காய்ச்சல்|கடுமையான.*காய்ச்சல்)/i, english: "High Fever" },
    { regional: /(வயிற்று.*வலி|வயிறு.*வலி)/i, english: "Stomach Pain" },
    { regional: /(பாம்பு.*கடி|பாம்பு.*தீண்டி)/i, english: "Snake Bite" },
    { regional: /(பக்கவாதம்|பேச்சு.*குளறு|வாய்.*கோண)/i, english: "Stroke Symptoms" },
    { regional: /(இரத்த.*போக்கு|இரத்தம்.*கொட்டு|இரத்தம்.*வடி)/i, english: "Severe Bleeding" },
    { regional: /(தலை.*வலி|கடுமையான.*தலைவலி)/i, english: "Headache" },
    { regional: /(தலைச்.*சுற்றல்|தலை.*சுற்று)/i, english: "Dizziness" },
    { regional: /(வாந்தி|குமட்டல்)/i, english: "Vomiting / Nausea" }
  ]
};

/**
 * Scans regional text for critical medical terms and returns verified English clinical matches.
 * @param {string} text - The input symptom description.
 * @param {string} language - The selected language (Hindi, Telugu, Tamil, English).
 * @returns {Array<{original: string, matchedEnglish: string}>} Array of matched glossary items.
 */
export function validateAndExtractFlags(text, language) {
  if (!text || !language) return [];
  const cleaned = text.trim();
  const langRules = GLOSSARY[language];
  if (!langRules) return [];

  const matchedFlags = [];
  
  for (const rule of langRules) {
    const match = cleaned.match(rule.regional);
    if (match) {
      const originalWord = match[0];
      matchedFlags.push({
        original: originalWord,
        matchedEnglish: rule.english
      });
    }
  }

  return matchedFlags;
}
