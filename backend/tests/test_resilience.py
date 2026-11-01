import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

import httpx
from fastapi.testclient import TestClient
from app.main import app
from app.providers.gemini import GeminiProvider, ProviderError

client = TestClient(app)

class FakeResp:
    def __init__(self, status_code, json_data=None, headers=None):
        self.status_code = status_code
        self._json = json_data if json_data is not None else {}
        self.headers = headers or {}
        self.text = ""
    def json(self):
        return self._json

def make_provider():
    return GeminiProvider()

def test_503_then_success(monkeypatch):
    p = make_provider()
    calls = {"n": 0}
    def fake_post(url, json=None, timeout=None):
        calls["n"] += 1
        if calls["n"] == 1:
            return FakeResp(503)
        return FakeResp(200, {"candidates": [{"content": {"parts": [{"text": "ok"}]}}]})
    monkeypatch.setattr("app.providers.gemini.httpx.post", fake_post)
    monkeypatch.setattr("app.providers.gemini.time.sleep", lambda x: None)
    r = p.send_prompt({"model": "m", "api_key": "secret"}, "hi")
    assert r["text"] == "ok"
    assert calls["n"] == 2

def test_503_exhausted(monkeypatch):
    p = make_provider()
    calls = {"n": 0}
    def fake_post(url, json=None, timeout=None):
        calls["n"] += 1
        return FakeResp(503)
    monkeypatch.setattr("app.providers.gemini.httpx.post", fake_post)
    monkeypatch.setattr("app.providers.gemini.time.sleep", lambda x: None)
    try:
        p.send_prompt({"model": "m", "api_key": "secret"}, "hi")
        assert False
    except ProviderError as e:
        assert "unavailable" in str(e).lower() or "503" in str(e)
    assert calls["n"] == 3

def test_timeout_then_success(monkeypatch):
    p = make_provider()
    calls = {"n": 0}
    def fake_post(url, json=None, timeout=None):
        calls["n"] += 1
        if calls["n"] == 1:
            raise httpx.TimeoutException("t")
        return FakeResp(200, {"candidates": [{"content": {"parts": [{"text": "ok"}]}}]})
    monkeypatch.setattr("app.providers.gemini.httpx.post", fake_post)
    monkeypatch.setattr("app.providers.gemini.time.sleep", lambda x: None)
    r = p.send_prompt({"model": "m", "api_key": "secret"}, "hi")
    assert r["text"] == "ok"
    assert calls["n"] == 2

def test_400_no_retry(monkeypatch):
    p = make_provider()
    calls = {"n": 0}
    def fake_post(url, json=None, timeout=None):
        calls["n"] += 1
        return FakeResp(400)
    monkeypatch.setattr("app.providers.gemini.httpx.post", fake_post)
    monkeypatch.setattr("app.providers.gemini.time.sleep", lambda x: None)
    try:
        p.send_prompt({"model": "m", "api_key": "secret"}, "hi")
        assert False
    except ProviderError:
        pass
    assert calls["n"] == 1

def test_401_no_retry(monkeypatch):
    p = make_provider()
    calls = {"n": 0}
    def fake_post(url, json=None, timeout=None):
        calls["n"] += 1
        return FakeResp(401)
    monkeypatch.setattr("app.providers.gemini.httpx.post", fake_post)
    monkeypatch.setattr("app.providers.gemini.time.sleep", lambda x: None)
    try:
        p.send_prompt({"model": "m", "api_key": "secret"}, "hi")
        assert False
    except ProviderError:
        pass
    assert calls["n"] == 1

def test_429_no_retry(monkeypatch):
    p = make_provider()
    calls = {"n": 0}
    def fake_post(url, json=None, timeout=None):
        calls["n"] += 1
        return FakeResp(429)
    monkeypatch.setattr("app.providers.gemini.httpx.post", fake_post)
    monkeypatch.setattr("app.providers.gemini.time.sleep", lambda x: None)
    try:
        p.send_prompt({"model": "m", "api_key": "secret"}, "hi")
        assert False
    except ProviderError:
        pass
    assert calls["n"] == 1

def test_retry_after(monkeypatch):
    p = make_provider()
    calls = {"n": 0}
    sleeps = []
    def fake_post(url, json=None, timeout=None):
        calls["n"] += 1
        if calls["n"] == 1:
            return FakeResp(503, headers={"Retry-After": "2"})
        return FakeResp(200, {"candidates": [{"content": {"parts": [{"text": "ok"}]}}]})
    monkeypatch.setattr("app.providers.gemini.httpx.post", fake_post)
    monkeypatch.setattr("app.providers.gemini.time.sleep", lambda x: sleeps.append(x))
    r = p.send_prompt({"model": "m", "api_key": "secret"}, "hi")
    assert r["text"] == "ok"
    assert any(s >= 2 for s in sleeps)

def test_gemini_model_env(monkeypatch):
    monkeypatch.setenv("GEMINI_MODEL", "custom-model")
    p = make_provider()
    def fake_post(url, json=None, timeout=None):
        assert "custom-model" in url
        return FakeResp(200, {"candidates": [{"content": {"parts": [{"text": "ok"}]}}]})
    monkeypatch.setattr("app.providers.gemini.httpx.post", fake_post)
    monkeypatch.setattr("app.providers.gemini.time.sleep", lambda x: None)
    r = p.send_prompt({"api_key": "secret"}, "hi")
    assert r["model"] == "custom-model"
    monkeypatch.delenv("GEMINI_MODEL", raising=False)
