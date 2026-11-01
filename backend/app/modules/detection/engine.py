import re
from typing import Dict, Any, List

from .rules import RULES, Rule


class DetectionEngine:
    ENGINE_VERSION = "2.0.0"

    ZERO_WIDTH = ("\u200b", "\u200c", "\u200d", "\ufeff")

    def normalize(self, text: str):
        # Returns (normalized_text, index_map) where index_map[i] is original index of normalized[i]
        out = []
        index_map = []
        for i, ch in enumerate(text):
            if ch in self.ZERO_WIDTH:
                continue
            out.append(ch)
            index_map.append(i)
        return "".join(out), index_map

    def _in_quotes(self, text: str, start: int, end: int) -> bool:
        # crude: count quotes before start
        before = text[:start]
        return before.count('"') % 2 == 1 or before.count("'") % 2 == 1

    def _benign_context(self, text: str, start: int) -> bool:
        window = text[max(0, start - 60):start].lower()
        markers = ("example", "quoted", "for educational", "defensive", "analysis of")
        return any(m in window for m in markers)

    def scan(self, text: str) -> Dict[str, Any]:
        if not isinstance(text, str):
            text = "" if text is None else str(text)
        normalized, index_map = self.normalize(text)
        findings: List[dict] = []
        categories = set()

        for rule in RULES:
            for match in re.finditer(rule.pattern, normalized, re.IGNORECASE):
                # map to original offsets
                n_start, n_end = match.start(), match.end()
                o_start = index_map[n_start] if n_start < len(index_map) else len(text)
                o_end = index_map[n_end - 1] + 1 if n_end > 0 and n_end - 1 < len(index_map) else len(text)
                # Contextual suppression removed: quoted educational mentions are
                # still recorded as findings to avoid hiding genuine attacks.
                categories.add(rule.category)
                excerpt_start = max(0, o_start - 30)
                excerpt_end = min(len(text), o_end + 30)
                findings.append({
                    "category": rule.category,
                    "rule": rule.pattern,
                    "rule_id": rule.rule_id,
                    "severity": rule.severity,
                    "evidence_excerpt": text[excerpt_start:excerpt_end],
                    "evidence_start": o_start,
                    "evidence_end": o_end,
                    "explanation": rule.explanation,
                })

        if not findings:
            return {
                "verdict": "Safe",
                "risk_level": "low",
                "categories": [],
                "findings": [],
                "message": "No supported suspicious patterns found. This does not guarantee safety.",
                "can_send_to_chatbot": True,
                "engine_version": self.ENGINE_VERSION,
            }
        elif len(findings) >= 3 or any(f["category"] == "data_exfiltration" for f in findings):
            return {
                "verdict": "Blocked",
                "risk_level": "high",
                "categories": list(categories),
                "findings": findings,
                "message": "Scanner blocked this content from being sent to the target chatbot.",
                "can_send_to_chatbot": False,
                "engine_version": self.ENGINE_VERSION,
            }
        else:
            return {
                "verdict": "Risky",
                "risk_level": "medium",
                "categories": list(categories),
                "findings": findings,
                "message": "Suspicious patterns found. Review evidence and confirm before testing against chatbot.",
                "can_send_to_chatbot": False,
                "engine_version": self.ENGINE_VERSION,
            }


# Backward-compatible alias expected by existing code
Scanner = DetectionEngine
