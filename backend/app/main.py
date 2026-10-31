from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI(
    title="AI Prompt Injection Defense Tester API",
    description="Backend API for testing chatbot defenses against prompt injection",
    version="1.0.0"
)

# CORS configuration - restrict to local frontend
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

# Add configured deployment origins if any
if os.getenv("FRONTEND_ORIGIN"):
    origins.append(os.getenv("FRONTEND_ORIGIN"))

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "prompt-injection-defense-tester",
        "version": "1.0.0"
    }

# Import routers
from app.routers import scan, test, scenarios

app.include_router(scan.router, prefix="/api", tags=["scan"])
app.include_router(test.router, prefix="/api", tags=["test"])
app.include_router(scenarios.router, prefix="/api", tags=["scenarios"])
