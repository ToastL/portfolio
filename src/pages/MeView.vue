<script setup lang="ts">
import { onMounted } from 'vue'

import profile from '@/assets/images/profile.jpeg'

function isLeapYear(year: number) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

function getAge(start: Date) {
  const startDate = new Date(start)
  const endDate = new Date()
  let timeDifference = endDate.getTime() - startDate.getTime()

  let year = startDate.getFullYear()
  while (year <= endDate.getFullYear()) {
    if (isLeapYear(year)) timeDifference -= 24 * 60 * 60 * 1000
    year += 1
  }

  return Math.floor(timeDifference / 1000 / 60 / 60 / 24 / 365)
}

onMounted(async () => {
  const profileDiv = document.getElementById('profileDiv')

  const profileVel = [0, 0]
  const currProfilePos = [(profileDiv?.clientWidth || 0) / 2, (profileDiv?.clientHeight || 0) / 2]
  let profilePos = [(profileDiv?.clientWidth || 0) / 2, (profileDiv?.clientHeight || 0) / 2]

  profileDiv?.addEventListener('mousemove', (event) => {
    profilePos[0] = event.offsetX
    profilePos[1] = event.offsetY
  })

  profileDiv?.addEventListener('mouseleave', () => {
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
  <section class="flex md:flex-row flex-col-reverse justify-center items-center gap-5">
    <div class="max-w-sm md:text-end text-center">
      <h1 class="text-xl font-bold">Hallo, ik ben Etien den Ouden.</h1>

      <p class="text-neutral-300/90">
        Ik ben {{ getAge(new Date('08/14/2006')) }} jaar oud, ik hou van web development en doe ook
        graag projecten los daarvan. <br><br>Ik sta open om nieuwe dingen te leren en mijn kennis groter
        te maken.
      </p>

      <div class="space-x-2 mt-3">
        <a
          href="https://github.com/ToastL"
          class="bg-orange-600 border border-orange-500 ml-3 px-2 py-1 rounded-md shadow"
          >Github</a
        >
      </div>
    </div>
    <div
      id="profileDiv"
      class="w-62 h-82 rounded-2xl border border-neutral-700 shadow-2xl overflow-hidden"
    >
      <img :src="profile" alt="Profile" />
    </div>
  </section>
</template>
