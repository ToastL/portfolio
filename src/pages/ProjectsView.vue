<script setup lang="ts">
import { ref } from 'vue'
import { projects } from '@/assets/data'

const { enabled } = defineProps<{
  enabled?: boolean
}>()

const scrollBar = ref()
const spacing = 20

const scrollX = ref(0)
let velocityX = 0
let start = 0

const autoScroll = ref(true)

function onScroll(e: WheelEvent) {
  velocityX += -e.deltaX * 10
}

;(function loop(now) {
  const dt = (now - start) / 1000

  scrollX.value += velocityX * dt
  velocityX *= 0.95

  if (scrollBar.value && -scrollX.value > (scrollBar.value.offsetWidth + spacing) / 2)
    scrollX.value = 0
  if (scrollBar.value && -scrollX.value < 0)
    scrollX.value = -(scrollBar.value.offsetWidth + spacing) / 2

  if (enabled && autoScroll.value) velocityX = -50

  start = now
  requestAnimationFrame(loop)
})(0)
</script>

<template>
  <section class="flex justify-center items-center">
    <div
      class="flex items-center w-10/12 h-96 overflow-x-hidden"
      @mouseenter="autoScroll = false"
      @mouseleave="autoScroll = true"
      @wheel="onScroll"
    >
      <div
        class="h-80 inline-flex"
        :style="{ transform: `translateX(${scrollX}px)`, gap: `${spacing}px` }"
        ref="scrollBar"
      >
        <div
          v-for="(project, i) in projects.concat(...projects)"
          :key="i"
          class="flex flex-col justify-between items-start min-w-80 h-full bg-neutral-700/40 rounded-md border border-neutral-700 shadow scale-95 hover:scale-100 transition-transform p-3 shadow-xl"
        >
          <div
            class="w-full h-56 bg-neutral-700 rounded-md border border-neutral-600 shadow overflow-hidden"
          >
            <img class="w-full h-full" src="" alt="" />
          </div>
          <h2 class="ml-4">{{ project.name }}</h2>
          <button class="bg-orange-600 border border-orange-500 ml-3 px-2 py-1 rounded-md shadow">
            Github
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
