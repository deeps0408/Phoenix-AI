from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
from app.agents.orchestrator import orchestrator_agent

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    user_id: str
    context: Optional[dict] = None

class ChatResponse(BaseModel):
    response: str
    agent_used: str

@router.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    try:
        # Call the LangGraph orchestrator
        result = await orchestrator_agent.ainvoke({
            "messages": [("user", request.message)],
            "user_id": request.user_id,
            "context": request.context or {}
        })
        
        # Extract the final AI message — handle both string and list (Interactions API) formats
        raw_content = result["messages"][-1].content
        if isinstance(raw_content, list):
            # New Interactions API format: [{'type': 'text', 'text': '...'}]
            final_message = " ".join(
                part.get("text", "") for part in raw_content if isinstance(part, dict)
            )
        else:
            final_message = raw_content
        
        return ChatResponse(response=final_message, agent_used="orchestrator")
    except Exception as e:
        error_msg = str(e)
        if "API key" in error_msg or "INVALID_ARGUMENT" in error_msg or "API_KEY_INVALID" in error_msg:
            return ChatResponse(
                response="❌ Invalid or missing Gemini API key. Please update your GEMINI_API_KEY in backend/.env with a valid key from https://aistudio.google.com/app/apikey", 
                agent_used="System"
            )
        if "NOT_FOUND" in error_msg or "no longer available" in error_msg:
            return ChatResponse(
                response="❌ The AI model is unavailable. Please contact support.", 
                agent_used="System"
            )
        return ChatResponse(
            response=f"Backend Error: {error_msg}", 
            agent_used="System"
        )
