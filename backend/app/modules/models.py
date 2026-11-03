from pydantic import BaseModel
from typing import List, Optional, Literal

class ScanRequest(BaseModel):
    text: str

class Finding(BaseModel):
    category: str
    rule: str
    evidence_excerpt: str
    explanation: str
    rule_id: Optional[str] = None
    severity: Optional[str] = None
    evidence_start: Optional[int] = None
    evidence_end: Optional[int] = None

class ScanResponse(BaseModel):
    verdict: str  # Safe, Risky, Blocked
    categories: List[str]
    findings: List[Finding]
    message: str
    can_send_to_chatbot: bool
    risk_level: Optional[str] = None
    engine_version: Optional[str] = None

class TestRequest(BaseModel):
    text: str
    mode: Literal["demo"] = "demo"
    scenario_context: Optional[dict] = None

class TestResponse(BaseModel):
    result_label: str
    response: str
    evidence: List[str]
    mode: str
    model_identifier: str
    timestamp: str
    error_message: Optional[str] = None

