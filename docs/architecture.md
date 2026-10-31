# Architecture

## System Context
React frontend (Vite) communicates with FastAPI backend via REST API.

## Components
- **Frontend**: React UI with pages for overview, text playground, document scanner, results, settings
- **Backend**: FastAPI with routers for scan, test, scenarios
- **Scanner Module**: Rule-based pattern detection
- **Document Extractor**: PDF/TXT extraction
- **Adapters**: Demo and Connected chatbot adapters
- **Evaluator**: Chatbot response evaluation

## Data Flow
1. User inputs text/file in frontend
2. Frontend calls backend API
3. Backend scans/extracts and returns results
4. User approves and tests against chatbot if allowed
5. Results displayed separately

## Trust Boundaries
- Frontend is untrusted (user input)
- Backend validates all inputs
- Credentials never leave backend
- Scanner and chatbot evaluation are separate
- Files not retained
