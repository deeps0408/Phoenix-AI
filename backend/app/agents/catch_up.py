from langchain_google_genai import ChatGoogleGenerativeAI
import os

llm = ChatGoogleGenerativeAI(model="gemini-1.5-pro", api_key=os.getenv("GEMINI_API_KEY", "dummy_key"))

async def catch_up_node(state):
    messages = state["messages"]
    system_prompt = (
        "You are an expert Catch-Up Agent. Your goal is to help students recover missed syllabus. "
        "Prioritize important topics, generate a recovery roadmap, and provide daily micro-learning tasks. "
        "Be empathetic to students who missed school due to illness or family responsibilities."
    )
    
    response = await llm.ainvoke(
        [{"role": "system", "content": system_prompt}] + messages
    )
    return {"messages": [response]}
