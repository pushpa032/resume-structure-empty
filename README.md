# Resume Screening App

A lightweight resume screening web app built with Next.js, TypeScript, Tailwind CSS and Radix UI primitives. This repo includes a small UI to upload resumes (PDF, DOC, DOCX), perform a client-side analysis (mock/placeholder), and export/save analysis results as JSON.

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

---

## Project Structure (high level)

- `app/` — Next.js app routes and global config (app router). 
- `components/` — UI components and containers (notably `resume-screening-app.tsx` and `ui/` components like `avatar`, `label`, `button`, etc.).
- `lib/` — small utilities (e.g., `utils.ts`).
- `public/` — static assets (favicon, images).

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

## How to Contribute

All contributions are welcome. Typical workflow:

1. Fork the repository
2. Create a branch for your change
3. Commit and push your changes
4. Open a pull request with a clear summary of changes and reasoning

---

## Known Issues / TODO

- The resume analysis is currently a demonstration mock (no backend NLP parser). You can implement a server-side analysis or integrate a cloud NLP API for feature parity.
- Consider moving large binary files (if any) to Git LFS.

---

## License

Choose the license that suits you — the placeholder below indicates MIT. Replace it if you prefer another license.

MIT © <Your Name>

---

If you'd like any additions or adjustments (badges, images, examples, sample screenshots, CI setup, or customized PR guidance), tell me what you'd like and I'll update the README accordingly.