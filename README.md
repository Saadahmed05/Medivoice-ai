# MediVoice AI

> AI-powered voice transcription and clinical documentation platform built with Next.js 15 App Router.

## ✨ Features

- 🎙️ **Real-time Voice Transcription** — WebAudio-based recording with speaker diarization
- 🤖 **AI Clinical Summaries** — Automated SOAP note and keyword extraction
- 📅 **Appointment Management** — Schedule, track, and manage clinical appointments
- 👥 **Patient Records** — Comprehensive patient demographics and medical history
- 📊 **Analytics Dashboard** — Practice performance metrics and trend charts
- 💬 **Secure Messaging** — HIPAA-compliant clinical team communication
- 🌐 **Teleconsult Ready** — Built for virtual and in-person consultations

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS v4 |
| Components | Radix UI + CVA |
| Animation | Framer Motion |
| Icons | Lucide React |
| Deployment | Vercel |

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── dashboard/          # Main dashboard
│   ├── appointments/       # Appointment management
│   ├── patients/           # Patient records
│   ├── transcriptions/     # Voice transcription
│   ├── analytics/          # Analytics & charts
│   ├── messages/           # Team messaging
│   └── settings/           # User settings
├── components/
│   ├── ui/                 # Primitive UI components
│   └── layout/             # Layout shell, sidebar, header
├── features/               # Feature-specific components
│   ├── dashboard/          # Stats, charts, appointment widgets
│   ├── transcriptions/     # Transcription panel
│   └── patients/           # Patient list
├── hooks/                  # Custom React hooks
├── lib/                    # Utilities and config
├── types/                  # TypeScript definitions
└── constants/              # App constants and mock data
```

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 🔧 Environment Variables

Copy `.env.local` and configure:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_VOICE_TRANSCRIPTION=true
NEXT_PUBLIC_AI_SUMMARY=true
NEXT_PUBLIC_TELECONSULT=true
```

## ♿ Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigable
- Screen reader support with `aria-*` attributes
- Skip-to-content link
- Focus ring on all interactive elements

## 🔒 Security

- HIPAA-aligned security headers
- Content Security Policy (CSP)
- Permissions Policy restricting camera/location access
- X-Frame-Options: DENY

## 🚢 Deployment

Optimized for [Vercel](https://vercel.com):

1. Push to GitHub
2. Import repository in Vercel
3. Set environment variables
4. Deploy

---

Built with ❤️ for modern healthcare teams.
