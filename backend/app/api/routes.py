from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, List
import json, re
from app.agents.orchestrator import orchestrator_agent
from app.agents.language import language_node
from app.agents.assessment import assessment_node
from langchain_core.messages import HumanMessage

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    user_id: str
    context: Optional[dict] = None

class ChatResponse(BaseModel):
    response: str
    agent_used: str

class TranslateRequest(BaseModel):
    text: str
    source_language: str = "English"
    target_language: str = "Hindi"

class TranslateResponse(BaseModel):
    translation: str
    source_language: str
    target_language: str

def extract_content(raw) -> str:
    """Handle both string and list (Interactions API) response formats."""
    if isinstance(raw, list):
        return " ".join(part.get("text", "") for part in raw if isinstance(part, dict))
    return raw or ""

@router.post("/translate", response_model=TranslateResponse)
async def translate_endpoint(request: TranslateRequest):
    """Dedicated translation endpoint — goes directly to the language agent."""
    try:
        prompt = (
            f"Translate the following text from {request.source_language} to {request.target_language}:\n\n"
            f'"{request.text}"'
        )
        state = {
            "messages": [HumanMessage(content=prompt)],
            "user_id": "translator",
            "context": {},
        }
        result = await language_node(state)
        raw = result["messages"][-1].content
        return TranslateResponse(
            translation=extract_content(raw),
            source_language=request.source_language,
            target_language=request.target_language,
        )
    except Exception as e:
        return TranslateResponse(
            translation=f"Translation error: {str(e)}",
            source_language=request.source_language,
            target_language=request.target_language,
        )

class QuizRequest(BaseModel):
    topic: str
    num_questions: int = 5
    study_content: Optional[str] = None  # paste of studied content from notes

class QuizQuestion(BaseModel):
    question: str
    options: List[str]
    answer: str
    explanation: str

class QuizResponse(BaseModel):
    topic: str
    questions: List[QuizQuestion]

def parse_quiz_json(raw: str) -> List[dict]:
    """Robustly extract JSON array from AI response."""
    # Strip markdown code fences if present
    cleaned = re.sub(r"```(?:json)?", "", raw).strip().rstrip("`").strip()
    # Find the first [ ... ] block
    match = re.search(r"\[.*\]", cleaned, re.DOTALL)
    if match:
        return json.loads(match.group())
    return json.loads(cleaned)

@router.post("/quiz", response_model=QuizResponse)
async def quiz_endpoint(request: QuizRequest):
    """Generate MCQ quiz — optionally from saved study content."""
    try:
        if request.study_content:
            prompt = (
                f"Based on the following study notes, generate {request.num_questions} MCQ questions "
                f"about '{request.topic}':\n\n{request.study_content[:3000]}"
            )
        else:
            prompt = f"Generate {request.num_questions} MCQ questions about the topic: {request.topic}"

        state = {
            "messages": [HumanMessage(content=prompt)],
            "user_id": "quiz-generator",
            "context": {},
        }
        result = await assessment_node(state)
        raw = extract_content(result["messages"][-1].content)

        questions_data = parse_quiz_json(raw)
        questions = [
            QuizQuestion(
                question=q.get("question", ""),
                options=q.get("options", []),
                answer=q.get("answer", ""),
                explanation=q.get("explanation", ""),
            )
            for q in questions_data
            if q.get("question") and q.get("options") and q.get("answer")
        ]
        return QuizResponse(topic=request.topic, questions=questions)
    except Exception as e:
        return QuizResponse(
            topic=request.topic,
            questions=[QuizQuestion(
                question=f"Error generating quiz: {str(e)[:200]}",
                options=["Please try again", "Check the backend", "Verify API key", "Contact support"],
                answer="Please try again",
                explanation="An error occurred while generating the quiz."
            )]
        )

@router.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    try:
        result = await orchestrator_agent.ainvoke({
            "messages": [("user", request.message)],
            "user_id": request.user_id,
            "context": request.context or {}
        })
        
        raw_content = result["messages"][-1].content
        final_message = extract_content(raw_content)
        
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

