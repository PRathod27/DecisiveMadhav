# DecisiveMadhav

An AI-powered civic complaint management system. Citizens submit complaints, an NLP classification agent categorizes them, and a decision agent assigns priority and routes them to the right government department.

---

## Project Structure

```
DecisiveMadhav/
├── Backend/          # FastAPI REST API
│   └── app/
│       ├── routes/   # auth, complaints, dashboard
│       ├── services/ # complaint CRUD logic
│       ├── data/     # complaints.json (persistent store)
│       └── main.py
├── agents/
│   ├── classification_agent/  # HuggingFace text-classification model
│   └── decision_agent/        # RL-based priority & department routing
├── frontend/         # Next.js 16 + Tailwind + shadcn/ui
├── data/             # Training data
├── Dockerfile
└── requirements.txt
```

---

## Features

- **Complaint submission** — citizens file complaints with category, department, city, and priority
- **AI classification** — transformer model classifies free-text complaints into 7 categories (Sanitation, Infrastructure, Water, Electricity, Traffic, Environment, Health)
- **Decision agent** — assigns priority (Low / Medium / High) and routes to the correct department using RL-inspired logic
- **Dashboard** — stat cards, category bar chart, paginated complaints table
- **Auth** — email/password signup and login

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | Next.js 16, React 19, Tailwind CSS v4, shadcn/ui, Recharts |
| Backend | FastAPI, SQLAlchemy, Pydantic, Uvicorn |
| AI Agents | Transformers (HuggingFace), PyTorch, NumPy |
| Container | Docker |

---

## Getting Started

### Backend

```bash
pip install -r requirements.txt
uvicorn Backend.app.main:app --reload --port 8080
```

API runs at `http://localhost:8080`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App runs at `http://localhost:3000`

### Docker

```bash
docker build -t decisivemadhav .
docker run -p 8000:8000 decisivemadhav
```

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/signup` | Register a new user |
| POST | `/auth/login` | Login |
| GET | `/complaints/` | List all complaints |
| POST | `/complaints/` | Submit a complaint |
| GET | `/complaints/{id}` | Get complaint by ID |
| GET | `/dashboard/` | Aggregated stats |

---

## AI Agents

**Classification Agent** — fine-tuned text classification model loaded via `transformers.pipeline`. Maps complaint text to one of 7 categories with a confidence score.

**Decision Agent** — takes classification output and builds a state vector `[confidence, is_urgent]`. Uses an RL model if available, otherwise falls back to a rule-based policy. Returns priority, assigned department, and escalation flag.

## 📝 License

This project is licensed under the MIT License. See the LICENSE file for more information.

## 👥 Team

**Prem Rathod**  
Team Leader | Backend & Cloud Support | AI/ML
LinkedIn: https://www.linkedin.com/in/prem-arun-rathod/

**Akashdeep**  
Full Stack Developer
LinkedIn: https://www.linkedin.com/in/akashdeep023/

**Payal Kumari**  
Full Stack Developer | AI Integration  
LinkedIn: https://www.linkedin.com/in/payalkumari10/