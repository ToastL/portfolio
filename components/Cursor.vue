<script setup lang="ts">
const isMobile = ref<Boolean>(false)
const mouseDown = ref<Boolean>(false)

onMounted(() => {
    isMobile.value = window.matchMedia('(max-width: 600px)').matches

    document.addEventListener('mousedown', () => mouseDown.value = true)
    document.addEventListener('mouseup', () => mouseDown.value = false)

    // Mouse handler
    const cursorInner = document.getElementById('cursorInner') || document.createElement('div')
    const cursorOuter = document.getElementById('cursorOuter') || document.createElement('div')

    let innerCursorVel = [0, 0]
    let currCursorPos = [-20, -20]

    let cursorPos = [-20, -20]

    document.addEventListener('mousemove', (e) => {
        cursorPos[0] = e.x - cursorInner.clientWidth / 2
        cursorPos[1] = e.y - cursorInner.clientHeight / 2
    })

    const mouseLoop = () => {

        innerCursorVel[0] = (cursorPos[0]-currCursorPos[0])*.2
        innerCursorVel[1] = (cursorPos[1]-currCursorPos[1])*.2

        currCursorPos[0] += innerCursorVel[0]
        currCursorPos[1] += innerCursorVel[1]

        cursorInner.style.left = `${currCursorPos[0]}px`
        cursorInner.style.top = `${currCursorPos[1]}px`

        cursorOuter.style.left = `${currCursorPos[0]}px`
        cursorOuter.style.top = `${currCursorPos[1]}px`

        requestAnimationFrame(mouseLoop)
    }

    mouseLoop()
})
</script>

<template>
    <div id="cursorInner"
      class="fixed z-20 -translate-x-1/2 -translate-y-1/2 w-[4px] h-[4px] dark:bg-white bg-black rounded-full pointer-events-none">
    </div>
    <div id="cursorOuter"
      :class="'fixed z-20 -translate-x-1/2 -translate-y-1/2 bg-transparent border dark:border-white border-black rounded-full pointer-events-none ' + (mouseDown ? 'w-[30px] h-[30px] duration-[50ms]' : ' w-[50px] h-[50px] duration-200')">
    </div>
    <span v-if="!isMobile">
    </span>
</template>

<style>
* {
  cursor: none;
}
</style>