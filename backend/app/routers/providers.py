from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, Dict, Any
from app.providers.gemini import GeminiProvider

router = APIRouter()
provider = GeminiProvider()

class ProviderTestRequest(BaseModel):
    provider: str = "gemini"
    model: Optional[str] = None
    api_key: Optional[str] = None

@router.get("/providers")
async def list_providers():
    return {"providers": [{"name": "gemini", "models": ["gemini-flash-latest"]}]}

@router.post("/providers/test")
async def test_provider(request: ProviderTestRequest):
    config = {"model": request.model or "gemini-1.5-flash"}
    if request.api_key:
        config["api_key"] = request.api_key
    result = provider.test_connection(config)
    if not result.get("ok"):
        raise HTTPException(status_code=400, detail=result.get("error", "connection failed"))
    return result
