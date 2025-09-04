<script setup lang="ts">
import { reactive } from "vue";

const containerSize = 1280;

let currPos = reactive([0, 0]);
let newPos = [0, 0];

let mousedown: boolean;

function mouseDrag(e: MouseEvent) {
  newPos[0] += e.movementX * 2;
  newPos[1] += e.movementY * 2;
}

function mouseWheel(e: WheelEvent) {
  newPos[0] -= e.deltaX;
  newPos[1] -= e.deltaY;
}

let oldTouchPos = [0, 0];
let firstTouch = false;
function mobileDrag(e: TouchEvent) {
  if (!firstTouch) {
    newPos[0] -= (oldTouchPos[0] - e.touches[0].clientX) * 2;
    newPos[1] -= (oldTouchPos[1] - e.touches[0].clientY) * 2;
  }

  oldTouchPos[0] = e.touches[0].clientX;
  oldTouchPos[1] = e.touches[0].clientY;

  firstTouch = false;
}

let lastTime = 0;
(function loop(now: number) {
  let dt = (now - lastTime)/1000
  lastTime = now

  currPos[0] += (newPos[0] - currPos[0]) * 5 * dt;
  currPos[1] += (newPos[1] - currPos[1]) * 5 * dt;

  if (currPos[0] > 0) {
    currPos[0] -= containerSize;
    newPos[0] -= containerSize;
  }
  if (currPos[1] > 0) {
    currPos[1] -= containerSize;
    newPos[1] -= containerSize;
  }
  if (currPos[0] < -containerSize) {
    currPos[0] += containerSize;
    newPos[0] += containerSize;
  }
  if (currPos[1] < -containerSize) {
    currPos[1] += containerSize;
    newPos[1] += containerSize;
  }

  requestAnimationFrame(loop);
})(0);

function navigate(x: number, y: number, instant = false) {
  newPos[0] = -(containerSize - window.innerWidth) / 2 - x;
  newPos[1] = -(containerSize - window.innerHeight) / 2 - y;

  if (instant) {
    currPos[0] = newPos[0];
    currPos[1] = newPos[1];
  }
}

defineExpose({ navigate })
</script>

<template>
  <div
    class="w-full h-full cursor-grab active:cursor-grabbing"
    @mousedown="mousedown = true"
    @mouseup="mousedown = false"
    @mousemove="(e: MouseEvent) => !mousedown || mouseDrag(e)"
    @wheel="(e: WheelEvent) => mouseWheel(e)"
    @touchstart="
      () => {
        firstTouch = true;
        mousedown = true;
      }
    "
    @touchend="mousedown = false"
    @touchmove="(e: TouchEvent) => !mousedown || mobileDrag(e)"
  >
    <div
      class="grid grid-cols-3 grid-rows-3"
      :style="{
        transform: `translate(${currPos[0]}px, ${currPos[1]}px)`,
        width: `${containerSize * 3}px`,
        height: `${containerSize * 3}px`,
      }"
    >
      <div
        v-for="_ in 9"
        key="clone"
        class="grid grid-cols-7 grid-rows-7 bg-background text-primary"
        :style="{ width: `${containerSize}px`, height: `${containerSize}px` }"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>
