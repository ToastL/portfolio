<script setup lang="ts">
import { reactive, computed, onMounted, onUnmounted } from 'vue'

const isMobile = computed(() => {
  return screen.width <= 760
})

const cursor = reactive({
  enabled: false,
  radius: 0,
  radiusVel: 0,
  position: [0, 0],
  cursorPosition: [0, 0],
})

let animationFrameId: number | null = null

function onMouseMove(event: MouseEvent) {
  cursor.position[0] = event.clientX
  cursor.position[1] = event.clientY
}

function onMouseLeave() {
  cursor.enabled = false
}

function onMouseEnter(event: MouseEvent) {
  cursor.enabled = true
  cursor.position[0] = event.clientX
  cursor.position[1] = event.clientY
}

function onClick() {
  cursor.radiusVel = 2
}

function loop() {
  cursor.cursorPosition[0] += (cursor.position[0] - cursor.cursorPosition[0]) / 5
  cursor.cursorPosition[1] += (cursor.position[1] - cursor.cursorPosition[1]) / 5

  cursor.radius += cursor.radiusVel
  if (cursor.enabled) cursor.radius += (25 - cursor.radius) / 10

  cursor.radiusVel -= 0.3
  if (cursor.radiusVel < -1) cursor.radiusVel = -1
  if (cursor.radius < 0) cursor.radius = 0

  animationFrameId = requestAnimationFrame(loop)
}

onMounted(() => {
  if (isMobile.value) return

  document.body.addEventListener('mousemove', onMouseMove)
  document.body.addEventListener('mouseleave', onMouseLeave)
  document.body.addEventListener('mouseenter', onMouseEnter)
  document.body.addEventListener('click', onClick)
  animationFrameId = requestAnimationFrame(loop)
})

onUnmounted(() => {
  if (isMobile.value) return

  document.body.removeEventListener('mousemove', onMouseMove)
  document.body.removeEventListener('mouseleave', onMouseLeave)
  document.body.removeEventListener('mouseenter', onMouseEnter)
  document.body.removeEventListener('click', onClick)
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId)
  }
})
</script>

<template>
  <div
    v-if="!isMobile"
    :style="{
      left: `${cursor.cursorPosition[0] - cursor.radius / 2}px`,
      top: `${cursor.cursorPosition[1] - cursor.radius / 2}px`,
      width: `${cursor.radius}px`,
      height: `${cursor.radius}px`,
    }"
    class="pointer-events-none fixed rounded-full backdrop-invert z-20 backdrop-saturate"
  ></div>
</template>
