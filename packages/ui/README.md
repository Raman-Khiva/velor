# @workspace/ui (Shared UI Component Library)

Shared React component library for the **Velor** monorepo, styled with Tailwind CSS v4 and primitive components based on Radix UI / shadcn design tokens.

---

## 🎨 Components Included

- `button`: Customizable interactive buttons with variant states (glowing, outline, ghost, default).
- `project-card`: Standardized project overview card displaying progress bars, target dates, and status tags.
- `project-tasks`: Interactive task checklist component for executing phase CLI commands.
- `project-plan-generator`: AI prompt modal and input controller for architectural planning.
- `skills-matrix`: Tech stack pill tags and badge displays.

---

## 📦 Usage

To use components in `apps/web`:

```tsx
import { Button } from "@workspace/ui/components/button";
import { ProjectCard } from "@workspace/ui/components/project-card";
```
