# Parsian Porto Alvand

A modern, SEO-optimized corporate website for **Parsian Porto Alvand**, an Iranian manufacturer of induction furnace systems (melting, forging, hardening, and forming furnaces), their spare parts, and peripheral equipment.

**Live site:** [parsian-partoalvand.netlify.app](https://parsian-partoalvand.netlify.app/)

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-316192?logo=postgresql)](https://www.postgresql.org/)

---
## 📸 Preview

<div align="center">
  <img src="docs/screenshot/home.webp" alt="Home page" width="800" />
  <br /><br />
  <img src="docs/screenshot/products.webp" alt="Product detail page" width="800" />
  <br /><br />
</div>

---
## About

A full-featured, Persian (RTL) B2B lead-generation site built for an industrial client. The project goes beyond a typical marketing site — it includes a product catalog driven by a real database, a lead-capture and notification pipeline, a moderated review system, and a private admin dashboard for the client.

## Features

**Public site**
- Product catalog for induction furnaces with category-specific technical specification tables (power, frequency, melting rate, etc.)
- Spare parts & peripheral equipment catalog with nested category filters
- Project showcase filterable by industry
- Articles / blog section for SEO content
- Customer reviews per product (star rating, moderated before publishing)
- Site-wide search with live autocomplete (products, parts, and articles)
- Consultation request form + floating WhatsApp contact button
- Fully responsive, RTL-first design with a custom Persian font

**Backend & integrations**
- PostgreSQL database via Prisma ORM, modeling products, projects, articles, reviews, and leads
- Instant Telegram bot notification on every new consultation request
- Dynamic `sitemap.xml` and `robots.txt`, per-page metadata and JSON-LD structured data
- Password-protected `/admin` dashboard (separate from the public layout) for the client to:
  - View and triage consultation/contact leads, updating their status
  - Approve or remove customer reviews before they go public

## Tech Stack

- **Framework:** Next.js 16 (App Router, Server Actions)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, custom Iranian Sans font
- **Database / ORM:** PostgreSQL + Prisma
- **Forms & validation:** React Hook Form + Zod
- **Icons:** Lucide React
- **Hosting:** Netlify (CI/CD on every push)

## Status

Feature-complete and live on a Netlify subdomain. The client is finalizing a custom domain purchase before final handoff.
