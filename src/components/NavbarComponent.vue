<script setup lang="ts">
import i18next from "i18next";
import { routes } from "../assets/data";

import DutchIcon from "./icons/DutchIcon.vue";
import EnglishIcon from "./icons/EnglishIcon.vue";
import SunIcon from "./icons/SunIcon.vue";
import MoonIcon from "./icons/MoonIcon.vue";

import { onMounted, ref } from "vue";

const emits = defineEmits(["navigate"]);

const isDark = ref(false);
function toggleTheme() {
  isDark.value = document.documentElement.classList.toggle("dark")
  localStorage.theme = isDark.value ? "dark" : "light"
}

onMounted(() => {
  isDark.value = document.documentElement.classList.toggle(
    "dark",
    localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
  )
})
</script>

<template>
  <div
    class="fixed w-full bottom-10 flex justify-center items-center flex-col sm:flex-row gap-1 pointer-events-none"
  >
    <div
      class="flex items-center gap-3 border-2 px-3 py-[4px] sm:py-[6px] border-border/80 rounded-full backdrop-blur-md pointer-events-auto"
    >
      <button
        class="relative text-primary w-5 h-5 overflow-hidden rounded-full cursor-pointer"
        @click="
          $i18next.language == 'nl'
            ? i18next.changeLanguage('en')
            : i18next.changeLanguage('nl')
        "
      >
        <div
          :class="[
            'absolute flex w-[200%] h-full items-center top-0 transition-transform duration-200',
            $i18next.language == 'nl' ? '-translate-x-1/2' : 'translate-x-0',
          ]"
        >
          <DutchIcon class="h-full w-1/2" />
          <EnglishIcon class="h-full w-1/2"/>
        </div>
      </button>
      <button
        class="relative fill-primary w-5 h-5 overflow-hidden cursor-pointer" @click="toggleTheme">
        <div :class="[
            'absolute flex w-[200%] h-full items-center top-0 transition-transform duration-200',
            isDark ? '-translate-x-1/2' : 'translate-x-0',
          ]">
          <SunIcon class="h-full w-1/2"/>
          <MoonIcon class="h-full w-1/2"/>
        </div>
      </button>
    </div>
    <div
      class="flex items-center border-2 gap-2 px-4 py-1 border-border/80 rounded-full backdrop-blur-md pointer-events-auto text-sm sm:text-base"
    >
      <button
        v-for="(route, i) in routes"
        @click="() => emits('navigate', route.pos[0], route.pos[1])"
        class="transition-transform text-secondary hover:scale-105 cursor-pointer"
      >
        {{ $t(`${i}.route`) }}
      </button>
    </div>
  </div>
</template>
