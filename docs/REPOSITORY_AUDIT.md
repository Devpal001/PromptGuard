# Repository Audit — PromptGuard

**Status**: Read-only audit. No application source code modified. No branch created. No commit/push/deploy performed.
**Remote (verified)**: https://github.com/Devpal001/PromptGuard.git, `main` @ `cdb6e9cfb008660a72efed51ca0f8107e4aa0f3d`
**Local working tree**: on `main`, no commits yet. Staged: initial project (see Git state). Unstaged: 5 frontend files.

## 1. Verified architecture & stack

- **Frontend**: React 18.2, Vite 5.0, React Router 6.20, axios 1.6.2, lucide-react 0.294. Entry `frontend/src/main.jsx`, root `frontend/index.html`, config `frontend/vite.config.js`.
- **Backend**: FastAPI 0.104.1, Pydantic 2.5.0, uvicorn 0.24.0, python-multipart 0.0.6, pypdf 3.17.1, pdfplumber 0.10.3, httpx 0.25.2, python-dotenv 1.0.0, cors 1.0.1. Entrypoint `backend/main.py` (shim) → `backend/app/main.py`. Routers: scan, test, scenarios. Modules: scanner, document_extractor, models.
- **Deployment**: Vercel services: web root `frontend/`, api root `backend/` entrypoint `main:app`; rewrites `/api/(.*)` → api, `/(.*)` → web. CORS allows localhost:5173 + `FRONTEND_ORIGIN`.
- **Storage**: none (no DB). Session-only results. Files processed in memory, not retained (verified in code paths).

## 2. API routes & contracts

- `GET /api/health` → `{status, service, version}`
- `POST /api/scan-text` body `{text}` (required, non-empty, ≤50000 chars) → `ScanResponse {verdict: Safe|Risky|Blocked, categories: string[], findings: [{category, rule, evidence_excerpt, explanation}], message, can_send_to_chatbot}`
- `POST /api/scan-file` multipart `file` (.pdf/.txt), ≤4 MB actual (docs say 10 MB), non-empty → `{filename, file_type, extracted_text, extraction_status, extraction_message, scan_result, warnings}`
- `POST /api/test-chatbot` body `{text, mode: demo|connected, target_config?, scenario_context?}` → `TestResponse {result_label, response, evidence, mode, model_identifier, timestamp, error_message?}`. Connected mode requires `endpoint_url` + `model_name` but returns Error (not implemented).
- `GET /api/scenarios` → list of 4 built-in scenarios.

## 3. Scanner implementation

`backend/app/modules/scanner.py` `Scanner`:

- `normalize_text`: strips `\u200b,\u200c,\u200d,\ufeff`.
- `scan`: regex finditer (IGNORECASE) over 7 rules; evidence excerpt ±30 chars from original text.
- Verdict: no findings → Safe; ≥3 findings or any `data_exfiltration` → Blocked; else Risky. `can_send_to_chatbot`: True only for Safe.

Seven rules (no stable IDs currently):

1. `instruction_override` — `ignore\s+(all\s+)?(previous|prior|above)\s+(instructions?|commands?|rules?)`
2. `instruction_override` — `disregard\s+(all\s+)?(previous|prior|above)`
3. `hidden_instruction_extraction` — `(show|reveal|tell)\s+.*(system\s+prompt|hidden\s+instructions?|original\s+instructions?)`
4. `role_hijacking` — `(you\s+are\s+now|act\s+as|pretend\s+to\s+be)\s+(dan|unrestricted|evil|malicious)`
5. `fake_system_developer` — `\[(system|developer|admin)\]`
6. `document_embedded` — `(important\s+system\s+instruction|system\s+instruction:)`
7. `data_exfiltration` — `(output|reveal|show)\s+.*(configuration|config|secrets?|canary|internal)`

## 4. Simulated chatbot behavior

`backend/app/routers/test.py`: demo mode returns canned responses based on keywords (canary leak simulation, "ignore previous"/"system prompt", "dan"/"unrestricted", default blocked). Connected mode unimplemented (returns Error). Canary constant `CANARY-PROTECT-98234`.

## 5. Document extraction

`backend/app/modules/document_extractor.py`: TXT (UTF-8 decode) and PDF (pypdf text extraction, no OCR). Router enforces 4 MB and non-empty; docs/verification-report claim 10 MB — discrepancy to resolve (docs inaccurate).

## 6. Git state

- Branch: `main`. Remote: none configured locally (verified via `git remote -v` empty). Remote URL provided by owner: https://github.com/Devpal001/PromptGuard.git (ls-remote confirmed `main` exists).
- No commits yet.
- Staged (all project files listed in `git status`).
- Unstaged modifications (5): `frontend/src/pages/DocumentScanner.jsx`, `frontend/src/pages/Results.jsx`, `frontend/src/pages/Settings.jsx`, `frontend/src/pages/TextPlayground.jsx`, `frontend/src/styles/App.css`.

## 7. Verified facts vs risks vs unknowns

**Verified**: stack versions, routes, scanner rules/verdict logic, 4MB enforcement, no DB, no tests, no lint scripts, Vercel config, demo simulator, connected mode stub.

**Risks**: docs state 10MB vs 4MB code; no automated tests; frontend unstaged edits uncommitted; heuristic verdict thresholds unmeasured; no rule IDs; CORS origin list; dependency versions (2024-era) maintenance.

**Unknowns**: actual Vercel runtime limits, whether remote `main` matches local; CI config (none found); whether frontend unstaged changes are intentional.

## 8. Proposed Phase 1 Detection Engine 2.0 plan

- Modularize `Scanner` into category rule modules with stable unique rule IDs.
- Preserve existing regex rules as first-pass signals.
- Add normalization + contextual benign checks (educational/quoted/defensive mentions).
- Add evidence spans (text, offsets where feasible) + rule_id + explanation.
- Versioned schema with `engine_version`; keep existing API fields; add fields additively.
- Labeled eval dataset (adversarial + benign lookalikes) + precision/recall/FPR/FNR.
- Regression tests for text and document scan workflows.
- Branch `feature/detection-engine-v2` only after approval.

## 9. Regression & compatibility requirements

- Preserve `/api/scan-text` and `/api/scan-file` response contracts (additive only).
- Frontend consumers must continue to render existing fields.
- Keep 4 MB (or document change) limit consistent.
- Run backend import + any added tests; frontend build.
- No unrelated redesign, provider integration, DB, or deploy in Phase 1.

## Approval gate

Audit complete. Awaiting explicit owner approval before creating `feature/detection-engine-v2` or modifying source.
