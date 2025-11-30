README.md
# Resume Screening Agent

An AI-powered agent that analyzes resumes and ranks candidates based on job requirements. Built for the 48-Hour AI Agent Development Challenge.

## Overview

The Resume Screening Agent automates the initial screening process by analyzing candidate resumes and providing compatibility scores across key categories. This helps HR professionals quickly identify the most suitable candidates for a position.

## Features

- *Resume Upload*: Supports PDF, DOC, and DOCX formats
- *AI Analysis*: Extracts skills, experience, and qualifications
- *Scoring System*: Evaluates candidates across 3 key categories:
  - Skills Match
  - Knowledge Depth
  - Experience Relevance
- *Detailed Insights*: Provides actionable recommendations
- *Responsive UI*: Works on all device sizes

## Tech Stack

- *Frontend*: Next.js, TypeScript, Tailwind CSS
- *UI Components*: Shadcn UI, Lucide React Icons
- *AI Engine*: OpenAI GPT (simulated in this demo)
- *Deployment*: Vercel

## Setup Instructions

1. Clone the repository:
   ```bash
  git clone https://github.com/pushpa032/resume-structure-empty.git
  cd resume-structure-empty
Architecture Diagram
┌─────────────────────────────────────────────────────────────┐
│                    Resume Screening Agent                   │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │   Frontend   │    │   Backend    │    │  AI Engine   │  │
│  │  (Next.js)   │◄──►│ (Node/Python)│◄──►│ (OpenAI API) │  │
│  └──────────────┘    └──────────────┘    └──────────────┘  │
│           │                     │                  │       │
│           ▼                     ▼                  ▼       │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │   Upload     │    │  Processing  │    │  Scoring     │  │
│  │   Resume     │    │   Engine     │    │  Algorithm   │  │
│  └──────────────┘    └──────────────┘    └──────────────┘  │
│           │                     │                  │       │
│           ▼                     ▼                  ▼       │
│  ┌─────────────────────────────────────────────────────────┐│
│  │              Candidate Compatibility Report             ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘

[30-11-2025 09:53 AM] Pushpa .S: npm install
[30-11-2025 09:54 AM] Pushpa .S: npm run dev
# or fallback if next still fails:
npx next dev
[30-11-2025 09:55 AM] Pushpa .S: Make sure you’re in the project root:
[30-11-2025 09:55 AM] Pushpa .S: cd C:\Users\HP\Downloads\resume-structure-empty
[30-11-2025 09:55 AM] Pushpa .S: Install dependencies (run once or if packages are missing):
[30-11-2025 09:55 AM] Pushpa .S: npm install
[30-11-2025 09:56 AM] Pushpa .S: Start the development server (recommended while developing):
[30-11-2025 09:57 AM] Pushpa .S: npm run dev
# or fallback if next still fails:
npx next dev
[30-11-2025 09:58 AM] Pushpa .S: Build & start production (optional):
[30-11-2025 09:58 AM] Pushpa .S: npm run build
npm start
[30-11-2025 09:59 AM] Pushpa .S: Additional scripts:
Lint JavaScript/TS and Next config:
[30-11-2025 10:02 AM] Pushpa .S: npm run lint
[30-11-2025 10:02 AM] Pushpa .S: Check/fix CSS stylelint:
[30-11-2025 10:03 AM] Pushpa .S: npm run lint:css
[30-11-2025 10:05 AM] Pushpa .S: If you see "'next' is not recognized" or command fails:

Run:
[30-11-2025 10:05 AM] Pushpa .S: npm install
npx next dev
[30-11-2025 10:05 AM] Pushpa .S: npx runs the local Next binary directly if PATH isn’t picking it up.
Common checks & fixes if things still fail

Verify Node.js version (Next.js requires recent Node LTS; Node 18+ recommended):
[30-11-2025 10:06 AM] Pushpa .S: node --version
# If < 18, consider installing Node 18 or above
[30-11-2025 10:10 AM] Pushpa .S: Reinstall dependencies and clear cache (fixes corrupt installs):
rm -Recurse -Force node_modules package-lock.json
npm install


Check dev server logs in terminal for errors:
If npm run dev shows an error, copy the error output here.
If npm run build shows an error, copy those messages here — often they show exactly which file and line caused the problem.
Port problems or “server not reachable”
Check which process is using port 3000:
Get-NetTCPConnection -LocalPort 3000


Or more generally:netstat -ano | Select-String ":3000"

If port blocked, kill or reset process, or run on a different port (Next.js supports custom port):
npm run dev -- -p 3001
# or
npx next dev -p 3001

Browser doesn’t open
Confirm server started (check terminal logs for ready started server on ... url: http://localhost:3000).
Use start in PowerShell to open a browser:

start http://localhost:3000


f the environment is headless/remote (no browser), connect to the host machine with a browser or forward the port.
If you see an “Application error: a client-side exception has occurred”
Open DevTools in the browser (F12) → Console and copy the stack trace/error message.
Paste it here and I’ll help fix the cause. You can also check the in-app client error alert (I added one if present).
If npm run dev still fails with a missing next command after installing:
Confirm next exists under .bin:
ls node_modules\.bin\next

If missing, npm install should create it; if not, check for errors in install output.
What I need from you if it still fails

Copy the terminal output from npm run dev or npm run build (the exact error).
Copy the browser console output (F12 -> Console) for client-side exceptions.
Tell me which command you ran and what happened.
Wrap-up

#Recommended standard command to start while developing:
npm install
npm run dev
start http://localhost:3000
  
