# @workspace/web (Velor Frontend App)

The web frontend for **Velor** built using Next.js 16 (App Router), React 19, Redux Toolkit, Tailwind CSS v4, and Clerk Authentication.

---

## 🚀 Features

- **Dynamic Project Dashboard**: Interactive visualization of projects, phases, milestones, and executable developer tasks.
- **AI Plan Generator Form**: Structured UI to prompt Groq AI for automated project roadmap generation.
- **Clerk Auth Integration**: Out-of-the-box user login, signup, session management, and route protection.
- **Redux State Management**: Centralized store for seamless project and task state caching.
- **Tailwind CSS v4 & Glowing Theme**: Custom pitch-dark theme with modern glowing components imported from `@workspace/ui`.

---

## 📁 Directory Structure

```text
apps/web/
├── app/                  # Next.js App Router pages, layouts, & API route delegates
├── components/           # Page-level UI components and layout wrappers
├── features/             # Redux slices and feature logic
├── hooks/                # Custom React hooks (Groq queries, Clerk user sync)
├── lib/                  # Centralized data sources & client utilities
├── public/               # Static assets & icons
├── services/             # API HTTP client functions (`api.js`)
└── store/                # Redux Toolkit store configuration
```

---

## 🛠️ Local Setup & Scripts

Ensure your `.env` file contains `NEXT_PUBLIC_API_URL` and Clerk credentials.

```bash
# Start development server on http://localhost:3000
pnpm run dev

# Run typecheck
pnpm run typecheck

# Build for production
pnpm run build
```
