# Security and Privacy

## Threat Model
- Protect against accidental testing of unauthorized systems
- Prevent credential exposure
- Limit file processing risks
- Avoid persistent storage of sensitive data

## Mitigations
- Backend-only credentials
- File size/type validation
- No file retention
- CORS restrictions
- Input length limits
- Separate scanner and chatbot evaluation
- Clear warnings and confirmations

## Not Protected
- User's local environment security
- Endpoints tested in connected mode
- Novel attack techniques not in rules

## Data Handling
- No telemetry
- Session-only history
- Exports user-controlled
- No secrets in logs/reports
