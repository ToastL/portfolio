<script setup lang="ts">
import { ref } from 'vue'

import CursorElement from '@/components/CursorElement.vue'
import NavbarElement from '@/components/NavbarElement.vue'
import { routes } from '@/routes';

const scroll = ref(0)
const height = ref(window.innerHeight)

const setTitle = () => (document.title = routes[Math.floor(scroll.value / height.value)].name)
setTitle()

document.addEventListener('scroll', () => {
  scroll.value = window.scrollY
  setTitle()
})

document.addEventListener('resize', () => (height.value = window.innerHeight))
</script>

<template>
  <main class="relative w-full h-screen">
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

  <NavbarElement :scroll="scroll" :height="height" />
  <CursorElement />
</template>
