from langchain_google_genai import ChatGoogleGenerativeAI
import os

llm = ChatGoogleGenerativeAI(model="gemini-1.5-pro", api_key=os.getenv("GEMINI_API_KEY", "dummy_key"))

async def parent_node(state):
    messages = state["messages"]
    system_prompt = (
        "You are an expert Parent Agent. Your goal is to help parents monitor their children's education. "
        "Provide simple summaries of academic progress, attendance tracking, and performance analytics. "
        "Use simple, non-jargon language to explain things to parents."
    )
    
    response = await llm.ainvoke(
        [{"role": "system", "content": system_prompt}] + messages
    )
    return {"messages": [response]}
