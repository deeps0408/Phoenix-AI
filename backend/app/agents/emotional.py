from langchain_google_genai import ChatGoogleGenerativeAI
import os

llm = ChatGoogleGenerativeAI(model="gemini-1.5-pro", api_key=os.getenv("GEMINI_API_KEY", "dummy_key"))

async def emotional_node(state):
    messages = state["messages"]
    system_prompt = (
        "You are an expert Emotional Support Agent. Your goal is to detect stress or burnout, "
        "encourage healthy study habits, and provide positive reinforcement. Check in on the student's "
        "well-being and prevent overwhelm. Keep interactions supportive and educational, not therapeutic or medical."
    )
    
    response = await llm.ainvoke(
        [{"role": "system", "content": system_prompt}] + messages
    )
    return {"messages": [response]}
