"""Vercel entry point and direct-run shim for the complete FastAPI application."""

from app.main import app

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000)
