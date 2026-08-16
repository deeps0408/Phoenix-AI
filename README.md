# Phoenix AI 🐦🔥

> **"No child should fall behind because life got in the way."**

Phoenix AI is a modern, multi-agent education platform designed for underserved students facing challenges like lack of teachers, language barriers, interrupted education, poor internet connectivity, and limited parental support. 

Our core theme is **"Agents for Good"**—focusing on accessibility, personalization, and helping students recover lost learning.

---

## 🎯 The Mission
Phoenix AI acts as a 24/7 multilingual learning companion. By utilizing a swarm of specialized AI agents, the platform adapts to every student's unique circumstances, whether they missed 10 days of school due to a natural disaster or simply need concepts explained in their native dialect.

## 🏗 Architecture & Agents
The platform utilizes a **LangGraph-powered Orchestrator Agent** that intelligently routes student queries to the most appropriate specialized agent:

- **👩‍🏫 AI Teacher Agent**: Adapts explanations (Beginner, Intermediate, Advanced) using real-life examples and creates mind maps.
- **🌍 Language Agent**: Provides voice-to-voice and text translation for lessons across 7+ regional languages.
- **🏃 Catch-Up Agent**: Reconstructs missed syllabuses and generates daily micro-learning recovery roadmaps.
- **🧭 Mentor Agent**: Manages study schedules, goals, and tracks learning habits (Pomodoro, study streaks).
- **📝 Assessment Agent**: Generates personalized quizzes, detects weaknesses, and provides instant scoring.
- **👨‍👩‍👧 Parent Agent**: Generates voice summaries and weekly progress reports in local languages for parents.
- **🎓 Career Guidance Agent**: Recommends learning paths, scholarships, and maps skill gaps.
- **💙 Emotional Support Agent**: Detects burnout and provides positive reinforcement and study encouragement.
- **📚 Resource Agent**: Recommends personalized YouTube videos, free courses, and articles using RAG.
- **📶 Offline Sync Agent**: Caches lessons for low-bandwidth environments (2G friendly).

## 💻 Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS & Shadcn UI
- **Animations**: Framer Motion
- **Charts**: Recharts

### Backend
- **Framework**: FastAPI (Python)
- **AI Orchestration**: LangGraph
- **LLMs**: OpenAI API / Gemini API
- **Vector DB**: ChromaDB

### Infrastructure & Integrations
- **Database**: Supabase
- **Authentication**: Clerk
- **Storage**: Supabase Storage
- **Audio Processing**: Whisper API & ElevenLabs

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Python (3.10+)

### Running the Frontend
```bash
cd frontend
npm install
npm run dev
```
The frontend will be available at `http://localhost:3000`.

### Running the Backend
```bash
cd backend
cp .env.example .env
# Fill in your API keys in .env
python -m venv venv
source venv/bin/activate  # Or `venv\Scripts\activate` on Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
```
The backend API docs will be available at `http://localhost:8000/docs`.

---

## 🏆 Gamification & Accessibility
- **Gamification**: Earn XP points, unlock badges, maintain streaks, and climb leaderboards.
- **Accessibility**: Includes Dyslexia-friendly fonts, large text mode, high contrast modes, and voice-first interactions for differently-abled learners.

*Built with ❤️ for Agents for Good.*
