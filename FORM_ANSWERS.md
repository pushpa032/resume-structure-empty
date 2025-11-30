Form-ready submission answers for Resume Screening Agent

15) Working demo link (Streamlit / Gradio or similar)

- Quick (temporary Gradio share link): Run this locally and Gradio will return public share URL you can paste into the form:

  ```powershell
  cd C:\Users\HP\Downloads\resume-structure-empty
  python -m pip install -r demo/requirements.txt
  python demo/gradio_demo.py --share
  # Gradio outputs a temporary share URL, e.g. https://abcd-1234.gradio.live
  ```

- Production-hosted demo (Vercel): Deploy the repo to Vercel (recommended for a stable public demo). Steps:
  1. Create a Vercel account and connect your GitHub repo
  2. Select `pushpa032/resume-structure-empty` repository and import
  3. Vercel auto-builds the project
  4. The production URL (e.g. `https://resume-structure-empty.vercel.app`) becomes your demo link

15 (placeholder if not yet deployed): https://resume-structure-empty.vercel.app (replace this with the actual Vercel URL returned after deployment).


16) GIT Repository Link containing complete source code & assets/files

- GitHub repo: https://github.com/pushpa032/resume-structure-empty


17) Agent Details (What the agent does, Features & Limitations, Tools & APIs used, Setup instructions)

What it does:
- The Resume Screening Agent analyzes uploaded resumes (PDF/DOC/DOCX) and returns a compatibility score and key skill extraction results.
- It provides a candidate compatibility report summarizing Skills Match, Knowledge Depth, Experience Relevance, and suggested next steps.

Features:
- Upload a resume via drag-and-drop or file picker.
- Client-side validation for file types (PDF, DOC, DOCX) and file size (default limit: 5MB) — easily configurable.
- Mock analysis that extracts skills and returns scored metrics (skills_match, knowledge_depth, experience_relevance) — currently simulated for demo purposes.
- Save results to localStorage and Download results as JSON from the UI.
- Client-side error handling with an in-app alert to view details for debugging.

Limitations:
- The current implementation is a UI-first demo; the analysis is simulated on the client and does not perform real NLP extract/analysis.
- To provide accurate AI-powered scoring, the system needs a backend that integrates with an AI model (OpenAI GPT or custom LLM) and parsing libraries for PDF/DOCX.
- File-based processing of large resumes remains limited by client memory; a server-side parser or streaming would be recommended for production.

Tools, APIs & Models used:
- Frontend: Next.js 13 (App Router), React 18, TypeScript.
- Styling: Tailwind CSS.
- UI primitives: Radix UI; Icons: Lucide React.
- Demo: Local Gradio app for quick shareable demo (optional deployment on Gradio/Streamlit for Python-based UI), and Vercel for hosting the Next.js app.
- AI Model: (Demo uses simulated analysis). To integrate AI, we recommend using OpenAI GPT (ChatGPT-like API or GPT-4/4o when available) for LLM-based scoring and extraction.
- Suggested parsing libraries for production: `pdfminer.six`, `textract`, `python-docx` (server), or `pdf.js`/`mammoth` in the Node environment.

Setup & Run (local dev):

1. Clone:
```powershell
git clone https://github.com/pushpa032/resume-structure-empty.git
cd resume-structure-empty
```
2. Install dependencies:
```powershell
npm install
# or if peer-dependency issues
npm install --legacy-peer-deps
```
3. Run the dev server
```powershell
npm run dev
start http://localhost:3000
```
4. Build for production
```powershell
npm run build
npm run start
```

To run the demo (Gradio) and create a public share link (temporary):
```powershell
python -m pip install -r demo/requirements.txt
python demo/gradio_demo.py --share
# Copy the share link printed by Gradio to use as the 'Working demo link' in forms
```

Production Deployment (Vercel):
1. Sign into Vercel, click "Create a project" > Import from GitHub.
2. Pick the repository `pushpa032/resume-structure-empty`, configure build command `npm run build` and output directory.
3. Deploy; copy the production URL Vercel provides and use it as the demo link.

If you want me to deploy the demo for you (e.g., to Vercel using a Vercel account linked to your GitHub), I can provide step-by-step instructions or show you how to configure it.


Notes:
- The `demo/gradio_demo.py` script is included to help you generate a quick shareable link (temporary) for forms. It runs a mock analysis to demonstrate the UI interaction.
- When you connect an AI model & backend, replace the mocked analysis with a server endpoint that uses LLMs (OpenAI or other models) to parse and score resumes accurately.

***
Copy & paste the items above in the online form fields. Replace the placeholder vercel link with the actual Vercel or Gradio share link once available.
