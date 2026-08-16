from langchain_google_genai import ChatGoogleGenerativeAI
import os

llm = ChatGoogleGenerativeAI(model="gemini-flash-latest", api_key=os.getenv("GEMINI_API_KEY", "dummy_key"))

async def assessment_node(state):
    messages = state["messages"]
    system_prompt = (
        "You are an expert MCQ Quiz Generator. Generate multiple-choice questions based on the topic or text provided.\n"
        "STRICT OUTPUT FORMAT — respond ONLY with a valid JSON array, no markdown, no explanation:\n"
        "[\n"
        "  {\n"
        '    "question": "Question text here?",\n'
        '    "options": ["Option A", "Option B", "Option C", "Option D"],\n'
        '    "answer": "Option A",\n'
        '    "explanation": "Brief explanation of why this is correct."\n'
        "  }\n"
        "]\n"
        "Rules:\n"
        "- Generate exactly the number of questions requested (default 5 if not specified).\n"
        "- Each question must have exactly 4 options.\n"
        "- The answer must be one of the 4 options verbatim.\n"
        "- Questions should be clear, educational, and test real understanding.\n"
        "- Output ONLY the JSON array — no preamble, no markdown code blocks, no trailing text."
    )

    response = await llm.ainvoke(
        [{"role": "system", "content": system_prompt}] + list(messages)
    )
    return {"messages": [response]}

