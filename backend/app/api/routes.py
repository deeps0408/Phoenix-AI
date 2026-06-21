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
        
        # Extract the final AI message
        final_message = result["messages"][-1].content
        
        return ChatResponse(response=final_message, agent_used="orchestrator")
    except Exception as e:
        error_msg = str(e)
        if "API key" in error_msg or "INVALID_ARGUMENT" in error_msg:
            return ChatResponse(
                response="Please add your GEMINI_API_KEY to the backend/.env file to start chatting!", 
                agent_used="System"
            )
        return ChatResponse(
            response=f"Backend Error: {error_msg}", 
            agent_used="System"
        )
