# @workspace/db (Prisma & Neon Database Package)

Shared database client and ORM model definitions for the **Velor** monorepo, powered by **Prisma 7** and **Neon PostgreSQL**.

---

## 🗄️ Relational Schema Models

- **User**: Stores authenticated developer records (`id`, `clerkId`, `createdAt`).
- **Project**: Represents top-level repositories and management engines (`name`, `techStack`, `repoUrl`, `architecture`).
- **Phase**: Major developmental phases (`name`, `order`, `progress`, `status`).
- **Milestone**: Goal checkpoints under a phase (`title`, `description`, `progress`).
- **Task**: Granular executable steps (`title`, `purpose`, `commands`, `done`, `commitSha`).

---

## 💻 Available Scripts

```bash
# Generate Prisma Client code into packages/db/src/generated
pnpm run generate

# Push schema changes directly to PostgreSQL (development)
pnpm run db:push

# Launch Prisma Studio GUI
pnpm run studio
```
