# 🌐 Fandi Ardyan — Personal Portfolio

A modern, minimal personal website built with **React**, **Vite**, **TailwindCSS v4**, and **Framer Motion**.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0050?logo=framer&logoColor=white)

---

## ⚡ Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/FFF9ep/PersonalWeb.git
cd PersonalWeb

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx         # Fixed navbar with scroll spy
│   ├── Hero.jsx           # Hero section with CTA
│   ├── About.jsx          # Bio + stats + highlight cards
│   ├── Skills.jsx         # Categorized skill grid
│   ├── Projects.jsx       # Project cards with cover images
│   ├── Experience.jsx     # Timeline layout
│   ├── Contact.jsx        # WhatsApp-integrated form
│   ├── Footer.jsx         # Footer with social links
│   └── ui.jsx             # Reusable primitives (Card, Badge, Button, Input, Textarea)
├── data/
│   ├── projects.js        # Project data (title, tech, images)
│   └── skills.js          # Skill categories with icons
├── App.jsx
├── main.jsx
└── index.css              # Theme tokens + global styles
```

---

## 🛠️ Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production (`dist/`) |
| `npm run preview` | Preview production build locally |

---

## ✨ Features

- **Scroll Progress Bar** — Thin accent bar showing page scroll position
- **Active Section Highlighting** — Navbar highlights the current section
- **WhatsApp Contact Form** — Redirects to WhatsApp with prefilled message
- **Project Cover Images** — With graceful fallback if image is missing
- **Featured Badges** — Highlighted projects get a "Featured" tag
- **Responsive** — Mobile-first, tested on 375px+
- **Accessibility** — `prefers-reduced-motion`, `focus-visible`, `aria-labels`
- **SEO** — Open Graph, Twitter Card, canonical URL, meta descriptions

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Primary | `#0F172A` |
| Secondary | `#1E293B` |
| Accent | `#38BDF8` |
| Text | `#E2E8F0` |
| Font | Inter (400, 500, 700) |
| Card Radius | `rounded-2xl` |
| Button Radius | `rounded-xl` |

---

## 🚀 Deploy

This project is ready for **Vercel**:

```bash
npm run build
npx vercel
```

Or connect your GitHub repo directly on [vercel.com](https://vercel.com) for auto-deploy on push.

---

## 📝 Customize

| What | Where |
|------|-------|
| Projects | `src/data/projects.js` |
| Skills | `src/data/skills.js` |
| Bio & Stats | `src/components/About.jsx` |
| WhatsApp number | `src/components/Contact.jsx` |
| Social links | `src/components/Hero.jsx` + `Footer.jsx` |
| SEO meta tags | `index.html` |
| Cover images | `public/assets/projects/<name>/cover.png` |

---

Built with ☕ by **Fandi Ardyan**
