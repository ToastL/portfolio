import { reactive, ref } from 'vue'

export function useScroll() {
  const containerSize = 1280
  const currPos = reactive([0, 0])
  const newPos = ref([0, 0])
  const mouseDown = ref(false)
  const oldTouchPos = ref([0, 0])
  const firstTouch = ref(false)
  
  let lastTime = 0
  let animationId: number

  function mouseDrag(e: MouseEvent) {
    newPos.value[0] += e.movementX * 2
    newPos.value[1] += e.movementY * 2
  }

  function mouseWheel(e: WheelEvent) {
    newPos.value[0] -= e.deltaX
    newPos.value[1] -= e.deltaY
  }

  function mobileDrag(e: TouchEvent) {
    if (!firstTouch.value) {
      newPos.value[0] -= (oldTouchPos.value[0] - e.touches[0].clientX) * 2
      newPos.value[1] -= (oldTouchPos.value[1] - e.touches[0].clientY) * 2
    }

    oldTouchPos.value[0] = e.touches[0].clientX
    oldTouchPos.value[1] = e.touches[0].clientY
    firstTouch.value = false
  }

  function navigate(x: number, y: number, instant = false) {
    newPos.value[0] = -(containerSize - window.innerWidth) / 2 - x
    newPos.value[1] = -(containerSize - window.innerHeight) / 2 - y

    if (instant) {
      currPos[0] = newPos.value[0]
      currPos[1] = newPos.value[1]
    }
  }

  function startAnimation() {
    function loop(now: number) {
      const dt = (now - lastTime) / 1000
      lastTime = now

      currPos[0] += (newPos.value[0] - currPos[0]) * 5 * dt
      currPos[1] += (newPos.value[1] - currPos[1]) * 5 * dt

      // Boundary checks
      if (currPos[0] > 0) {
        currPos[0] -= containerSize
        newPos.value[0] -= containerSize
      }
      if (currPos[1] > 0) {
        currPos[1] -= containerSize
        newPos.value[1] -= containerSize
      }
      if (currPos[0] < -containerSize) {
        currPos[0] += containerSize
        newPos.value[0] += containerSize
      }
      if (currPos[1] < -containerSize) {
        currPos[1] += containerSize
        newPos.value[1] += containerSize
      }

      animationId = requestAnimationFrame(loop)
    }
    animationId = requestAnimationFrame(loop)
  }

  function stopAnimation() {
    if (animationId) {
      cancelAnimationFrame(animationId)
    }
  }

  return {
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
  }
}