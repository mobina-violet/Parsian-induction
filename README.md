<div align="center">

# 🔥 Parsian Porto Alvand

### Corporate website & lead-management platform for an induction furnace manufacturer

[![Live Demo](https://img.shields.io/badge/Live%20Demo-parsian--partoalvand.netlify.app-orange?style=for-the-badge&logo=netlify)](https://parsian-partoalvand.netlify.app/)

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

</div>

---

## 📖 About

A full-featured, RTL-first (Persian) B2B lead-generation website built for **Parsian Porto Alvand**, an Iranian manufacturer of induction furnace systems — melting, forging, hardening, and forming furnaces — along with their spare parts and peripheral equipment.

This isn't just a marketing brochure site: it's a complete small-business platform, with a real product catalog backed by a database, an automated lead-capture pipeline with instant notifications, a moderated customer-review system, and a private dashboard the client uses day-to-day.

## 📸 Preview

<div align="center">
  <img src="docs/screenshots/home.png" alt="Home page" width="800" />
  <br /><br />
  <img src="docs/screenshots/products.png" alt="Product detail page" width="800" />
  <br /><br />
  <img src="docs/screenshots/admin.png" alt="Admin dashboard" width="800" />
</div>

## 📑 Table of Contents

- [About](#-about)
- [Preview](#-preview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Status](#-status)
- [Author](#-author)

## ✨ Features

<table>
<tr>
<td valign="top" width="50%">

**Public site**
- 🏭 Furnace catalog with category-specific spec tables (power, frequency, melting rate...)
- 🔩 Spare parts & peripheral equipment catalog with nested filters
- 🏗️ Project showcase, filterable by industry
- 📰 Articles / blog section for SEO content
- ⭐ Customer reviews per product (moderated before going public)
- 🔎 Site-wide live-search with autocomplete
- 📞 Consultation request form + floating WhatsApp button
- 📱 Fully responsive, RTL-first design with a custom Persian font

</td>
<td valign="top" width="50%">

**Backend & integrations**
- 🗄️ PostgreSQL + Prisma, modeling products, projects, articles, reviews & leads
- ⚡ Instant Telegram notification on every new lead
- 🗺️ Dynamic sitemap, robots.txt, per-page metadata & JSON-LD
- 🔐 Password-protected `/admin` dashboard, fully separate from the public layout:
  - View & triage leads, update their status
  - Approve or remove customer reviews

</td>
</tr>
</table>

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Server Actions) |
| Language | TypeScript |
| Styling | Tailwind CSS + custom Iranian Sans font |
| Database / ORM | PostgreSQL + Prisma |
| Forms & Validation | React Hook Form + Zod |
| Icons | Lucide React |
| Notifications | Telegram Bot API |
| Hosting | Netlify (CI/CD on every push) |

## 🚦 Status

✅ Feature-complete and live on a Netlify subdomain. The client is finalizing a custom domain purchase before final handoff.

---

<div align="center">

## 👩‍💻 Author

**Mobina**  
Frontend Developer

[![GitHub](https://img.shields.io/badge/GitHub-mobina--violet-181717?style=flat-square&logo=github)](https://github.com/mobina-violet)

</div>
