# LMS Demo Frontend

This project is a standalone demo that mimics the UI/UX flow of a modern LMS:
manager & student dashboard, course management, course details, pricing flow, and signup mock.

---

## Preview

> ![App Preview](/public/assets/images/preview/image%209.png)  
> ![App Preview](/public/assets/images/preview/image%2011.png) > ![App Preview](/public/assets/images/preview/image%2010.png) > ![App Preview](/public/assets/images/preview/image%207.png) > ![App Preview](/public/assets/images/preview/image%208.png)

---

## Tech Stack

- React
- Vite
- TailwindCSS
- React Router
- Mock Data System (no backend)

---

## Development Tools

- Git & GitHub
- Visual Studio Code
- Figma

## Features

- **General**
  - Modern, responsive dashboard layout (Manager & Student)
  - Clean card-based UI with consistent design system
- **Manager Features**
  - Manage Courses (with mock delete/edit)
  - Manage Students List
  - Course Detail with dynamic content
  - Add/Edit course (mock)
- **Student Features**

  - Course browsing (mock)
  - Course detail preview
  - progress sections (static preview)

- **Auth & SignUp Flow**

  - Mock Signup → Pricing → Success Checkout
  - Mock Login (manager / student)

- **Internals**
  - 100% frontend (all data uses mockData.js)
  - No API calls, no backend dependency
  - Pages load using loader React Router

---

## Demo Link

```bash
https://demo-fe-lms.vercel.app/
```

## Installation

```bash
# Clone repository
git clone https://github.com/your-username/demo-fe-lms.git

# Masuk ke folder
cd demo-fe-lms

# Install dependencies
npm install

# Jalankan server development
npm run dev

```

## Project Structures

```bash
demo-fe-lms/
│
├── src/
│   ├── assets/            # Static images/icons
│   ├── components/        # Reusable UI components
│   ├── pages/             # Page views (manager/student/frontend)
│   ├── routes/            # Routing + loader setup
│   ├── utils/             # mockData, helpers, constants
│   └── main.jsx           # Entry point
│
├── public/
├── package.json
└── vite.config.js

```

## Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview the production build locally
```

## Roadmap (Future Imporvements)

- Full backend REST API integration
- Real authentication (JWT)
- Course enrollment system
- Quiz & assignment modules
- Student analytics & charts
- Improved accessibility & animations

## Notes

**This is a DEMO version**, not a fullstack version.
All data uses:

```bash
src/utils/mockData.js
```

No requests to the server — suitable for showcases, portfolios, and UI previews.
