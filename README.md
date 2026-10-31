# AI Prompt Injection Chatbot Defense Tester

Educational application to test chatbot resistance to prompt injection with scanner functionality.

## Features

- **Scanner**: Analyze typed text and PDF/TXT documents for prompt injection patterns
- **Two-Layer Results**: Separate scanner results (Safe/Risky/Blocked) from chatbot test results
- **Demo Mode**: Works without credentials
- **Connected Mode**: Optional OpenAI-compatible endpoint support
- **Evidence-Based**: Clear evidence and categories for all findings

## Tech Stack

- **Frontend**: React + Vite
- **Backend**: FastAPI (Python)
- **Scanner**: Rule-based pattern detection
- **Document Extraction**: pypdf for PDF, built-in for TXT

## Quick Start

### One Command (Recommended)
From the project root:
```bash
npm run dev
```

This starts both the FastAPI backend (http://127.0.0.1:8000) and React frontend (http://localhost:5173) concurrently. Press Ctrl+C to stop both services.

### One-Time Setup

**Backend dependencies:**
```bash
cd backend
pip install -r requirements.txt
```
Or use a project-local virtual environment in `backend/.venv/` or `venv/` (the launcher will auto-detect it).

**Frontend dependencies:**
```bash
cd frontend
npm install
```

### Manual Start (Alternative)
If you need to start services separately:

**Backend:**
```bash
cd backend
python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

**Frontend:**
```bash
cd frontend
npm run dev
```

Access at http://localhost:5173  
API docs at http://127.0.0.1:8000/docs  
Health check at http://127.0.0.1:8000/api/health

## Deploy to Vercel

The repository is configured as one Vercel project with two services: a Vite web service and a FastAPI service. Both are served under one domain, so the frontend can keep calling the `/api/...` endpoints on the same origin.

1. Import `Devpal001/PromptGuard` from the Vercel dashboard.
2. Keep the project root at the repository root so Vercel can read `vercel.json`.
3. Set the project's Framework Preset to **Services** in **Settings → Build and Deployment**.
4. Deploy. Then confirm the API at `/api/health` and test text and document scanning.

Vercel Services availability depends on the Vercel account. If the Services framework is not available, request access from Vercel or deploy the frontend and API as separate projects.

Document uploads are limited to 4 MB so the file plus multipart request data stays below Vercel Functions' 4.5 MB request-body limit.

## Result Labels

### Scanner Results
- **Safe**: No patterns found (does not guarantee safety)
- **Risky**: Suspicious patterns found - requires confirmation before testing
- **Blocked**: Scanner blocked content from being sent

### Chatbot Test Results
- **Blocked**: Chatbot resisted the attack
- **Possible failure**: Evidence of injection success or canary exposure
- **Needs review**: Ambiguous response
- **Error**: Could not reach target

## Privacy & Security
- Credentials kept on backend only
- No persistent storage
- Files not retained after processing
- CORS restricted to local origins
- No telemetry

## Limitations
- Rule-based scanner is a screening aid, not complete defense
- No OCR for image-based PDFs
- Demo mode is simulated
- Single-turn testing only
- Educational purpose only
