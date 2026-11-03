# API Reference

## Base URL
`http://localhost:8001/api`

## Endpoints

### GET /api/health
Health check
```json
{
  "status": "healthy",
  "service": "prompt-injection-defense-tester",
  "version": "1.0.0"
}
```

### POST /api/scan-text
Scan typed text
```json
{
  "text": "string"
}
```
Response:
```json
{
  "verdict": "Safe|Risky|Blocked",
  "categories": ["string"],
  "findings": [{"category": "string", "rule": "string", "evidence_excerpt": "string", "explanation": "string"}],
  "message": "string",
  "can_send_to_chatbot": boolean
}
```

### POST /api/scan-file
Scan PDF/TXT file (multipart/form-data)
- file: PDF or TXT, max 10MB

### POST /api/test-chatbot
Test against chatbot
```json
{
  "text": "string",
  "mode": "demo|connected",
  "target_config": {"endpoint_url": "string", "model_name": "string"},
  "scenario_context": {}
}
```

### GET /api/scenarios
Get built-in scenarios
```json
{
  "scenarios": [{"id": "string", "name": "string", "category": "string", "description": "string", "is_control": boolean}]
}
```
