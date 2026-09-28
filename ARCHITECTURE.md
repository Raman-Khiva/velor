# Velor Architecture Documentation

This document provides a comprehensive technical overview of the architecture, data models, component interactions, and execution pipelines of **Velor**.

---

## 1. Monorepo Overview

Velor uses a modern **Turborepo + pnpm workspaces** architecture. Code, UI components, database definitions, and configurations are modularized across `apps/` and `packages/` to ensure maximum code reusability, isolation, and fast build caching.

```text
                  +-----------------------------------+
                  |           Turborepo              |
                  +-----------------------------------+
                                    |
          +-------------------------+-------------------------+
          |                                                   |
   [Applications]                                      [Packages]
   ├── apps/web (Next.js 16)                           ├── packages/db (Prisma + Neon)
   ├── apps/api (Express 5 REST API)                  ├── packages/ui (Tailwind v4 + Radix)
   └── apps/base (Template App)                        ├── packages/eslint-config
                                                       └── packages/typescript-config
```

---

## 2. Data Model & Prisma Schema

The core relational domain model is defined in `packages/db/prisma/schema.prisma` and deployed via **Neon PostgreSQL**.

```mermaid
erDiagram
    User ||--o{ Project : "owns"
    Project ||--o{ Phase : "contains"
    Phase ||--o{ Milestone : "contains"
    Milestone ||--o{ Task : "contains"

    User {
        string id PK
        string clerkId UK
        datetime createdAt
    }

    Project {
        string id PK
        string name
        string description
        string type
        string[] techStack
        string status
        datetime startDate
        datetime targetDate
        string owner
        string repoUrl
        string githubRepo
        json architecture
        string githubWebhookSecret
        string userId FK
    }

    Phase {
        string id PK
        string name
        string description
        int order
        string status
        int progress
        string projectId FK
    }

    Milestone {
        string id PK
        string title
        string description
        int progress
        string phaseId FK
    }

    Task {
        string id PK
        string title
        string type
        string purpose
        string[] commands
        boolean done
        string commitSha
        int githubIssueId
        string milestoneId FK
    }
```

---

## 3. Application Subsystems

### 3.1 Next.js Frontend (`apps/web`)

- **Framework**: Next.js 16 (App Router) + React 19
- **State Management**: Redux Toolkit (`@reduxjs/toolkit`, `react-redux`)
- **Authentication**: `@clerk/nextjs` for Client/Server Session token handling
- **UI Components**: Consumes shared `@workspace/ui` design system with Tailwind CSS v4
- **Services**: Custom API fetchers communicating with `apps/api` via Bearer JWTs

### 3.2 Express REST API (`apps/api`)

- **Framework**: Express 5.x
- **Middleware**:
  - `@clerk/express`: Standard authentication & request context validation
  - `cors`: Cross-Origin resource sharing middleware
  - Error Handler: Centralized JSON error formatting and status logging
- **Documentation**: `swagger-ui-express` rendering `openapi.yaml` live at `/docs`
- **AI Service**: Groq SDK (`groq-sdk`) executing fast LLM queries for plan generation

### 3.3 Database Package (`packages/db`)

- **ORM**: Prisma 7 with Neon PostgreSQL adapter (`@prisma/adapter-neon`)
- **Client Generation**: Outputted to local `src/generated` directory for internal monorepo consumption

---

## 4. Key Workflows & Pipelines

### 4.1 Authentication & User Synchronization

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant Web as apps/web
    participant Clerk as Clerk Auth
    participant API as apps/api
    participant DB as packages/db

    User->>Web: Login / Signup
    Web->>Clerk: Authenticate User
    Clerk-->>Web: Return JWT Token & Session
    Web->>API: GET /api/user/sync (Header: Bearer JWT)
    API->>Clerk: Verify Token & Extract clerkId
    API->>DB: Upsert User record by clerkId
    DB-->>API: Return User entity
    API-->>Web: User synchronized response
```

### 4.2 AI Project Plan Generation Pipeline

1. User submits project pitch/requirements via Web UI.
2. Web UI invokes backend POST `/api/queries` endpoint.
3. Express service formats prompt and queries Groq LLM (`openai/gpt-oss-120b` or tuned model).
4. Groq returns structured JSON containing project metadata, technical stack recommendations, breakdown phases, milestones, and task commands.
5. Express service saves project structure to Database via Prisma transactions.

### 4.3 Automated GitHub Webhook Task Completion Sync

```mermaid
sequenceDiagram
    autonumber
    participant GH as GitHub Repository
    participant API as apps/api (Webhook Handler)
    participant DB as packages/db

    GH->>API: POST /api/webhooks/github (Commit / PR payload)
    API->>API: Verify Webhook HMAC signature
    API->>API: Parse commit message for task references (e.g. "fix #task-id" or SHA)
    API->>DB: Update Task status (`done = true`, record `commitSha`)
    API->>DB: Recalculate Milestone & Phase progress percentages
    API-->>GH: HTTP 200 OK
```

---

## 5. Security & Environment Configuration

- **Token Protection**: Web-to-API requests utilize Clerk JWT tokens verified in Express middleware.
- **Secrets Isolation**: Secrets are kept out of source code using environment configuration (`.env`) or Doppler secret injection (`doppler run`).
- **Webhooks**: Signature verification (`githubWebhookSecret`) guarantees webhook authenticity.
