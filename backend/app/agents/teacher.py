from langchain_google_genai import ChatGoogleGenerativeAI
import os

llm = ChatGoogleGenerativeAI(model="gemini-1.5-pro", api_key=os.getenv("GEMINI_API_KEY", "dummy_key"))

async def teacher_node(state):
    messages = state["messages"]
    system_prompt = (
        "You are an expert AI Teacher. Your goal is to explain topics simply, clearly, and adaptively. "
        "Use real-world examples. Ensure no child is left behind."
    )
    
    response = await llm.ainvoke(
        [{"role": "system", "content": system_prompt}] + messages
    )
    return {"messages": [response]}
