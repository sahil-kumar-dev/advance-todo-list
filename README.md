## Advance Todo

A modern, full‑stack Todo application built with Next.js App Router that demonstrates clean architecture, server actions, a MongoDB data layer, accessible UI components, form validation, charts, and fully responsive design for mobile, tablet, and desktop.

### Key Features
- Add, edit, complete, delete todos
- Categories with multi-select filtering
- Search and status filters (pending/completed)
- Recently completed section and pending overview
- Task status chart
- Fully responsive layouts and mobile-friendly controls
- Toast notifications for actions

### Tech Stack
- Next.js 15 (App Router) and React 19
- TypeScript
- Tailwind CSS v4
- MongoDB + Mongoose
- Zustand for client state
- Server Actions for data operations
- Zod + react-hook-form for forms and validation
- Shadcn Ui for basic components

## Getting Started

### Prerequisites
- Node.js 18+ (recommended LTS) and npm
- A MongoDB connection string

### 1) Install dependencies
```bash
npm install
```

### 2) Configure environment variables
Create a `.env.local` file at the project root:
```bash
NEXT_PUBLIC_MONGODB_URL="your-mongodb-connection-string"
```

The app uses `NEXT_PUBLIC_MONGODB_URL` in `config/db.config.ts` to connect Mongoose.

### 3) Run the development server
```bash
npm run dev
```
Then open `http://localhost:3000`.

### 4) Production build
```bash
npm run build
npm start
```

## Project Structure
```
advance-todo/
  app/                   # Next.js app router pages and UI composition
    add-todo/            # Add todo page
    edit-todo/[id]/      # Edit todo page
    todos/               # Todos list, search, filters
    components/          # Home widgets (Pending, RecentlyCompleted, Chart)
    layout.tsx           # Root layout
    page.tsx             # Home dashboard
    globals.css          # Global Tailwind styles

  components/
    shared/              # Reusable app components (TodoCard, TodoForm, etc.)
    ui/                  # UI primitives (button, input, select, dialog, ...)

  config/
    db.config.ts         # Mongoose connection helper

  constants/
    index.ts             # Categories list, shared constants

  lib/
    actions.ts           # Client helpers (e.g., URL helpers)
    utils.ts             # Render helpers, query utils

  models/
    todo.model.ts        # Mongoose Todo schema/model

  schema/
    index.ts             # Zod schemas and types

  services/
    index.ts             # Server Actions: CRUD + querying with filters

  store/
    use-todo-store.tsx   # Zustand store for client state
    use-theme-store.tsx  # Theme handling

  types/
    index.ts             # Shared TypeScript interfaces
```

## Core Flows
- Creating/Editing Todos: `components/shared/TodoForm.tsx` uses `react-hook-form` with `zodResolver` and posts via Server Actions in `services/index.ts`.
- Listing & Filtering: `app/todos/page.tsx` reads URL params, fetches via `useTodoStore`, and renders `TodoCard`s. Includes search, status, and category multi-select.
- Completing/Deleting: `TodoCard` triggers `useTodoStore` actions which call server actions (`updateStatus`, `deleteTodo`). Toasts via `sonner`.
- Charting: `app/components/chart-status.tsx` visualizes completed vs. pending using `recharts`.

## Libraries and Their Roles
- next: App Router, server actions, routing
- react, react-dom: UI rendering
- mongoose: MongoDB ODM and connection
- zustand: Lightweight client state management
- zod: Runtime validation for form schemas
- react-hook-form: Declarative form handling
- @hookform/resolvers: Bridges Zod with RHF
- tailwindcss: Utility-first styling and responsive design
- class-variance-authority, clsx, tailwind-merge: Class composition utilities
- @radix-ui/react-*: Accessible primitives for select, dialog, popover, tabs, tooltip, etc.
- recharts: Charts for status visualization
- date-fns, react-day-picker: Date utilities and picker UI
- lucide-react: Icons
- sonner: Toast notifications
- query-string: URL query manipulation
- nextjs-toploader: Route change progress indicator

## Available Scripts
- `npm run dev`: Start dev server (Turbopack)
- `npm run build`: Production build (Turbopack)
- `npm start`: Start production server
- `npm run lint`: Run ESLint

## Configuration Notes
- Database: Ensure `NEXT_PUBLIC_MONGODB_URL` is a valid MongoDB URI (Atlas or local).
- Server Actions: Implemented in `services/index.ts`. They connect to MongoDB, run queries, and call `revalidatePath` for cache invalidation.
- Validation: Zod schemas in `schema/` ensure safe server inputs.
- UI/Theming: Tailwind v4 utilities with dark mode classes. Components in `components/ui` wrap Radix primitives.

## Responsive Design
- All pages and components are mobile-first. Cards stack on small screens, actions compress into icon buttons, and filters collapse into vertical stacks.
