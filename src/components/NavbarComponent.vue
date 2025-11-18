<script setup lang="ts">
import i18next from "i18next";

import { routes } from "../assets/data";
import { currPos, containerSize } from "../composables/useScroll";

import DutchIcon from "./icons/DutchIcon.vue";
import EnglishIcon from "./icons/EnglishIcon.vue";
import SunIcon from "./icons/SunIcon.vue";
import MoonIcon from "./icons/MoonIcon.vue";

import { onMounted, onUnmounted, ref, nextTick, watch } from "vue";

type Point = { x: number; y: number };

const emits = defineEmits(["navigate"]);

const isDark = ref(false);
const activeRouteIndex = ref(0);
const buttonRefs = ref<(HTMLElement | null)[]>([]);
const navContainerRef = ref<HTMLElement | null>(null);
const backgroundStyle = ref({
  width: '0px',
  transform: 'translateX(0px)'
});

const routeKeys = Object.keys(routes) as Array<keyof typeof routes>;

// Convert scroll position to content position
function getContentPosition(scrollPos: typeof currPos): Point {
  const x = -(scrollPos[0] + (containerSize - window.innerWidth) / 2);
  const y = -(scrollPos[1] + (containerSize - window.innerHeight) / 2);
  return { x, y };
}

// Get closest route to current scroll position
function getClosestRoute(target: Point): number {
  const routePoints: Point[] = routeKeys.map(key => ({
    x: routes[key].pos[0],
    y: routes[key].pos[1]
  }));

  if (routePoints.length === 0) return 0;

  const closest = routePoints.reduce(
    (best, p, i) => {
      const dist = (p.x - target.x) ** 2 + (p.y - target.y) ** 2;
      return dist < best.dist ? { index: i, point: p, dist } : best;
    },
    {
      index: 0,
      point: routePoints[0],
      dist: (routePoints[0].x - target.x) ** 2 + (routePoints[0].y - target.y) ** 2
    }
  );

  return closest.index;
}

function toggleTheme() {
  isDark.value = document.documentElement.classList.toggle("dark")
  localStorage.theme = isDark.value ? "dark" : "light"
}

function handleNavigate(index: number) {
  activeRouteIndex.value = index;
  const routeKey = routeKeys[index];
  emits("navigate", routeKey);
  updateBackgroundPosition();
}

function updateBackgroundPosition() {
  nextTick(() => {
    const activeButton = buttonRefs.value[activeRouteIndex.value];
    const container = navContainerRef.value;

    if (activeButton && container) {
      const containerRect = container.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();

      const offsetX = buttonRect.left - containerRect.left;
      const buttonWidth = buttonRect.width;

      backgroundStyle.value = {
        width: `${buttonWidth}px`,
        transform: `translateX(${offsetX}px)`
      };
    }
  });
}

// Watch scroll position and update active route automatically
if (currPos) {
  watch(
    currPos,
    () => {
      const contentPos = getContentPosition(currPos);
      const closestIndex = getClosestRoute(contentPos);

      if (closestIndex !== activeRouteIndex.value) {
        activeRouteIndex.value = closestIndex;
        updateBackgroundPosition();
      }
    },
    { deep: true, immediate: false }
  );
}

onMounted(() => {
  isDark.value = document.documentElement.classList.toggle(
    "dark",
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  // Initialize active route based on current scroll position
  if (currPos) {
    const contentPos = getContentPosition(currPos);
    activeRouteIndex.value = getClosestRoute(contentPos);
  }

  // Initialize background position
  updateBackgroundPosition();

  // Update on window resize
  window.addEventListener('resize', updateBackgroundPosition);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateBackgroundPosition);
});
</script>

<template>
  <div class="fixed w-full bottom-10 flex justify-center items-center flex-col sm:flex-row gap-1 pointer-events-none">
    <div
      class="flex items-center gap-3 border-2 px-3 py-[4px] sm:py-[6px] border-border/80 rounded-full backdrop-blur-md pointer-events-auto">
      <button class="relative text-primary w-5 h-5 overflow-hidden rounded-full cursor-pointer" @click="
        $i18next.language == 'nl'
          ? i18next.changeLanguage('en')
          : i18next.changeLanguage('nl')
        ">
        <div :class="[
          'absolute flex w-[200%] h-full items-center top-0 transition-transform duration-200',
          $i18next.language == 'nl' ? '-translate-x-1/2' : 'translate-x-0',
        ]">
          <DutchIcon class="h-full w-1/2" />
          <EnglishIcon class="h-full w-1/2" />
        </div>
      </button>
      <button class="relative fill-primary w-5 h-5 overflow-hidden cursor-pointer" @click="toggleTheme">
        <div :class="[
          'absolute flex w-[200%] h-full items-center top-0 transition-transform duration-200',
          isDark ? '-translate-x-1/2' : 'translate-x-0',
        ]">
          <SunIcon class="h-full w-1/2" />
          <MoonIcon class="h-full w-1/2" />
        </div>
      </button>
    </div>
    <div ref="navContainerRef"
      class="relative flex items-center gap-3 px-4 py-1 pointer-events-auto text-sm sm:text-base">
      <div class="absolute left-0 top-0 h-full transition-all duration-300 ease-out z-0" :style="{
        transform: backgroundStyle.transform
      }">
        <div
          class="left-1/2 top-0 -translate-x-[10px] h-full px-2 border-2 border-border bg-background/80 backdrop-blur-md rounded-full">
          <div :style="{
            width: backgroundStyle.width,
          }"></div>
        </div>
      </div>
      <button v-for="(routeKey, index) in routeKeys" :key="routeKey"
        :ref="(el) => { if (el) buttonRefs[index] = el as HTMLElement }" @click="() => handleNavigate(index)"
        class="relative z-10 transition-transform text-secondary hover:scale-105 cursor-pointer">
        {{ $t(`${routeKey}.route`) }}
      </button>
    </div>
  </div>
</template>
