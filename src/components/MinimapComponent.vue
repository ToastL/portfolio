<script setup lang="ts">
import i18next from "i18next";
import { onMounted, ref, watch } from "vue";

import { routes } from "../assets/data";
import { currPos, containerSize } from "../composables/useScroll";

import DutchIcon from "./icons/DutchIcon.vue";
import EnglishIcon from "./icons/EnglishIcon.vue";
import SunIcon from "./icons/SunIcon.vue";
import MoonIcon from "./icons/MoonIcon.vue";

const emits = defineEmits<{
  navigate: [routeName: keyof typeof routes]
}>();

const isDark = ref(false);

const MINIMAP_SIZE = 160;

const sections = [
  { key: 'summits' as const, col: '1 / 3', row: '1 / 8' },
  { key: 'languages' as const, col: '3 / 8', row: '1 / 4' },
  { key: 'home' as const, col: '3 / 5', row: '4 / 5' },
  { key: 'about' as const, col: '3 / 5', row: '5 / 8' },
  { key: 'projects' as const, col: '5 / 8', row: '4 / 8' },
];

const routeKeys = Object.keys(routes) as Array<keyof typeof routes>;

type Point = { x: number; y: number };

function getContentPosition(): Point {
  const x = -(currPos[0] + (containerSize - window.innerWidth) / 2);
  const y = -(currPos[1] + (containerSize - window.innerHeight) / 2);
  return { x, y };
}

function getClosestRoute(target: Point): keyof typeof routes {
  let closestKey = routeKeys[0];
  let closestDist = Infinity;

  for (const key of routeKeys) {
    const pos = routes[key].pos;
    const dist = (pos[0] - target.x) ** 2 + (pos[1] - target.y) ** 2;
    if (dist < closestDist) {
      closestDist = dist;
      closestKey = key;
    }
  }

  return closestKey;
}

const activeRoute = ref<keyof typeof routes>('home');

// Throttled watch on currPos
let lastWatchTime = 0;
watch(
  currPos,
  () => {
    const now = performance.now();
    if (now - lastWatchTime < 100) return;
    lastWatchTime = now;

    const contentPos = getContentPosition();
    activeRoute.value = getClosestRoute(contentPos);
  },
  { deep: true }
);

function handleNavigate(routeKey: keyof typeof routes) {
  activeRoute.value = routeKey;
  emits("navigate", routeKey);
}

function toggleTheme() {
  isDark.value = document.documentElement.classList.toggle("dark");
  localStorage.theme = isDark.value ? "dark" : "light";
}

onMounted(() => {
  isDark.value = document.documentElement.classList.toggle(
    "dark",
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  const contentPos = getContentPosition();
  activeRoute.value = getClosestRoute(contentPos);

});
</script>

<template>
  <div class="fixed bottom-4 right-4 flex flex-col gap-1 pointer-events-auto">
    <!-- Controls -->
    <div class="flex items-center justify-end">
      <div class="flex items-center gap-3 px-3 py-1.5 border-2 border-border bg-background/80 backdrop-blur-md">
        <button
          aria-label="Toggle language"
          class="relative w-5 h-5 overflow-hidden rounded-full text-primary cursor-pointer"
          @click="
            $i18next.language == 'nl'
              ? i18next.changeLanguage('en')
              : i18next.changeLanguage('nl')
          "
        >
          <div :class="[
            'absolute flex w-[200%] h-full items-center top-0 transition-transform duration-200',
            $i18next.language == 'nl' ? '-translate-x-1/2' : 'translate-x-0',
          ]">
            <DutchIcon class="h-full w-1/2" />
            <EnglishIcon class="h-full w-1/2" />
          </div>
        </button>
        <div class="w-px h-4 bg-border"></div>
        <button
          aria-label="Toggle theme"
          class="relative w-5 h-5 overflow-hidden fill-primary cursor-pointer"
          @click="toggleTheme"
        >
          <div :class="[
            'absolute flex w-[200%] h-full items-center top-0 transition-transform duration-200',
            isDark ? '-translate-x-1/2' : 'translate-x-0',
          ]">
            <SunIcon class="h-full w-1/2" />
            <MoonIcon class="h-full w-1/2" />
          </div>
        </button>
      </div>
    </div>

    <!-- Minimap grid -->
    <div
      class="relative border-2 border-border backdrop-blur-md overflow-hidden"
      :style="{ width: `${MINIMAP_SIZE}px`, height: `${MINIMAP_SIZE}px` }"
    >
      <div class="absolute inset-0 grid grid-cols-7 grid-rows-7">
        <button
          v-for="section in sections"
          :key="section.key"
          :style="{ gridColumn: section.col, gridRow: section.row }"
          :class="[
            'border border-border/50 flex items-center justify-center cursor-pointer transition-colors duration-150',
            activeRoute === section.key
              ? 'bg-primary/15 border-primary/40'
              : 'bg-background/40 hover:bg-primary/10',
          ]"
          @click="handleNavigate(section.key)"
        >
          <span class="text-[8px] text-secondary leading-tight text-center pointer-events-none">
            {{ $t(`${section.key}.route`) }}
          </span>
        </button>
      </div>

    </div>
  </div>
</template>
