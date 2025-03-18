<script setup lang="ts">
import { reactive } from 'vue'

const cursor = reactive({
  enabled: false,
  size: [15, 15],
  position: [0, 0],
  cursorPosition: [0, 0]
})

document.body.addEventListener('mousemove', (e) => {
  cursor.position[0] = e.clientX
  cursor.position[1] = e.clientY
})

document.body.addEventListener('mouseleave', () => (cursor.enabled = false))
document.body.addEventListener('mouseenter', () => (cursor.enabled = true))

;(function loop() {
  cursor.cursorPosition[0] += (cursor.position[0] - cursor.cursorPosition[0]) / 3
  cursor.cursorPosition[1] += (cursor.position[1] - cursor.cursorPosition[1]) / 3

  requestAnimationFrame(loop)
})()
</script>

<template>
  <transition
    enter-active-class="transition-transform absolute duration-200"  
    enter-from-class="scale-0"
    enter-to-class="scale-100"
    leave-active-class="transition-transform absolute duration-200"  
    leave-from-class="scale-100"
    leave-to-class="scale-0"
  >
    <div
      v-if="cursor.enabled"
      :style="{
        left: `${cursor.cursorPosition[0] - cursor.size[0] / 2}px`,
        top: `${cursor.cursorPosition[1] - cursor.size[1] / 2}px`,
        width: `${cursor.size[0]}px`,
        height: `${cursor.size[1]}px`,
      }"
      class="pointer-events-none fixed rounded-full backdrop-invert z-20 backdrop-saturate"
    ></div>
  </transition>
</template>
