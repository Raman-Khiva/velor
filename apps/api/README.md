# @workspace/api (Velor REST API Service)

The backend REST API engine for **Velor** built with Express 5, Prisma ORM, Clerk Express Auth, Groq AI SDK, and Swagger UI OpenAPI documentation.

---

## 🚀 Key Responsibilities

- **User Synchronization**: `/api/user/sync` synchronizes Clerk JWT authenticated users with database entities.
- **Project Management**: CRUD operations for projects, phases, milestones, and actionable tasks.
- **Groq LLM Integration**: `/api/queries` executes fast AI generation for developer project structures.
- **GitHub Webhook Engine**: `/api/webhooks` listens for commit & PR webhook notifications to update task completion automatically.
- **Interactive OpenAPI Specification**: Embedded Swagger UI served at `/docs`.

---

## 📡 Key Endpoints Summary

| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Public | System health check and status |
| `GET` | `/api/user/sync` | Bearer | Sync Clerk user with PostgreSQL database |
| `GET` | `/api/projects` | Bearer | Fetch user's project breakdown tree |
| `POST` | `/api/projects` | Bearer | Create a new project hierarchy |
| `POST` | `/api/queries` | Public | Execute Groq AI prompt query |
| `POST` | `/api/webhooks/github` | Webhook | Handle incoming GitHub repo webhooks |
| `GET` | `/docs` | Public | Interactive Swagger UI API documentation |

---

## 🛠️ Local Setup & Commands

Ensure `DATABASE_URL`, `CLERK_SECRET_KEY`, and `GROQ_API_KEY` are specified in `apps/api/.env`.

```bash
# Run API in dev mode with hot reload (nodemon) on http://localhost:4000
pnpm run dev

# Run Prisma schema generation step
pnpm run build
```
