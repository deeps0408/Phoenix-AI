from typing import Annotated, Sequence, TypedDict
from langchain_core.messages import BaseMessage
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages
import os

# Define State
class AgentState(TypedDict):
    messages: Annotated[Sequence[BaseMessage], add_messages]
    user_id: str
    context: dict

# Import agent nodes
from app.agents.teacher import teacher_node
from app.agents.catch_up import catch_up_node
from app.agents.mentor import mentor_node
from app.agents.parent import parent_node
from app.agents.career import career_node
from app.agents.emotional import emotional_node
from app.agents.language import language_node
from app.agents.assessment import assessment_node
from app.agents.resource import resource_node

# Define the Orchestrator Router
async def route_query(state: AgentState) -> str:
    last_message = state["messages"][-1].content.lower()
    
    if "catch up" in last_message or "missed" in last_message:
        return "catch_up_agent"
    elif "schedule" in last_message or "plan" in last_message or "habit" in last_message:
        return "mentor_agent"
    elif "parent" in last_message or "report" in last_message or "attendance" in last_message:
        return "parent_agent"
    elif "career" in last_message or "college" in last_message or "job" in last_message:
        return "career_agent"
    elif "stress" in last_message or "overwhelm" in last_message or "burnout" in last_message or "sad" in last_message:
        return "emotional_agent"
    elif "translate" in last_message or "hindi" in last_message or "language" in last_message:
        return "language_agent"
    elif "quiz" in last_message or "test" in last_message or "assess" in last_message:
        return "assessment_agent"
    elif "video" in last_message or "book" in last_message or "course" in last_message or "recommend" in last_message:
        return "resource_agent"
    else:
        # Default to teacher
        return "teacher_agent"

# Create Graph
workflow = StateGraph(AgentState)

# Add nodes
workflow.add_node("teacher_agent", teacher_node)
workflow.add_node("catch_up_agent", catch_up_node)
workflow.add_node("mentor_agent", mentor_node)
workflow.add_node("parent_agent", parent_node)
workflow.add_node("career_agent", career_node)
workflow.add_node("emotional_agent", emotional_node)
workflow.add_node("language_agent", language_node)
workflow.add_node("assessment_agent", assessment_node)
workflow.add_node("resource_agent", resource_node)

# Add edges
workflow.add_conditional_edges(
    START,
    route_query,
    {
        "teacher_agent": "teacher_agent",
        "catch_up_agent": "catch_up_agent",
        "mentor_agent": "mentor_agent",
        "parent_agent": "parent_agent",
        "career_agent": "career_agent",
        "emotional_agent": "emotional_agent",
        "language_agent": "language_agent",
        "assessment_agent": "assessment_agent",
        "resource_agent": "resource_agent",
    }
)

# All agents return to end after their turn
workflow.add_edge("teacher_agent", END)
workflow.add_edge("catch_up_agent", END)
workflow.add_edge("mentor_agent", END)
workflow.add_edge("parent_agent", END)
workflow.add_edge("career_agent", END)
workflow.add_edge("emotional_agent", END)
workflow.add_edge("language_agent", END)
workflow.add_edge("assessment_agent", END)
workflow.add_edge("resource_agent", END)

orchestrator_agent = workflow.compile()
