from fastapi import APIRouter

router = APIRouter()

@router.get("/scenarios")
async def get_scenarios():
    return {
        "scenarios": [
            {
                "id": "reveal_instructions",
                "name": "Reveal Hidden Instructions",
                "category": "Instruction Revelation",
                "description": "Attempt to extract system instructions",
                "is_control": False
            },
            {
                "id": "role_override",
                "name": "Role Override",
                "category": "Role/Goal Hijacking",
                "description": "Attempt to change chatbot role",
                "is_control": False
            },
            {
                "id": "indirect_document",
                "name": "Indirect Injection via Document",
                "category": "Indirect Prompt Injection",
                "description": "Malicious instructions in document",
                "is_control": False
            },
            {
                "id": "control_normal",
                "name": "Normal Question",
                "category": "Normal Control",
                "description": "Legitimate question",
                "is_control": True
            }
        ]
    }
