<script setup lang="ts">
import { onMounted, ref } from 'vue'

onMounted(() => {
  const profileDiv = document.getElementById('profileDiv')

  let profileVel = [0, 0]
  let currProfilePos = [(profileDiv?.clientWidth || 0) / 2, (profileDiv?.clientHeight || 0) / 2]
  let profilePos = [(profileDiv?.clientWidth || 0) / 2, (profileDiv?.clientHeight || 0) / 2]

  profileDiv?.addEventListener('mousemove', (event) => {
    profilePos[0] = event.offsetX
    profilePos[1] = event.offsetY
  })

  profileDiv?.addEventListener('mouseleave', (event) => {
    profilePos = [profileDiv.clientWidth / 2, profileDiv.clientHeight / 2]
  })

  const profileLoop = () => {
    if (profileDiv) {
      profileVel[0] = (profilePos[0] - currProfilePos[0]) * 0.2
      profileVel[1] = (profilePos[1] - currProfilePos[1]) * 0.2

      currProfilePos[0] += profileVel[0]
      currProfilePos[1] += profileVel[1]

      profileDiv.style.transform = `perspective(500px) rotateX(${(currProfilePos[1] - profileDiv.clientHeight / 2) / 10}deg) rotateY(${-(currProfilePos[0] - profileDiv.clientWidth / 2) / 10}deg)`
    }

    requestAnimationFrame(profileLoop)
  }

  profileLoop()
})
</script>

<template>
  <section class="flex justify-center items-center gap-5 bg-neutral-800 text-white">
    <div class="max-w-sm text-end">
      <h1 class="text-xl font-bold">I'm Etien den Ouden</h1>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias pariatur culpa adipisci
        commodi, dolorum magni, labore laborum facilis, qui autem sed officia sit! Totam ex aliquid
        saepe dolor rerum debitis.
      </p>
    </div>
    <div id="profileDiv" class="w-62 h-82 rounded-lg border border-neutral-700 shadow-xl"></div>
  </section>
</template>
