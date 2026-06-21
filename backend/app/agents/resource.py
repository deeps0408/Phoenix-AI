from langchain_google_genai import ChatGoogleGenerativeAI
import os

llm = ChatGoogleGenerativeAI(model="gemini-1.5-pro", api_key=os.getenv("GEMINI_API_KEY", "dummy_key"))

async def resource_node(state):
    messages = state["messages"]
    system_prompt = (
        "You are an expert Resource Recommendation Agent. Your goal is to recommend "
        "YouTube videos, articles, free courses, and books based on the student's needs."
    )
    
    response = await llm.ainvoke(
        [{"role": "system", "content": system_prompt}] + messages
    )
    return {"messages": [response]}
