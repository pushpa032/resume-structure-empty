# Resume Screening Agent

An AI-powered agent that analyzes resumes and ranks candidates based on job requirements. Built for the 48-Hour AI Agent Development Challenge. This repo includes a small UI to upload resumes (PDF, DOC, DOCX), perform a client-side analysis (mock/placeholder), and export/save analysis results as JSON.

---

## Features

- Upload a resume via drag/drop or file picker (PDF / DOC / DOCX).
- Simple client-side validation for file type and size (default: 5MB limit).
- Mock resume analysis — includes key-skill extraction UI and results card.
- Save analysis results to localStorage and download JSON results.
- Handles client-side errors gracefully and displays an error UI with details for debugging.
- Built using Next.js 13 (App Router), TypeScript, Tailwind and Radix UI primitives.

---

## Tech Stack

- Next.js 13.4
- React 18
- TypeScript
- Tailwind CSS
- Radix UI primitives
- Lucide icons

---

## Prerequisites

- Node.js v18 or later recommended
- npm (comes with Node.js)
- Java (optional, only if using BFG Repo Cleaner to remove large history objects)

---

## Install

Clone the repository locally and install dependencies:

```powershell
git clone https://github.com/<your-username>/resume-structure-empty.git
cd resume-structure-empty
npm install
```

If you encounter peer dependency warnings related to stylelint packages, you may use the following variant:

```powershell
npm install --legacy-peer-deps
```

---

## Available Scripts

