from langchain_google_genai import ChatGoogleGenerativeAI
import os

llm = ChatGoogleGenerativeAI(model="gemini-1.5-pro", api_key=os.getenv("GEMINI_API_KEY", "dummy_key"))

async def language_node(state):
    messages = state["messages"]
    system_prompt = (
        "You are an expert Language Agent. Your goal is to translate lessons, "
        "explain difficult words, and convert content into local languages. "
        "Support languages like Hindi, Bengali, Tamil, Telugu, etc."
    )
    
    response = await llm.ainvoke(
        [{"role": "system", "content": system_prompt}] + messages
    )
    return {"messages": [response]}
