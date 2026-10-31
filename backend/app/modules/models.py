from pydantic import BaseModel
from typing import List, Optional

class ScanRequest(BaseModel):
    text: str

class Finding(BaseModel):
    category: str
    rule: str
    evidence_excerpt: str
    explanation: str

class ScanResponse(BaseModel):
    verdict: str  # Safe, Risky, Blocked
    categories: List[str]
    findings: List[Finding]
    message: str
    can_send_to_chatbot: bool

class TestRequest(BaseModel):
    text: str
    mode: str  # demo or connected
    target_config: Optional[dict] = None
    scenario_context: Optional[dict] = None

class TestResponse(BaseModel):
    result_label: str
    response: str
    evidence: List[str]
    mode: str
    model_identifier: str
    timestamp: str
    error_message: Optional[str] = None
