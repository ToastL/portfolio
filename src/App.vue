<script setup lang="ts">
import { ref } from 'vue'

import WelcomeView from '@/pages/WelcomeView.vue'
import MeView from '@/pages/MeView.vue'
import SkillView from '@/pages/SkillView.vue'
import ProjectsView from '@/pages/ProjectsView.vue'

import CursorElement from '@/components/CursorElement.vue'

const routes = [
  { name: 'Home', page: WelcomeView },
  { name: 'About Me', page: MeView },
  { name: 'My Skills', page: SkillView },
  { name: 'Projects', page: ProjectsView },
]

const scroll = ref(0)
const height = ref(window.innerHeight)

const setTitle = () => (document.title = routes[Math.floor(scroll.value / height.value)].name)
setTitle()

document.addEventListener('scroll', () => {
  scroll.value = window.scrollY
  setTitle()
})

document.addEventListener('resize', () => (height.value = window.innerHeight))

function toPage(i: number) {
  window.scrollTo(0, window.innerHeight * i)
}
</script>

<template>
  <main class="relative w-full h-screen scroll-smooth">
    <div
      v-for="(route, i) in routes"
      :key="i"
      class="even:bg-neutral-800 odd:bg-neutral-900 relative w-full h-screen"
    >
      <component
        :enabled="scroll > (height - 100) * i"
        :id="`page${i}`"
        :is="route.page"
        class="top-0 left-0 w-full h-full"
        :class="{ fixed: scroll > height * i }"
      />
    </div>
  </main>

  <nav
    class="fixed flex flex-col justify-center items-center gap-5 top-0 right-0 w-20 h-screen z-20"
  >
    <button
      v-for="(route, i) in routes"
      :key="i"
      class="group relative transition-colors duration-500 w-4 h-4 rounded-full border border-white"
      :class="{ 'bg-white': scroll >= height * i - height / 2 }"
      @click="toPage(i)"
    >
      <h3
        class="pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity absolute whitespace-nowrap top-1/2 -translate-y-1/2 -translate-x-[115%]"
      >
        {{ route.name }}
      </h3>
    </button>
  </nav>

  <CursorElement />
</template>
