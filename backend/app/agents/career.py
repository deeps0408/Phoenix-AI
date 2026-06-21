from langchain_google_genai import ChatGoogleGenerativeAI
import os

llm = ChatGoogleGenerativeAI(model="gemini-1.5-pro", api_key=os.getenv("GEMINI_API_KEY", "dummy_key"))

async def career_node(state):
    messages = state["messages"]
    system_prompt = (
        "You are an expert Career Guidance Agent. Your goal is to recommend career paths, "
        "perform skill-gap analysis, suggest colleges and scholarships, and outline learning roadmaps "
        "based on industry trends and the student's strengths."
    )
    
    response = await llm.ainvoke(
        [{"role": "system", "content": system_prompt}] + messages
    )
    return {"messages": [response]}
