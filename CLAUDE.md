# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start dev server (Next.js)
- `npm run build` — Production build
- `npm run start` — Start production server
- `npm run lint` — Run ESLint (next lint)
- `./deploy.sh` — Deploy to production server via rsync+ssh (builds on remote)

## Project Overview

NextMerce (NextCommerce Community v0.1.2) — a free e-commerce Next.js template. Static frontend with no database or backend (the "lite" version of the paid NextMerce Pro boilerplate).

## Architecture

### Framework & Styling
- **Next.js 16** with App Router, TypeScript, Tailwind CSS 3.3
- Custom Tailwind theme with extensive color palette (blue, red, green, yellow, teal, orange, gray, dark), custom spacing scale (4.5, 7.5, etc.), typography (heading-1 through heading-6), and box shadows

### Route Structure
```
src/app/(site)/              — Main route group
  page.tsx                   — Home page
  layout.tsx                 — Root layout (providers, header, footer, debug panel)
  (pages)/                   — Shop, cart, checkout, contact, auth, etc.
  blogs/                     — Blog grid and details pages
src/app/context/             — React contexts
```

### State Management (Redux Toolkit)
- `src/redux/store.ts` — configureStore with slices:
  - `cart-slice` — Cart state
  - `wishlist-slice` — Wishlist state
  - `quickView-slice` — Quick view modal state
  - `product-details` — Product details state
  - `debug-slice` — Debug panel state
- Typed hooks: `useAppSelector`, `useAppDispatch`

### Component Structure
```
src/components/
  Home/        — Hero carousel, categories, new arrivals, promo, best sellers, countdown, testimonials
  Shop/        — Grid/list product views, shop data
  ShopDetails/ — Product detail page
  ShopWithSidebar/ — Shop with filter sidebar (category, price, size, color, gender dropdowns)
  Cart/        — Cart items, order summary, discount
  Checkout/    — Multi-step checkout (billing, shipping, payment, login)
  Common/      — Breadcrumb, cart sidebar modal, newsletter, preloader, quick view modal, scroll-to-top, product item
  Header/      — Header with dropdown menus
  Footer/      — Site footer
  Blog*/       — Blog grid/details with sidebar variants
  Auth/        — Sign in / Sign up
  Orders/      — Order list, details, edit, actions
  MyAccount/   — Account dashboard with tabs
  Wishlist/    — Wishlist items
  Contact/     — Contact form
  Environment/ — Switch between environments and configure the Behavora widget
```

### Behavora Integration (Custom Feature)
- `src/config/environments.ts` — Dev/prod API endpoints, CDN script URLs, and site IDs
- `src/app/context/EnvironmentContext.tsx` — Toggle between dev/prod environments (persisted to localStorage, reloads on switch)
- `src/components/Environment/index.tsx` — Simulate track requests to Behavora API with random visitor payloads
- Layout loads a Behavora widget script based on the active environment config

### Debug Panel
- `src/debug/` — Floating debug UI with network request logging, page metrics, and tabs (Overview, Predict Requests, Track Requests)
- Intercepts `fetch` to log API calls to Behavora track endpoint

### Deployment
- `deploy.sh` — rsyncs to remote server, then runs `npm run build` and `pm2 restart demo-behavora` via SSH
- Target: `maxim@178.104.39.221:/var/www/demo.behavora.com`

### Data
- All product, blog, testimonial, and category data is hardcoded in component-level data files (e.g., `shopData.ts`, `blogData.ts`, `testimonialsData.ts`)
- Product images served from `/public/images/products/`
- Types in `src/types/` (product.ts, blogItem.ts, category.ts, testimonial.ts, Menu.ts)

### Key Patterns
- Pages use `"use client"` directive (layout included) — no Server Components
- All images use `<img>` tags (not Next.js `Image` component)
- Font: Euclid Circular A (self-hosted woff/woff2 in `src/app/fonts/`)
