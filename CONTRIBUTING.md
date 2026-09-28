# Contributing to Velor

First off, thank you for considering contributing to Velor! Contributions are what make the open-source and developer community such an amazing place to learn, inspire, and create.

---

## 🛠️ Prerequisites & Tools

Before you begin, ensure you have the following installed locally:

- **Node.js**: `v20.0.0` or higher
- **pnpm**: `v9.0.0` or higher (`npm i -g pnpm`)
- **Git**: Latest release
- **PostgreSQL**: Neon PostgreSQL account or local database instance

---

## 🚀 Local Development Setup

1. **Fork & Clone the Repository**

   ```bash
   git clone https://github.com/[YOUR_GITHUB_USERNAME]/velor.git
   cd velor
   ```

2. **Install Dependencies**

   Velor uses `pnpm` workspaces for package management:

   ```bash
   pnpm install
   ```

3. **Configure Environment Variables**

   Copy the template files and fill in your development credentials:

   ```bash
   cp .env.example apps/api/.env
   cp .env.example apps/web/.env
   ```

4. **Initialize Database Client**

   ```bash
   pnpm --filter @workspace/db run generate
   ```

5. **Start Development Servers**

   ```bash
   pnpm run dev
   ```

   This command initiates Turborepo in parallel for both `apps/web` (`http://localhost:3000`) and `apps/api` (`http://localhost:4000`).

---

## 🌿 Git Branching Strategy

Follow a standard feature-branch workflow:

- `main` — Production-ready code.
- `feat/feature-name` — New feature implementations.
- `fix/bug-name` — Bug fixes.
- `docs/doc-name` — Documentation improvements.
- `refactor/component-name` — Code quality and architecture improvements.

---

## 📝 Commit Message Format

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```text
<type>(<scope>): <short summary>

[optional body]
```

### Allowed Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of code (white-space, formatting, etc.)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools and libraries

### Examples

```bash
git commit -m "feat(api): add GitHub webhook verification handler"
git commit -m "fix(web): resolve progress percentage calculation overflow"
git commit -m "docs(readme): add architecture mermaid diagram"
```

---

## 🧪 Code Quality & Verification

Before opening a pull request, make sure your code passes all linting and typechecking verification steps:

```bash
# Run TypeScript typechecking across all workspace packages
pnpm run typecheck

# Run ESLint check
pnpm run lint

# Format code with Prettier
pnpm run format
```

---

## 📥 Submitting Pull Requests

1. Push your branch to your remote fork:

   ```bash
   git push origin feat/your-feature-name
   ```

2. Open a Pull Request against the `main` branch of the primary repository.
3. Complete the provided Pull Request template detailing:
   - What changes were made.
   - Why the changes are necessary.
   - Screenshots/Recordings for UI changes.
   - Verification steps taken.
