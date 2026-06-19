import { validateSymptomInput, calculateSeverityScore, processTriageRules, applySafetyGuardrails } from './triageEngine';
import { AnalyzeResponse } from './types';

interface TestResult {
  name: string;
  passed: boolean;
  error?: string;
}

const tests: TestResult[] = [];

function assert(name: string, condition: boolean, messageOnFailure = 'Assertion failed') {
  if (condition) {
    tests.push({ name, passed: true });
  } else {
    tests.push({ name, passed: false, error: messageOnFailure });
  }
}

// ----------------------------------------------------
// 1. Validation Layer Tests
// ----------------------------------------------------
console.log('Running Validation Layer Tests...');
const shortVal = validateSymptomInput('Flu');
assert('Validation rejects short inputs', !shortVal.isValid && shortVal.error !== undefined, 'Should reject string < 5 characters');

const xssVal = validateSymptomInput('I feel sick <script>alert("hack")</script>');
assert('Validation rejects XSS script injections', !xssVal.isValid && xssVal.error?.includes('Security alert'), 'Should reject strings containing script tags');

const validVal = validateSymptomInput('I have been sneezing since morning.');
assert('Validation accepts standard valid inputs', validVal.isValid, 'Should accept standard valid strings');

// ----------------------------------------------------
// 2. Hardcoded Overrides Tests
// ----------------------------------------------------
console.log('\nRunning Hardcoded Emergency Overrides Tests...');

// English Triggers
const chestPainEng = processTriageRules('I feel a sharp chest pain on my left side.', 'English');
assert('Chest Pain (English) triggers override', chestPainEng.isOverridden && chestPainEng.result?.severity === 'emergency', 'Should override to emergency');

const breathingEng = processTriageRules('I am short of breath and cannot breathe.', 'English');
assert('Difficulty Breathing (English) triggers override', breathingEng.isOverridden && breathingEng.result?.severity === 'emergency', 'Should override to emergency');

const snakeEng = processTriageRules('Bitten by a cobra snake in the garden.', 'English');
assert('Snake Bite (English) triggers override', snakeEng.isOverridden && snakeEng.result?.severity === 'emergency', 'Should override to emergency');

const bleedingEng = processTriageRules('There is gushing blood and heavy bleeding from my leg.', 'English');
assert('Heavy Bleeding (English) triggers override', bleedingEng.isOverridden && bleedingEng.result?.severity === 'emergency', 'Should override to emergency');

const unconsciousEng = processTriageRules('The patient fainted and is unresponsive.', 'English');
assert('Unconsciousness (English) triggers override', unconsciousEng.isOverridden && unconsciousEng.result?.severity === 'emergency', 'Should override to emergency');

const strokeEng = processTriageRules('My grandfather has slurred speech and facial droop.', 'English');
assert('Stroke (English) triggers override', strokeEng.isOverridden && strokeEng.result?.severity === 'emergency', 'Should override to emergency');

// Multilingual Triggers
const chestPainTel = processTriageRules('నా గుండెల్లో తీవ్రమైన నొప్పి వస్తోంది', 'Telugu');
assert('Chest Pain (Telugu గుండెల్లో నొప్పి) triggers override', chestPainTel.isOverridden && chestPainTel.result?.severity === 'emergency', 'Should match Telugu regex');

const snakeTamil = processTriageRules('பாம்பு கடி பட்டது என் கையில்', 'Tamil');
assert('Snake Bite (Tamil பாம்பு கடி) triggers override', snakeTamil.isOverridden && snakeTamil.result?.severity === 'emergency', 'Should match Tamil regex');

const breathingHindi = processTriageRules('सांस लेने में बहुत तकलीफ हो रही है', 'Hindi');
assert('Difficulty Breathing (Hindi सांस लेने में तकलीफ) triggers override', breathingHindi.isOverridden && breathingHindi.result?.severity === 'emergency', 'Should match Hindi regex');

// ----------------------------------------------------
// 3. Severity Scoring Tests
// ----------------------------------------------------
console.log('\nRunning Severity Scoring Tests...');

const score1 = calculateSeverityScore('I have minor headache.');
assert('Score for minor headache is zero', score1 === 0, `Expected 0, got ${score1}`);

const score2 = calculateSeverityScore('I have excruciating pain.');
assert('Score includes excruciating pain weight', score2 === 3.5, `Expected 3.5, got ${score2}`);

const score3 = calculateSeverityScore('I have severe pain and a high fever for three days.');
assert('Score combines pain, fever, and duration metrics', score3 === 7.5, `Expected 7.5, got ${score3}`);

// Score-based override threshold
const scoreOverride = processTriageRules('I have severe pain and a high fever for three days.', 'English');
assert('Score >= 7 forces override immediately', scoreOverride.isOverridden && scoreOverride.result?.severity === 'emergency', 'Should override when score exceeds safety threshold');

// ----------------------------------------------------
// 4. Safety Guardrail Tests
// ----------------------------------------------------
console.log('\nRunning Post-process Safety Guardrails Tests...');

const mockSafeAi: AnalyzeResponse = {
  severity: 'safe',
  reason: 'Mild cold symptoms.',
  action: 'Rest and fluids.',
  hospitalRequired: false
};

// High score override
const highScoredResult = applySafetyGuardrails(mockSafeAi, 'I have excruciating pain.');
assert('High heuristic score upgrades AI safe -> doctor', highScoredResult.severity === 'doctor', 'Should upgrade safe to doctor due to high pain score');

// Duration override
const persistentResult = applySafetyGuardrails(mockSafeAi, 'I have a mild dry cough for days.');
assert('Persistent duration (> 3 days) upgrades AI safe -> doctor', persistentResult.severity === 'doctor', 'Should upgrade safe to doctor due to days/weeks keyword');

const normalSafeResult = applySafetyGuardrails(mockSafeAi, 'I sneezed once.');
assert('Guardrails leave normal safe cases untouched', normalSafeResult.severity === 'safe', 'Should remain safe');

// ----------------------------------------------------
// Print Results
// ----------------------------------------------------
console.log('\n======================================');
console.log('TEST RESULTS SUMMARY:');
console.log('======================================');

let failCount = 0;
for (const test of tests) {
  if (test.passed) {
    console.log(`[PASS] ${test.name}`);
  } else {
    console.error(`[FAIL] ${test.name}: ${test.error}`);
    failCount++;
  }
}

console.log('======================================');
if (failCount === 0) {
  console.log('SUCCESS: All tests passed successfully.');
  process.exit(0);
} else {
  console.error(`FAILURE: ${failCount} tests failed.`);
  process.exit(1);
}
