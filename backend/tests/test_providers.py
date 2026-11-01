import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

import httpx
from fastapi.testclient import TestClient
from app.main import app
from app.providers.gemini import GeminiProvider, ProviderError

client = TestClient(app)

class FakeResp:
    def __init__(self, status_code, json_data=None, text=""):
        self.status_code = status_code
        self._json = json_data if json_data is not None else {}
        self.text = text
    def json(self):
        return self._json

def make_provider():
    return GeminiProvider()

def test_success(monkeypatch):
    p = make_provider()
    def fake_post(url, json=None, timeout=None):
        return FakeResp(200, {"candidates": [{"content": {"parts": [{"text": "hello"}]}}]})
    monkeypatch.setattr("app.providers.gemini.httpx.post", fake_post)
    r = p.send_prompt({"model": "gemini-1.5-flash", "api_key": "secret"}, "hi")
    assert r["text"] == "hello"
    assert r["model"] == "gemini-1.5-flash"

def test_missing_key():
    p = make_provider()
    try:
        p.send_prompt({"model": "m"}, "hi")
        assert False
    except ProviderError as e:
        assert "not configured" in str(e)
        assert "secret" not in str(e)

def test_invalid_key(monkeypatch):
    p = make_provider()
    def fake_post(url, json=None, timeout=None):
        return FakeResp(401)
    monkeypatch.setattr("app.providers.gemini.httpx.post", fake_post)
    try:
        p.send_prompt({"model": "m", "api_key": "secret"}, "hi")
        assert False
    except ProviderError as e:
        assert "auth" in str(e).lower() or "401" in str(e)
        assert "secret" not in str(e)

def test_rate_limit(monkeypatch):
    p = make_provider()
    def fake_post(url, json=None, timeout=None):
        return FakeResp(429)
    monkeypatch.setattr("app.providers.gemini.httpx.post", fake_post)
    try:
        p.send_prompt({"model": "m", "api_key": "secret"}, "hi")
        assert False
    except ProviderError as e:
        assert "rate" in str(e).lower() or "429" in str(e)

def test_invalid_request(monkeypatch):
    p = make_provider()
    def fake_post(url, json=None, timeout=None):
        return FakeResp(400)
    monkeypatch.setattr("app.providers.gemini.httpx.post", fake_post)
    try:
        p.send_prompt({"model": "m", "api_key": "secret"}, "hi")
        assert False
    except ProviderError as e:
        assert "400" in str(e)

def test_timeout(monkeypatch):
    p = make_provider()
    def fake_post(url, json=None, timeout=None):
        raise httpx.TimeoutException("t")
    monkeypatch.setattr("app.providers.gemini.httpx.post", fake_post)
    try:
        p.send_prompt({"model": "m", "api_key": "secret"}, "hi")
        assert False
    except ProviderError as e:
        assert "timed out" in str(e).lower()

def test_network_failure(monkeypatch):
    p = make_provider()
    def fake_post(url, json=None, timeout=None):
        raise Exception("conn refused")
    monkeypatch.setattr("app.providers.gemini.httpx.post", fake_post)
    try:
        p.send_prompt({"model": "m", "api_key": "secret"}, "hi")
        assert False
    except ProviderError:
        pass

def test_malformed_json(monkeypatch):
    p = make_provider()
    def fake_post(url, json=None, timeout=None):
        class R:
            status_code = 200
            def json(self):
                raise ValueError("bad")
        return R()
    monkeypatch.setattr("app.providers.gemini.httpx.post", fake_post)
    try:
        p.send_prompt({"model": "m", "api_key": "secret"}, "hi")
        assert False
    except ProviderError:
        pass

def test_missing_fields(monkeypatch):
    p = make_provider()
    def fake_post(url, json=None, timeout=None):
        return FakeResp(200, {"candidates": []})
    monkeypatch.setattr("app.providers.gemini.httpx.post", fake_post)
    try:
        p.send_prompt({"model": "m", "api_key": "secret"}, "hi")
        assert False
    except ProviderError:
        pass

def test_token_limit(monkeypatch):
    p = make_provider()
    captured = {}
    def fake_post(url, json=None, timeout=None):
        captured["body"] = json
        return FakeResp(200, {"candidates": [{"content": {"parts": [{"text": "x"}]}}]})
    monkeypatch.setattr("app.providers.gemini.httpx.post", fake_post)
    p.send_prompt({"model": "m", "api_key": "secret"}, "hi")
    assert captured["body"]["generationConfig"]["maxOutputTokens"] == 512

def test_redaction(monkeypatch):
    p = make_provider()
    def fake_post(url, json=None, timeout=None):
        return FakeResp(401)
    monkeypatch.setattr("app.providers.gemini.httpx.post", fake_post)
    try:
        p.send_prompt({"model": "m", "api_key": "TOPSECRET"}, "hi")
    except ProviderError as e:
        assert "TOPSECRET" not in str(e)

def test_normalization(monkeypatch):
    p = make_provider()
    def fake_post(url, json=None, timeout=None):
        return FakeResp(200, {"candidates": [{"content": {"parts": [{"text": "ok"}]}}]})
    monkeypatch.setattr("app.providers.gemini.httpx.post", fake_post)
    r = p.send_prompt({"model": "m", "api_key": "k"}, "hi")
    assert set(r.keys()) >= {"provider", "model", "text"}

def test_configurable_model(monkeypatch):
    p = make_provider()
    def fake_post(url, json=None, timeout=None):
        assert "gemini-pro" in url
        return FakeResp(200, {"candidates": [{"content": {"parts": [{"text": "ok"}]}}]})
    monkeypatch.setattr("app.providers.gemini.httpx.post", fake_post)
    r = p.send_prompt({"model": "gemini-pro", "api_key": "k"}, "hi")
    assert r["model"] == "gemini-pro"

def test_providers_endpoint():
    r = client.get("/api/providers")
    assert r.status_code == 200
    assert "providers" in r.json()

def test_demo_mode_still_works():
    r = client.post("/api/test-chatbot", json={"text": "hello", "mode": "demo"})
    assert r.status_code == 200
    assert r.json()["mode"] == "demo"

def test_connected_mode_invokes_provider(monkeypatch):
    def fake_post(url, json=None, timeout=None):
        return FakeResp(200, {"candidates": [{"content": {"parts": [{"text": "real"}]}}]})
    monkeypatch.setattr("app.providers.gemini.httpx.post", fake_post)
    r = client.post("/api/test-chatbot", json={"text": "hello", "mode": "connected", "target_config": {"model_name": "gemini-1.5-flash", "api_key": "k"}})
    assert r.status_code == 200
    assert r.json()["response"] == "real"
