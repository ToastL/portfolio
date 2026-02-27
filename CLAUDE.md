# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Etien den Ouden. Built with Vue 3 (Composition API), TypeScript, TailwindCSS v4, and Vite. Bilingual (Dutch/English) via i18next. Live at https://etiendenouden.nl.

## Commands

```bash
yarn dev          # Start dev server
yarn build        # Type-check (vue-tsc) + production build
yarn lint         # Lint with oxlint
yarn lint:fix     # Lint and auto-fix
yarn type-check   # Type-check only (vue-tsc --noEmit)
yarn clean        # Remove dist/
```

No test framework is configured. Node >= 22.12.0 required. Package manager: Yarn 1.22.22.

## Architecture

### Scroll-Based Navigation (not router-based)

The site uses a custom infinite-scroll grid instead of Vue Router. Content is laid out on a fixed 1280x1280px grid that repeats in a 3x3 tiling pattern. Navigation "routes" are x,y coordinate positions defined in `src/assets/data.ts`. Clicking a nav item smoothly scrolls to that position.

Key flow: `NavbarComponent` emits route name → `App.vue` calls `navigateToRoute()` from `useNavigation` composable → `ScrollComponent.navigate()` animates to the target coordinates.

### Composables (state management)

No Vuex/Pinia. All state lives in composables under `src/composables/`:

- **useNavigation** — Holds ref to ScrollComponent, exposes `navigateToRoute(routeName, instant?)`
- **useScroll** — Animation loop for mouse drag, touch, and wheel scroll with velocity/easing interpolation
- **useProjects** — Manages which project cards are expanded in the 3x3 project grid (only 3 real projects mapped to 9 slots)
- **useAge** — Computes current age and years of experience dynamically

### Internationalization

i18next with browser language detection. Fallback language is Dutch (nl). Locale files at `src/assets/js/locales/{en,nl}.json`. Translations use `$t()` in templates with interpolation (`{{ age }}`, `{{ experience }}`). Language toggle is in the navbar.

### Theming

Light/dark toggle via `.dark` class on `<html>`. Theme colors defined as CSS custom properties in `src/styles/main.css` using TailwindCSS v4's `@theme` directive. Persisted to `localStorage.theme` with system preference fallback.

### Static Data

All portfolio content (projects, languages, summits, social links, routes) is defined as typed constants in `src/assets/data.ts` and `src/types/index.ts`. No API calls or backend.

## Conventions

- All components use `<script setup lang="ts">` with Composition API
- Props/emits typed via `defineProps<T>()` and `defineEmits<T>()`
- TypeScript strict mode with no unused locals/parameters
- Types centralized in `src/types/index.ts`
- Icon components are individual SVG wrappers in `src/components/icons/`
- Mobile breakpoint: 760px viewport width (CursorComponent hidden below this)
