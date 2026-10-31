import re
from typing import List, Dict, Any

class Scanner:
    def __init__(self):
        self.rules = [
            {
                "category": "instruction_override",
                "pattern": r"ignore\s+(all\s+)?(previous|prior|above)\s+(instructions?|commands?|rules?)",
                "explanation": "Attempt to override existing instructions or rules"
            },
            {
                "category": "instruction_override",
                "pattern": r"disregard\s+(all\s+)?(previous|prior|above)",
                "explanation": "Attempt to disregard previous instructions"
            },
            {
                "category": "hidden_instruction_extraction",
                "pattern": r"(show|reveal|tell)\s+.*(system\s+prompt|hidden\s+instructions?|original\s+instructions?)",
                "explanation": "Attempt to extract system or hidden instructions"
            },
            {
                "category": "role_hijacking",
                "pattern": r"(you\s+are\s+now|act\s+as|pretend\s+to\s+be)\s+(dan|unrestricted|evil|malicious)",
                "explanation": "Attempt to change chatbot role to unrestricted persona"
            },
            {
                "category": "fake_system_developer",
                "pattern": r"\[(system|developer|admin)\]",
                "explanation": "Fake system or developer message tags in user input"
            },
            {
                "category": "document_embedded",
                "pattern": r"(important\s+system\s+instruction|system\s+instruction:)",
                "explanation": "Instructions embedded in document-like content"
            },
            {
                "category": "data_exfiltration",
                "pattern": r"(output|reveal|show)\s+.*(configuration|config|secrets?|canary|internal)",
                "explanation": "Attempt to extract internal configuration or secrets"
            }
        ]
    
    def normalize_text(self, text: str) -> str:
        """Normalize text for scanning while preserving original"""
        # Normalize common invisible unicode
        text = text.replace('\u200b', '').replace('\u200c', '').replace('\u200d', '')
        text = text.replace('\ufeff', '')
        return text
    
    def scan(self, text: str) -> Dict[str, Any]:
        """Scan text for prompt injection patterns"""
        normalized = self.normalize_text(text)
        findings = []
        categories = set()
        
        for rule in self.rules:
            matches = re.finditer(rule["pattern"], normalized, re.IGNORECASE)
            for match in matches:
                categories.add(rule["category"])
                # Extract evidence excerpt
                start = max(0, match.start() - 30)
                end = min(len(text), match.end() + 30)
                excerpt = text[start:end]
                
                findings.append({
                    "category": rule["category"],
                    "rule": rule["pattern"],
                    "evidence_excerpt": excerpt,
                    "explanation": rule["explanation"]
                })
        
        if not findings:
            return {
                "verdict": "Safe",
                "categories": [],
                "findings": [],
                "message": "No supported suspicious patterns found. This does not guarantee safety.",
                "can_send_to_chatbot": True
            }
        elif len(findings) >= 3 or any(f["category"] in ["data_exfiltration"] for f in findings):
            return {
                "verdict": "Blocked",
                "categories": list(categories),
                "findings": findings,
                "message": "Scanner blocked this content from being sent to the target chatbot.",
                "can_send_to_chatbot": False
            }
        else:
            return {
                "verdict": "Risky",
                "categories": list(categories),
                "findings": findings,
                "message": "Suspicious patterns found. Review evidence and confirm before testing against chatbot.",
                "can_send_to_chatbot": False  # Requires confirmation
            }
