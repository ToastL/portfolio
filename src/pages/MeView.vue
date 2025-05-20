<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { supabase } from '@/assets/supabase'

const name = ref('')
const description = ref('')
const profile = ref('')

async function getData() {
  const { data } = await supabase.from('main').select()
  if (!data) {
    console.error('Could not fetch data from the database!')
    return
  }

  name.value = data[0].name
  description.value = data[0].description
  profile.value = supabase.storage.from('images').getPublicUrl(data[0].profile).data.publicUrl
}

onMounted(async () => {
  getData()

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
      profileVel[0] = (profilePos[0] - currProfilePos[0]) * 0.1
      profileVel[1] = (profilePos[1] - currProfilePos[1]) * 0.1

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
  <section class="flex justify-center items-center gap-5 text-white">
    <div class="max-w-sm text-end">
      <h1 class="text-xl font-bold">Hello, i'm {{ name }}.</h1>
      <p>{{ description }}</p>
    </div>
    <div
      id="profileDiv"
      class="w-62 h-82 rounded-lg border border-neutral-700 shadow-xl overflow-hidden"
    >
      <img :src="profile" alt="Profile" />
    </div>
  </section>
</template>
