# Samuel Wambua — Developer Portfolio

A modern, full-stack portfolio built as a real developer's website — not just a static CV page. It features an animated, responsive public site plus a full admin dashboard for managing content.

## ✨ Features

- **Public site**
  - Animated hero with rotating role text and gradient accent
  - About, Skills (animated bars), Projects (with filtering & cards), Experience & Education timeline, Services, Contact form
  - Dark / light mode toggle
  - Smooth scrolling, Framer Motion animations, responsive mobile design
  - SEO-friendly meta tags, glassmorphism cards, technology badges

- **Admin dashboard**
  - Secure JWT + bcrypt authentication
  - Add / edit / delete projects (with image upload)
  - Manage skills, experience
  - View & manage contact submissions
  - Edit profile & bio

## 🛠️ Tech Stack

**Frontend:** React, TypeScript, Vite, Tailwind CSS, Framer Motion, React Router
**Backend:** Node.js, Express, TypeScript, Prisma
**Database:** SQLite (dev) — easily switchable to PostgreSQL in `prisma/schema.prisma`
**Auth:** JWT, bcryptjs

## 📁 Structure

```
isack-portfolio/
├── web/            # React frontend (Vite)
│   └── src/
│       ├── components/
│       ├── sections/
│       ├── pages/          # Home, AdminLogin, AdminDashboard
│       ├── pages/admin/    # admin managers (projects, messages, skills...)
│       ├── services/       # API client
│       └── context/
├── server/         # Express + TypeScript API
│   └── src/
│       ├── controllers/
│       ├── routes/
│       ├── middleware/
│       └── utils/
└── prisma/         # Database schema + seed
```

## 🚀 Getting Started

```bash
# 1. Backend
cd server
cp .env.example .env
npm install
npx prisma db push --schema ../prisma/schema.prisma
npm run db:seed        # default admin: admin@samuelwambua.dev / admin123
npm run dev            # http://localhost:5000

# 2. Frontend (new terminal)
cd web
npm install
npm run dev            # http://localhost:5173
```

## 🔑 Admin

Visit `http://localhost:5173/admin` and log in with the seeded credentials (see `.env`).

## ⚙️ Switching to PostgreSQL

In `prisma/schema.prisma`, change `provider = "sqlite"` to `"postgresql"` and set
`DATABASE_URL="postgresql://..."`. Then run `prisma db push` again.

## 🚢 Deployment

- **Frontend:** Vercel / Netlify (build `web`)
- **Backend:** Render / Railway (build `server`, run `npm run build && npm start`)
- **Database:** Neon / Supabase (PostgreSQL)
