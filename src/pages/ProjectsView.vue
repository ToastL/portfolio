<script setup lang="ts">
import { ref } from 'vue'

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
          v-for="i in 8"
          :key="i"
          class="min-w-80 h-full bg-neutral-700/40 rounded-md border border-neutral-700 shadow scale-95 hover:scale-100 transition-transform"
        ></div>
      </div>
    </div>
  </section>
</template>
