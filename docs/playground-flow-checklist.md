# Text Playground Flow Checklist

## State variables
- text, scanResult, chatbotResult, loading, showConfirm, error
- mode, providerStatus, providerInfo, testingProvider

## Handlers
- scanText, testChatbot, testProvider, resetSample

## API calls
- POST /api/scan-text
- POST /api/test-chatbot
- POST /api/providers/test

## Flow checklist
- [ ] Type text
- [ ] Scan input -> results appear
- [ ] Review findings
- [ ] Risky text -> confirmation shown
- [ ] Send to demo target
- [ ] Send to connected target
- [ ] Error states
- [ ] Empty states
