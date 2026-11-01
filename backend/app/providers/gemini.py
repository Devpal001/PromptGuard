import os
import httpx
from typing import Dict, Any
from .base import BaseProvider, ProviderError


class GeminiProvider(BaseProvider):
    name = "gemini"

    def _api_key(self, config: Dict[str, Any]) -> str:
        key = config.get("api_key") or os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
        if not key:
            raise ProviderError("Gemini API key not configured")
        return key

    def validate_config(self, config: Dict[str, Any]) -> bool:
        try:
            self._api_key(config)
        except ProviderError:
            return False
        return bool(config.get("model"))

    def test_connection(self, config: Dict[str, Any]) -> Dict[str, Any]:
        key = self._api_key(config)
        model = config.get("model", "gemini-1.5-flash")
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}?key={key}"
        try:
            r = httpx.get(url, timeout=10.0)
            if r.status_code == 200:
                return {"ok": True, "provider": self.name, "model": model}
            return {"ok": False, "provider": self.name, "model": model, "error": f"HTTP {r.status_code}"}
        except Exception as e:
            return {"ok": False, "provider": self.name, "model": model, "error": str(e)}

    def send_prompt(self, config: Dict[str, Any], prompt: str, timeout: float = 30.0) -> Dict[str, Any]:
        key = self._api_key(config)
        model = config.get("model", "gemini-1.5-flash")
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={key}"
        body = {"contents": [{"parts": [{"text": prompt}]}],
                "generationConfig": {"maxOutputTokens": 512}}
        try:
            r = httpx.post(url, json=body, timeout=timeout)
        except httpx.TimeoutException:
            raise ProviderError("Gemini request timed out")
        except Exception as e:
            raise ProviderError(str(e))
        if r.status_code == 401 or r.status_code == 403:
            raise ProviderError("Gemini authentication failed")
        if r.status_code == 429:
            raise ProviderError("Gemini rate limit exceeded")
        if r.status_code >= 400:
            raise ProviderError(f"Gemini error HTTP {r.status_code}")
        try:
            data = r.json()
        except Exception:
            raise ProviderError("Malformed Gemini response")
        text = ""
        try:
            text = data["candidates"][0]["content"]["parts"][0]["text"]
        except (KeyError, IndexError, TypeError):
            raise ProviderError("Malformed Gemini response")
        return {"provider": self.name, "model": model, "text": text, "raw": data}
