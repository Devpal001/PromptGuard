import re
from dataclasses import dataclass
from typing import List


@dataclass(frozen=True)
class Rule:
    rule_id: str
    category: str
    severity: str
    pattern: str
    explanation: str


RULES: List[Rule] = [
    Rule("DIRECT-OVERRIDE-001", "instruction_override", "high",
         r"ignore\s+(all\s+)?(previous|prior|above)\s+(instructions?|commands?|rules?)",
         "Attempt to override existing instructions or rules"),
    Rule("DIRECT-OVERRIDE-002", "instruction_override", "high",
         r"disregard\s+(all\s+)?(previous|prior|above)",
         "Attempt to disregard previous instructions"),
    Rule("SYSTEM-PROMPT-EXTRACTION-001", "hidden_instruction_extraction", "high",
         r"(show|reveal|tell)\s+.*(system\s+prompt|hidden\s+instructions?|original\s+instructions?)",
         "Attempt to extract system or hidden instructions"),
    Rule("ROLE-HIJACKING-001", "role_hijacking", "high",
         r"(you\s+are\s+now|act\s+as|pretend\s+to\s+be)\s+(dan|unrestricted|evil|malicious)",
         "Attempt to change chatbot role to unrestricted persona"),
    Rule("FAKE-SYSTEM-MARKER-001", "fake_system_developer", "medium",
         r"\[(system|developer|admin)\]",
         "Fake system or developer message tags in user input"),
    Rule("INDIRECT-DOCUMENT-001", "document_embedded", "medium",
         r"(important\s+system\s+instruction|system\s+instruction:)",
         "Instructions embedded in document-like content"),
    Rule("SENSITIVE-DATA-EXTRACTION-001", "data_exfiltration", "high",
         r"(output|reveal|show)\s+.*(configuration|config|secrets?|canary|internal)",
         "Attempt to extract internal configuration or secrets"),
    # Phase 1 additions
    Rule("TOOL-MANIPULATION-001", "tool_manipulation", "high",
         r"(call|invoke|execute|run)\s+(the\s+)?(tool|function|api)\s+.*(delete|transfer|send|email|pay|purchase)",
         "Attempt to induce unauthorized tool or function use"),
    Rule("INSTRUCTION-HIERARCHY-001", "instruction_hierarchy", "high",
         r"(your\s+(new|real|true)\s+(instructions?|rules?)|override\s+(your|the)\s+(rules?|instructions?))",
         "Attempt to make untrusted instructions outrank trusted instructions"),
    Rule("MULTI-TURN-001", "multi_turn_injection", "medium",
         r"(in\s+the\s+next\s+message|from\s+now\s+on|remember\s+this\s+for\s+later)",
         "Attack behavior distributed across multiple messages"),
]
