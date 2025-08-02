# Pokémon App

## 🎯 Overview
A responsive Pokémon browser built with modern React (Vite + TypeScript), featuring:
- Grid view with **pagination** (page numbers 1 to 66)
- **Infinite scroll** mode (auto-fetch on scroll)
- Dedicated **detail page** for each Pokémon
- Fully **responsive** across mobile, tablet, and desktop
- Loading, error, and skeleton states
- Clean, modular, and testable architecture

🔗 **Live Demo**: https://pokemon-project-peteranwars-projects.vercel.app/ 
📦 **GitHub Repo**: https://github.com/peteranwar/pokemon-project

---

## 🛠 Tech Stack
- **React** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS** (styling)
- **React Router** (navigation)
- **React Query (TanStack Query)** – for data fetching, caching, and infinite queries
- **Git** + **GitHub** – version control
- **Vercel** – deployment

---

## ✅ Requirements Implemented

| Feature | Status | Notes |
|--------|-------|-------|
| Pagination View (1,2,3...66) | ✅ | Manual offset-based query with page controls |
| Infinite Scroll | ✅ | Auto-fetch using `IntersectionObserver` on sentinel |
| Pokémon Detail Page | ✅ | Dedicated route `/pokemon/:id` with full data |
| Loading States | ✅ | Skeletons + Suspense fallback |
| Error Handling | ✅ | ErrorDisplay component + Error Boundary |
| Responsive Design | ✅ | Tailwind grid adapts to screen size |
| Code Quality | ✅ | Modular components, hooks, types |
| Git Commit History | ✅ | Logical, meaningful commits |
| Deployment | ✅ | Hosted on Vercel |

---

## 🌟 Bonus Features Implemented

### ✅ React Query
- Used `useQuery` and `useInfiniteQuery` for data fetching
- Enabled caching (`staleTime: 5m`)
- Optimized re-fetching and loading states

### ✅ React Suspense
- Enabled `suspense: true` in `QueryClient`
- Wrapped detail page in `<Suspense fallback={<PageLoader /> />`
- Eliminated manual `isLoading` checks

### ✅ Error Boundary
- Created `ErrorBoundary` class component
- Catches runtime JS errors and renders fallback UI
- Prevents app crashes


## 📂 Project Structure
/src
/components → Reusable UI (Button, Card, Skeleton)
/pages → Page-level views (List, Detail)
/hooks → Custom hooks 
/services → API logic and data query fetching
/types → TypeScript interfaces
/utils → Helpers

---

## 🚀 How to Run
```bash
npm install
npm run dev

npm run build
npm run preview


### Notes
Infinite scroll uses IntersectionObserver with a sentinel element
Pagination supports jumping to any page (1–66)
All images use official PokéAPI sprites
Type safety ensured via PokemonListResponse and Pokemon interfaces
Clean, semantic HTML and accessible buttons




🙌 Submission
This project demonstrates:

Strong understanding of React patterns
State management with React Query
Responsive and accessible UI
Professional project structure
Attention to detail in UX and error handling


Thank you for reviewing my submission!