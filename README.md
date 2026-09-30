# Learnora — Modern Learning Management Platform

Learnora is a modern learning management system (LMS) designed for students, instructors, and educational organizations. Built with React 19, Tailwind CSS v4, and React Router v7, it delivers a clean SaaS interface, intuitive course administration, and a rich student learning experience.

---

## 🌟 Key Features

### 🏢 Manager & Instructor Portal
- **Dashboard Overview:** Metric summaries (students, courses, video/text modules), SVG course completion ring, recent student enrollments, and active course catalog.
- **Course Administration:** Browse published courses, view enrolled students, edit metadata, or safely delete courses with confirmation modals.
- **Curriculum Authoring:** Add video lessons (with embedded YouTube player integration) and rich editorial documentation (via CKEditor 5).
- **Course Preview Player:** Full-screen learning player with lesson navigation and progress completion tracking.
- **Student Roster Management:** Monitor registered learners, view course participation, edit student profiles, and manage cohort enrollments.

### 🎓 Student Learning Portal
- **Enrolled Courses:** Interactive dashboard displaying active curriculum modules with quick "Resume Course" links.
- **Interactive Player:** Clean distraction-free learning viewer supporting video streams and rich reading guides with one-click completion.

### 🚀 Public Marketing & Onboarding Flow
- **Landing Page:** Modern educational SaaS hero, metrics banner (`50,000+ Students`, `500+ Courses`), value propositions, and testimonials.
- **Role-Based Authentication:** Sign in with one-click **Demo Account Switcher** (toggle between Manager and Student mode).
- **Registration & Pricing:** Complete onboarding with validated sign-up and 3-tier plan selection (*Starter*, *Pro*, *Enterprise*).

---

## 🎨 Design System & Palette

Learnora uses a curated, accessibility-compliant color palette:

| Token | Hex Value | Role |
| :--- | :--- | :--- |
| **Main Background** | `#F8FAFC` | App canvas & page backgrounds |
| **Primary Surface** | `#FFFFFF` | Cards, modals, and container surfaces |
| **Secondary Surface**| `#F1F5F9` | Subtle muted chips & dividers |
| **Primary Blue** | `#1D4ED8` | Primary buttons, active states & links |
| **Primary Hover** | `#1E40AF` | Interactive hover & focus states |
| **Deep Navy** | `#172554` | Sidebar container, headers & brand typography |
| **Main Text** | `#0F172A` | High-contrast body & heading text |
| **Secondary Text** | `#64748B` | Subtext, labels & placeholders |
| **Borders** | `#E2E8F0` | Card borders & input outlines |
| **Teal Accent** | `#0D9488` | Metric badges & educational highlights |
| **Success** | `#16A34A` | Completion badges & positive feedback |
| **Danger** | `#DC2626` | Destructive action triggers & error alerts |

---

## 🛠️ Tech Stack

- **Framework:** [React 19](https://react.dev/) + [Vite 7](https://vitejs.dev/)
- **Routing:** [React Router v7](https://reactrouter.com/) (Data router with loaders & action hooks)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) + `@tailwindcss/typography`
- **Icons:** [Lucide React](https://lucide.dev/)
- **Forms & Validation:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Rich Text Editor:** [CKEditor 5 Classic](https://ckeditor.com/ckeditor-5/)

---

## 📦 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### Installation

```bash
# 1. Navigate to the frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Start the local development server
npm run dev
```

The application will be available at `http://localhost:5173`.

### Production Build

```bash
# Run ESLint checks
npm run lint

# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 📁 Project Structure

```text
Learnora/
├── .gitignore
├── README.md
└── frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── public/
    │   └── assets/
    │       └── images/       # Brand logos, thumbnails & icons
    └── src/
        ├── components/       # Header, Sidebar, Navbar, Layout, Modals
        ├── pages/            # Landing, Auth, Manager & Student portals
        ├── router/           # Route definitions & loaders
        ├── utils/            # Mock data, validation schemas & constants
        ├── index.css         # Design tokens, typography & CSS classes
        ├── App.jsx
        └── main.jsx
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