- `npm run dev` — Runs the app in development mode (open http://localhost:3000).
- `npm run build` — Builds the app for production.
- `npm run start` — Starts the production server (after building with `npm run build`).
- `npm run lint` — Runs eslint.
- `npm run lint:css` — Runs stylelint on `app/globals.css` and auto-fixes supported issues.

---

## Running the App

Start the dev server for local development:

```powershell
npm run dev
```

Visit http://localhost:3000 and test the resume upload / analysis flow.

For production build and run:

```powershell
npm run build
npm run start
```

Tip — open the app in your default browser automatically (PowerShell):

```powershell
start http://localhost:3000
```

---

## Project Structure (high level)

- `app/` — Next.js app routes and global config (app router). 
- `components/` — UI components and containers (notably `resume-screening-app.tsx` and `ui/` components like `avatar`, `label`, `button`, etc.).
- `lib/` — small utilities (e.g., `utils.ts`).
- `public/` — static assets (favicon, images).

---

## Architecture

```
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
```

---

## Live Demo

- Hosted demo: Not deployed yet. If you would like a hosted demo, you can deploy this app to Vercel by importing the repository — see the Deployment section below.
- Local demo: Start the app locally and navigate to the running URL (http://localhost:3000) as shown in the Running section.

Deployment to Vercel (recommended for static/Next.js projects):

1. Push your code to the GitHub repository.
2. Log in to Vercel and import the project using the GitHub link below.
3. Add any required environment variables (e.g., `OPENAI_API_KEY`) in Vercel settings.
4. Deploy — Vercel will automatically build using the Next.js framework.

---

## Git Repository Link

Full source code and assets are available in this repository:

https://github.com/pushpa032/resume-structure-empty

---

## Agent Details: What the Agent Does

This Resume Screening Agent automates the early-stage candidate screening process by doing the following:

- Accept a candidate's resume (PDF/DOC/DOCX) via file upload or drag/drop.
- Parse the resume contents (client-side or backend parsing), extract skills, education, and experience.
- Run a scoring algorithm that evaluates the candidate against job requirements in three categories: Skills Match, Knowledge Depth, and Experience Relevance.
- Generate a summarized Candidate Compatibility Report with scores, extracted key skills, suggested interview questions, and a recommended disposition (Pass / Consider / Reject).
- Allow the user to save and download the analysis results as JSON.

---

## Features & Limitations

Features:
- Supports PDF/DOC/DOCX uploads (client-side validation with 5MB default limit).
- Mock/placeholder analysis pipeline which demonstrates how a production AI-backed pipeline could function.
- Client-side error capture and reporting in the UI.
- Save analysis results to localStorage with a JSON download option.

Limitations:
- Current implementation uses mock analysis (no integrated backend NLP) by default.
- No authentication, user accounts, or role-based access control — implement these if you deploy publicly.
- No server-side document parsing for binary attachments by default — need a backend or third-party document parsing API for robust extraction.
- Potential scoring bias and false positives; analyze and test thoroughly with real data before using the agent for hiring decisions.

---

## Tools, APIs & Models Used

- Frontend: Next.js (App Router), React, TypeScript, TailwindCSS
- UI: Radix UI primitives, Lucide-react icons
- Analysis Engine (optional): Designed to work with OpenAI GPT APIs (or another LLM) via a backend service. If you enable the AI Engine, configure `OPENAI_API_KEY` and a server endpoint that proxies requests to the OpenAI API.
- Local testing and prototyping: The app runs locally via `npm run dev` and `npx next dev`.

---

## Setup & Deployment (Optional AI / OpenAI Integration)

1. Create a `.env.local` at the project root (next.js style) and add keys you need:

```powershell
# Example
OPENAI_API_KEY=sk-psa...your-openai-key-here...
```

2. If adding a backend for analysis, create a Node or Python server with endpoints that:
  - Accept a resume upload and return a parsed text or JSON.
  - Call OpenAI's API with a prompt to analyze the extracted text and generate scores.

3. Update frontend to call your backend endpoints instead of using mock analysis.

4. Deploy to Vercel and set the same environment variables in the Vercel dashboard for production.

---

If you want, I can help you deploy this to Vercel (or create a quick Gradio/Streamlit demo) and provide a working live demo link. Tell me which hosting option you prefer (Vercel, Streamlit, Gradio, or other) and I’ll set it up and add the live URL to the README.

---

## Notes & Troubleshooting

- Avoid committing build artifacts and dependencies:
  - Ensure `.gitignore` includes `node_modules/` and `.next/` (this repo already includes those entries).
  - If you accidentally committed `.next/` or `node_modules/`, remove them from the index:

```powershell
git rm -r --cached node_modules
git rm -r --cached .next
git commit -m "chore: remove tracked build & deps from repo" 
```

- GitHub Push Rejection: If you see an error such as "remote: GH001: Large files detected" or `File ... is 109.85 MB; exceeds GitHub 100MB limit`, that indicates a large file was committed. Solutions:

  Option A — Remove Large File(s) from History (Preserve other history):

  1. Install BFG Repo Cleaner (Java is required): https://rtyley.github.io/bfg-repo-cleaner/
  2. Mirror clone the repository:

```powershell
git clone --mirror git@github.com:<user>/<repo>.git
```

  3. Use BFG to strip large blobs: (This removes any file > 100MB)

```powershell
java -jar bfg.jar --strip-blobs-bigger-than 100M <repo>.git
cd <repo>.git
git reflog expire --expire=now --all
git gc --prune=now --aggressive
git push --force --mirror
```

  Option B — Create a Clean Orphan Branch (Fast & Simple):

```powershell
# Create a new clean branch with only tracked files and no history
git checkout --orphan cleanmain
git add -A
git commit -m "chore: initial clean commit"
# Replace the main branch on the remote (use force to overwrite)
git branch -M main
git push -u origin main --force
```

  Option C — Use Git Large File Storage (Git LFS) (if you need to keep large binaries):

- Install `git lfs` and follow instructions: https://git-lfs.com/.
- Note: If a large file is already in history, you will need to rewrite history to move it into LFS.

- Authentication for GitHub Push:
  - For HTTPS, configure a PAT (Personal Access Token) if needed and use credential manager.
  - For SSH, generate an SSH key pair and add it to your GitHub account; then use the `git@github.com:...` remote.

---

## Common Checks & Fixes

- If you see "'next' is not recognized" or `npm run dev` fails after installing packages:
```powershell
npm install
npx next dev
```
`npx` runs the local Next binary directly if PATH isn’t picking it up.

- Verify Node.js version (Next.js requires recent Node LTS; Node 18+ recommended):
```powershell
node --version
```

- Reinstall dependencies and clear cache (fixes corrupt installs):
PowerShell (Windows):
```powershell
Remove-Item -Recurse -Force node_modules, package-lock.json
npm install
```
Unix/macOS (bash):
```bash
rm -rf node_modules package-lock.json
npm install
```

- Check dev server logs in terminal for errors. If `npm run dev` or `npm run build` show an error, copy the error output for debugging.

- Port problems or "server not reachable" — check what process is using port 3000:
PowerShell:
```powershell
Get-NetTCPConnection -LocalPort 3000
```
General (works in PowerShell too):
```powershell
netstat -ano | Select-String ":3000"
```

- If the port is blocked, kill or reset the process (using Task Manager or `Stop-Process -Id <pid>`), or run the server on a different port:
```powershell
npx next dev -p 3001
```

- Browser doesn’t open: Confirm the server started (terminal logs will show the ready URL). In PowerShell you can open a browser with:
```powershell
start http://localhost:3000
```

- If you're running in a headless environment (no browser), forward the port or connect remotely and use the URL in your environment.

- If you see an "Application error: a client-side exception has occurred" in the browser, open DevTools (F12) → Console and copy the error/stack trace for debugging. The app also contains a client-side error alert you can check.

- If `npm run dev` still fails with a missing `next` binary: verify `next` exists under `node_modules/.bin`:
```powershell
ls node_modules\.bin\next
```
If it is not present, re-run `npm install` and review the output for errors.


---

