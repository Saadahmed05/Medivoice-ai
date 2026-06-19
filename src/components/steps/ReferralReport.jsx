import React, { useState } from 'react';
import { FileText, Printer, RotateCcw } from 'lucide-react';

export default function ReferralReport({ result, language, symptomText, onReset, isLargeText }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [ashaWorkerCode, setAshaWorkerCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handlePrint = (e) => {
    if (e) e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Please enter patient name.');
      return;
    }

    const parsedAge = parseInt(age);
    if (isNaN(parsedAge) || parsedAge <= 0 || parsedAge > 125) {
      setErrorMsg('Please enter a valid age (1-125).');
      return;
    }

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Pop-up blocked. Please enable pop-ups in your browser settings.');
      return;
    }

    const severity = result?.severity || 'safe';
    const dateStr = new Date().toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
    const triageId = `HC-${Math.floor(100000 + Math.random() * 900000)}`;

    const adviceListHtml = result.action.split('\n')
      .filter((line) => line.trim() !== '')
      .map((line) => `<li>${line.replace(/^\d+[\.\)]\s*/, '').trim()}</li>`)
      .join('');

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>HealthCompass Clinical Referral Summary - ${name}</title>
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
              border: 2px solid #cbd5e1;
              border-radius: 16px;
              padding: 30px;
              background-color: #ffffff;
            }
            .header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-bottom: 2px solid #e2e8f0;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .logo-text {
              font-size: 20px;
              font-weight: 800;
              color: #2563EB;
            }
            .report-info {
              font-size: 12px;
              color: #64748b;
              text-align: right;
            }
            .report-title {
              font-size: 22px;
              font-weight: 800;
              text-align: center;
              text-transform: uppercase;
              letter-spacing: 1px;
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
            }
            .transcript-box {
              background: #f8fafc;
              border-left: 4px solid #2563EB;
              padding: 16px;
              border-radius: 0 12px 12px 0;
              font-style: italic;
              font-size: 14px;
              color: #334155;
            }
            .severity-banner {
              border-radius: 12px;
              padding: 18px 20px;
            }
            .severity-banner.emergency {
              background-color: #fef2f2;
              border: 1px solid #fca5a5;
              color: #991b1b;
            }
            .severity-banner.doctor {
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
            }
            .severity-desc {
              font-size: 14px;
              font-weight: 500;
              margin-top: 4px;
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
            }
            @media print {
              body {
                padding: 0;
              }
              .letterhead {
                border: none;
                padding: 0;
              }
            }
          </style>
        </head>
        <body>
          <div class="letterhead">
            <div class="header">
              <div class="logo-section">
                <span class="logo-text">HealthCompass Triage Platform</span>
              </div>
              <div class="report-info">
                <strong>Referral ID:</strong> ${triageId}<br>
                <strong>Date:</strong> ${dateStr}
              </div>
            </div>

            <div class="report-title">HealthCompass Clinical Referral Summary</div>

            <div class="patient-meta-grid">
              <div class="meta-block">
                <strong>Patient Name</strong>
                <span>${name}</span>
              </div>
              <div class="meta-block">
                <strong>Age</strong>
                <span>${age} Years</span>
              </div>
              <div class="meta-block">
                <strong>Language</strong>
                <span>${language}</span>
              </div>
              <div class="meta-block">
                <strong>ASHA Card Code</strong>
                <span>${ashaWorkerCode || 'N/A'}</span>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Patient Reported Symptoms</div>
              <div class="transcript-box">
                "${symptomText}"
              </div>
            </div>

            <div class="section">
              <div class="section-title">Risk Level Urgency Assessment</div>
              <div class="severity-banner ${severity}">
                <div class="severity-badge">${severity.toUpperCase()} STATUS</div>
                <div class="severity-desc">${result.reason}</div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Guidance Protocol</div>
              <ol class="action-list">
                ${adviceListHtml}
              </ol>
            </div>

            <div class="footer-signature-row">
              <div class="clinical-stamp">
                HealthCompass<br>Clinical Record
              </div>
              <div class="signature-box">
                Attending Officer Signature
              </div>
            </div>

            <div class="disclaimer">
              Generated using Google Gemini 2.5 Flash. This is a triage referral routing sheet designed to streamline check-in at Primary Health Centers (PHCs) or District Hospitals.
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

  return (
    <div className="w-full max-w-xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <div className="mx-auto bg-blue-50 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center border border-blue-100">
          <FileText className="w-6 h-6" />
        </div>
        <h2 className={`font-black text-gray-900 ${isLargeText ? 'text-3xl' : 'text-2xl'}`}>
          Clinical Referral Summary
        </h2>
        <p className={`text-gray-500 font-semibold ${isLargeText ? 'text-lg' : 'text-sm'}`}>
          Create a printable referral sheet for Patients, ASHA Workers, and PHC Staff
        </p>
      </div>

      <form onSubmit={handlePrint} className="bg-white p-6 border border-gray-200 rounded-3xl space-y-4 shadow-sm">
        {errorMsg && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl text-center font-bold">
            {errorMsg}
          </div>
        )}

        <div className="space-y-1">
          <label className="block text-xs font-black uppercase text-gray-500">Patient Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 font-bold focus:border-blue-600 focus:outline-none"
            placeholder="Enter Patient Full Name"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-black uppercase text-gray-500">Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 font-bold focus:border-blue-600 focus:outline-none"
            placeholder="Enter Patient Age"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-black uppercase text-gray-500">ASHA Worker Code / ID (Optional)</label>
          <input
            type="text"
            value={ashaWorkerCode}
            onChange={(e) => setAshaWorkerCode(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 font-bold focus:border-blue-600 focus:outline-none"
            placeholder="e.g. ASHA-1092"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl btn-large shadow-md active:scale-95 flex items-center justify-center gap-2"
        >
          <Printer className="w-6 h-6" />
          <span>Print Referral Summary</span>
        </button>
      </form>

      <button
        onClick={onReset}
        className="w-full bg-gray-100 hover:bg-gray-250 text-gray-705 rounded-2xl btn-large active:scale-95 flex items-center justify-center gap-2"
      >
        <RotateCcw className="w-6 h-6 text-gray-500" />
        <span>Start New Assessment</span>
      </button>
    </div>
  );
}
