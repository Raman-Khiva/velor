# Changelog

All notable changes to the **Velor** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.1.0] - 2026-09-28

### Added
- **Monorepo Infrastructure**: Configured Turborepo and pnpm workspace pipeline for multi-app management.
- **Frontend App (`apps/web`)**:
  - Upgraded to Next.js 16 App Router & React 19.
  - Implemented Clerk Authentication with dynamic sign-in flow.
  - Added Redux Toolkit store for global state management.
  - Built pitch-dark glowing theme and dynamic project card views.
- **Backend API (`apps/api`)**:
  - Express 5.x REST API service.
  - Integrated `@clerk/express` for token verification.
  - Integrated Groq AI SDK (`groq-sdk`) for intelligent task and architecture generation.
  - Interactive OpenAPI 3.0 specification served via Swagger UI at `/docs`.
  - GitHub Webhook event router for automated commit and pull request progress tracking.
- **Database Package (`packages/db`)**:
  - Prisma 7 ORM schema with Neon PostgreSQL support.
  - Defined relational schema models: `User`, `Project`, `Phase`, `Milestone`, and `Task`.
- **Shared UI Package (`packages/ui`)**:
  - Extracted shared React components and Tailwind CSS v4 design tokens.
- **Documentation**:
  - Added recruiter-focused root `README.md`, `ARCHITECTURE.md`, `CONTRIBUTING.md`, `LICENSE`, environment variable samples, and GitHub workflow templates.
