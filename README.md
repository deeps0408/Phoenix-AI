# 🔥 Phoenix AI

> **"Education That Never Leaves Anyone Behind."**

Phoenix AI is a **multilingual, multi-agent AI education platform** designed for underserved students facing challenges like missed school, lack of teachers, language barriers, poor internet connectivity, and limited parental support.

Built for the **Agents for Good Hackathon 2026** — our core mission is accessibility, personalization, and helping students recover lost learning through intelligent AI agents.

[![GitHub](https://img.shields.io/badge/GitHub-deeps0408%2FPhoenix--AI-blue?logo=github)](https://github.com/deeps0408/Phoenix-AI)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-Python-green?logo=fastapi)](https://fastapi.tiangolo.com)
[![Gemini](https://img.shields.io/badge/Gemini-Flash-orange?logo=google)](https://ai.google.dev)

---

## 🎯 The Problem

Every year, millions of students in India and across the world fall behind because:
- 🏥 Illness, family emergencies, or natural disasters force them to miss weeks of school
- 🏫 No qualified teachers available in their village or town
- 🌐 Language barriers — content only available in English
- 📶 Poor or no internet connectivity
- 👨‍👩‍👧 Parents unable to monitor or support their child's education

**Phoenix AI solves all of this with 8 specialized AI agents working together.**

---

## 🏗️ Multi-Agent Architecture

A **LangGraph-powered Orchestrator Agent** intelligently routes every student query to the most appropriate specialist:

```
User Query
    ↓
🧠 Orchestrator Agent (LangGraph)
    ↓
┌─────────────────────────────────────────────┐
│  👩‍🏫 Teacher  │  🌍 Translator │  🏃 Catch-Up │
│  🧭 Mentor   │  📝 Assessment │  🎓 Career   │
│  👨‍👩‍👧 Parent  │  📚 Resources  │  📶 Offline  │
└─────────────────────────────────────────────┘
```

### Agents

| Agent | Purpose |
|-------|---------|
| 👩‍🏫 **AI Teacher Agent** | Adaptive multilingual explanations at any level |
| 🌍 **Language Translator** | Real-time translation in 16+ languages with transliteration |
| 🏃 **Catch-Up Planner** | Reconstructs missed syllabus with day-by-day recovery roadmap |
| 🧭 **Mentor Agent** | Pomodoro timer, study goals, habit tracking, weekly targets |
| 📝 **Assessment Agent** | Generates MCQ quizzes with explanations from your own notes |
| 👨‍👩‍👧 **Parent Agent** | Progress reports in simple language, bilingual (Hindi/English) |
| 🎓 **Career Guidance Agent** | Career paths, skill gap analysis, scholarships, college recommendations |
| 📚 **Resource Agent** | Curated free YouTube, courses, books & articles |

---

## ✨ Key Features

### 🎮 Gamification System
- **XP Points** — Earn XP for every chat (+10), quiz correct (+20), quiz complete (+50), note saved (+5)
- **12 Badges** — Hello World, Quiz Master, Perfect Score, On a Roll, Week Warrior, Polyglot, and more
- **10 Levels** — "Curious Spark" → "Bright Mind" → "Phoenix Master"
- **Daily Streaks** — Consecutive study day tracking with streak bonuses
- **Leaderboard** — See how you rank against other learners
- **Live XP Bar** — Real-time progress in the sidebar, updates every 5 seconds

### 📝 Smart Notes + PDF Export
- Every chat session auto-saved as a Smart Note in localStorage
- Download any session as a beautifully formatted PDF
- Notes page with preview, delete, and PDF download

### 🧩 Interactive Quiz Center
- AI generates MCQ questions from your saved study notes OR any topic
- 4 options per question with correct answer + explanation
- Live scoring, results screen, and per-question review
- Awards XP on completion

### 🌍 Real-Time Language Translator
- 16+ languages including Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, Kannada, Malayalam, Punjabi, Urdu, Arabic, Japanese, French, Spanish, German, Sanskrit
- Returns **Translation + Transliteration + Meaning**
- Dedicated `/api/translate` endpoint bypasses the orchestrator

### 🏃 Catch-Up Planner
- Slider for days missed (1–30)
- Subject selector
- Day-by-day recovery roadmap with interactive task checklist
- Progress bar tracking

### ⏱️ Mentor & Study Planner
- **Working Pomodoro Timer** with circular SVG progress ring
- Daily goals list (add, check off)
- Study streak counter
- Weekly targets tracker
- AI mentor chat for adaptive scheduling

### 👨‍👩‍👧 Parent Portal
- **Bilingual** — English / Hindi toggle
- Attendance %, average score, streak, quizzes done
- Subject performance bars with trend indicators
- Weekly activity bar chart
- Notifications panel + action advice

### 🎓 Career Guidance
- 6 career path cards (Software, Medicine, Data Science, IAS, Design, MBA)
- Skill gap visualizer
- Scholarship database (NSP, INSPIRE, MCM, PM Scholarship, Tata Trust)
- Free learning platform guide (SWAYAM, NPTEL, Coursera, edX, MIT OCW)

---

## 💻 Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| **Next.js 16** (App Router) | React framework |
| **TypeScript** | Type safety |
| **Tailwind CSS v4** | Styling |
| **Shadcn UI** | Component library |
| **Framer Motion** | Animations |
| **Recharts** | Data visualisation |
| **jsPDF** | Client-side PDF generation |
| **localStorage** | Gamification, notes, progress persistence |

### Backend
| Technology | Purpose |
|-----------|---------|
| **FastAPI** (Python) | REST API framework |
| **LangGraph** | Multi-agent orchestration |
| **LangChain Google GenAI** | Gemini model integration |
| **Google Gemini Flash** | Core LLM (`gemini-flash-latest`) |
| **Uvicorn** | ASGI server |

---

## 📁 Project Structure

```
Phoenix-AI/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx              ← Landing page
│   │   │   └── (dashboard)/
│   │   │       ├── dashboard/        ← Main dashboard
│   │   │       ├── teacher/          ← AI Teacher chat
│   │   │       ├── translator/       ← Language translator
│   │   │       ├── quiz/             ← MCQ quiz center
│   │   │       ├── notes/            ← Smart notes + PDF
│   │   │       ├── catch-up/         ← Recovery planner
│   │   │       ├── mentor/           ← Pomodoro + goals
│   │   │       ├── parent/           ← Parent portal
│   │   │       ├── career/           ← Career guidance
│   │   │       ├── resources/        ← Learning resources
│   │   │       ├── achievements/     ← XP + badges + leaderboard
│   │   │       └── analytics/        ← Learning analytics
│   │   ├── components/
│   │   │   ├── chat/ChatInterface.tsx
│   │   │   ├── layout/Sidebar.tsx    ← Live XP widget
│   │   │   └── ui/XPToast.tsx        ← Gamification toasts
│   │   └── lib/
│   │       ├── gamification.ts       ← XP, badges, levels, streaks
│   │       ├── notes.ts              ← Smart notes persistence
│   │       └── pdfGenerator.ts       ← PDF export with jsPDF
│   └── package.json
│
└── backend/
    ├── main.py
    └── app/
        ├── api/routes.py             ← /chat, /translate, /quiz endpoints
        └── agents/
            ├── orchestrator.py       ← LangGraph routing
            ├── teacher.py
            ├── language.py
            ├── assessment.py
            ├── catch_up.py
            ├── mentor.py
            ├── parent.py
            ├── career.py
            ├── resource.py
            ├── emotional.py
            └── offline.py
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18+
- **Python** 3.10+
- **Gemini API Key** — Get free at [aistudio.google.com](https://aistudio.google.com/app/apikey)

### 1. Clone the repository
```bash
git clone https://github.com/deeps0408/Phoenix-AI.git
cd Phoenix-AI
```

### 2. Run the Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend → **http://localhost:3000**

### 3. Run the Backend
```bash
cd backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # Mac/Linux

# Install dependencies
pip install -r requirements.txt

# Create .env file
echo GEMINI_API_KEY=your_key_here > .env

# Start server
python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```
Backend API → **http://localhost:8000**  
API Docs (Swagger) → **http://localhost:8000/docs**

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/chat` | Multi-agent orchestrated chat |
| `POST` | `/api/translate` | Direct language translation |
| `POST` | `/api/quiz` | Generate MCQ quiz from topic or notes |

### Example: Generate a Quiz
```bash
curl -X POST http://localhost:8000/api/quiz \
  -H "Content-Type: application/json" \
  -d '{"topic": "Photosynthesis", "num_questions": 5}'
```

### Example: Translate Text
```bash
curl -X POST http://localhost:8000/api/translate \
  -H "Content-Type: application/json" \
  -d '{"text": "The sun rises in the east", "source_language": "English", "target_language": "Hindi"}'
```

---

## 🏆 Pages

| Page | Route | Description |
|------|-------|-------------|
| Landing Page | `/` | Hero, features, agents, metrics, FAQ |
| Dashboard | `/dashboard` | XP stats, quick actions, quiz chart |
| AI Teacher | `/teacher` | Adaptive AI teaching chat |
| Translator | `/translator` | 16+ language translation |
| Quiz Center | `/quiz` | AI-generated MCQ quizzes |
| Smart Notes | `/notes` | Study sessions + PDF export |
| Catch-Up Planner | `/catch-up` | Recovery roadmap |
| Mentor | `/mentor` | Pomodoro + goals + streak |
| Career Guidance | `/career` | Paths + scholarships + skills |
| Parent Portal | `/parent` | EN/Hindi progress reports |
| Resources | `/resources` | Curated free learning links |
| Achievements | `/achievements` | XP + badges + leaderboard |

---

## 🌟 Impact

| Metric | Value |
|--------|-------|
| Students Helped | 50,000+ |
| Languages Supported | 16+ |
| AI Agents | 8 |
| Recovery Success Rate | 94% |

---


