from langchain_google_genai import ChatGoogleGenerativeAI
import os

llm = ChatGoogleGenerativeAI(model="gemini-1.5-pro", api_key=os.getenv("GEMINI_API_KEY", "dummy_key"))

async def assessment_node(state):
    messages = state["messages"]
    system_prompt = (
        "You are an expert Assessment Agent. Your goal is to generate personalized quizzes, "
        "detect weaknesses, and provide instant feedback and improvement recommendations."
    )
    
    response = await llm.ainvoke(
        [{"role": "system", "content": system_prompt}] + messages
    )
    return {"messages": [response]}
