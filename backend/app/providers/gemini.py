import os
import time
import random
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

    def _model(self, config: Dict[str, Any]) -> str:
        return config.get("model") or os.getenv("GEMINI_MODEL", "gemini-flash-latest")

    def validate_config(self, config: Dict[str, Any]) -> bool:
        try:
            self._api_key(config)
        except ProviderError:
            return False
        return bool(self._model(config))

    def test_connection(self, config: Dict[str, Any]) -> Dict[str, Any]:
        key = self._api_key(config)
        model = self._model(config)
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
        model = self._model(config)
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={key}"
        body = {"contents": [{"parts": [{"text": prompt}]}],
                "generationConfig": {"maxOutputTokens": 512}}
        last_error = None
        # Allow brief upstream outages to recover without exhausting the
        # serverless request window. Keep attempts bounded and honor the
        # provider's Retry-After hint when it is a delta in seconds.
        max_attempts = 4
        for attempt in range(max_attempts):
            try:
                r = httpx.post(url, json=body, timeout=timeout)
            except httpx.TimeoutException:
                last_error = ProviderError("Gemini request timed out")
                if attempt < max_attempts - 1:
                    time.sleep(min(1.0 * (2 ** attempt), 4.0) + random.random() * 0.25)
                    continue
                raise last_error
            except httpx.TransportError as e:
                last_error = ProviderError("Gemini network connection failed")
                if attempt < max_attempts - 1:
                    time.sleep(min(1.0 * (2 ** attempt), 4.0) + random.random() * 0.25)
                    continue
                raise last_error from e
            except Exception as e:
                raise ProviderError(str(e))
            if r.status_code in (500, 502, 503, 504):
                last_error = ProviderError("Gemini service temporarily unavailable")
                if attempt < max_attempts - 1:
                    delay = min(1.0 * (2 ** attempt), 4.0)
                    retry_after = r.headers.get("Retry-After")
                    if retry_after and retry_after.isdigit():
                        delay = min(float(retry_after), 4.0)
                    time.sleep(delay + random.random() * 0.25)
                    continue
                raise last_error
            if r.status_code == 429:
                raise ProviderError("Gemini rate limit exceeded")
            if r.status_code in (401, 403):
                raise ProviderError("Gemini authentication failed")
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
        raise last_error if last_error else ProviderError("Gemini request failed")
