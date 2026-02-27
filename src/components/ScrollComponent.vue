<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { useScroll } from "../composables/useScroll";

const {
  currPos,
  mouseDown,
  firstTouch,
  mouseDrag,
  mouseWheel,
  mobileDrag,
  navigate,
  startAnimation,
  stopAnimation,
  containerSize
} = useScroll()

onMounted(() => {
  startAnimation()
})

onUnmounted(() => {
  stopAnimation()
})


defineExpose({ navigate })
</script>

<template>
  <div role="region" aria-label="Scrollable portfolio content" class="w-full h-full cursor-grab active:cursor-grabbing" @mousedown="mouseDown = true"
    @mouseup="mouseDown = false" @mousemove="(e: MouseEvent) => !mouseDown || mouseDrag(e)"
    @wheel="(e: WheelEvent) => mouseWheel(e)" @touchstart="
      () => {
        firstTouch = true;
        mouseDown = true;
      }
    " @touchend="mouseDown = false" @touchmove="(e: TouchEvent) => !mouseDown || mobileDrag(e)">
    <div class="grid grid-cols-3 grid-rows-3" :style="{
      transform: `translate(${currPos[0]}px, ${currPos[1]}px)`,
      width: `${containerSize * 3}px`,
      height: `${containerSize * 3}px`,
    }">
      <div v-for="_ in 9" key="clone" class="grid grid-cols-7 grid-rows-7 bg-background text-primary"
        :style="{ width: `${containerSize}px`, height: `${containerSize}px` }">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
