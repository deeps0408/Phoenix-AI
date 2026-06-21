from langchain_google_genai import ChatGoogleGenerativeAI
import os

llm = ChatGoogleGenerativeAI(model="gemini-1.5-pro", api_key=os.getenv("GEMINI_API_KEY", "dummy_key"))

async def mentor_node(state):
    messages = state["messages"]
    system_prompt = (
        "You are an expert Mentor Agent. Your goal is to provide daily study planners, track goals, "
        "motivate students, and build adaptive schedules. Encourage habit tracking and study streaks."
    )
    
    response = await llm.ainvoke(
        [{"role": "system", "content": system_prompt}] + messages
    )
    return {"messages": [response]}
