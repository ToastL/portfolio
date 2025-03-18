<script setup lang="ts">
import { markRaw, reactive } from 'vue'

import WelcomeView from '@/pages/WelcomeView.vue'
import MeView from '@/pages/MeView.vue'
import ProjectsView from '@/pages/ProjectsView.vue'

import CursorElement from '@/components/CursorElement.vue'

const router = reactive({
  route: 0,
  routes: markRaw([
    WelcomeView,
    MeView,
    ProjectsView
  ]),

  down: true,
  allowScroll: true,

  scroll(direction: number) {
    if (!this.allowScroll) return

    if (this.route + direction < 0 || this.route + direction >= this.routes.length) return

    this.down = direction > 0

    this.route += direction
    this.allowScroll = false
  },

  scrollTo(location: number) {
    if (!this.allowScroll) return

    if (location < 0 || location >= this.routes.length) return

    this.down = location - this.route > 0

    this.route = location
    this.allowScroll = false
  }
})

document.addEventListener('wheel', (event) => event.deltaY > 0 ? router.scroll(1) : router.scroll(-1))

let yDown: null | number = null
document.addEventListener('touchstart', (event) => yDown = event.touches[0].clientY)
document.addEventListener('touchmove', (event) => {
  if (!yDown) return
  
  const yUp = event.touches[0].clientY
  const yDiff = yDown - yUp

  yDiff > 0 ? router.scroll(1) : router.scroll(-1)

  yDown = null
})
</script>

<template>
  <main class="relative overflow-hidden flex justify-center items-center w-full h-screen">
    <transition-group
      enter-active-class="transition-all duration-500 ease-in z-10"
      :enter-from-class="router.down ? 'translate-y-full' : '-translate-y-full'"
      enter-to-class="translate-y-0"
      leave-active-class="z-0 absolute duration-[0.49s]"
      @after-leave="router.allowScroll = true"
    >
      <template v-for="(page, i) in router.routes">
        <component v-if="router.route == i" :is="page" class="absolute w-full h-full" />
      </template>
    </transition-group>
  </main>

  <nav
    class="fixed flex flex-col justify-center items-center gap-5 top-0 right-0 w-20 h-screen z-20"
  >
    <button v-for="(_, i) in router.routes" @click="router.scrollTo(i)" class="transition-colors duration-500 w-4 h-4 rounded-full border border-white" :class="{ 'bg-white': router.route == i }"></button>
  </nav>

  <CursorElement />
</template>
