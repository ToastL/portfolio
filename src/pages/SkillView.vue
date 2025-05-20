<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '@/assets/supabase'
import { type Tables } from '@/assets/database.types'

const { enabled } = defineProps<{
  enabled?: boolean
}>()

const skills = ref<Tables<'skill'>[]>([])

async function getData() {
  const { data } = await supabase.from('skill').select()
  if (!data) return

  skills.value = data
}

onMounted(() => {
  getData()
})
</script>

<template>
  <section class="flex justify-center items-center">
    <div class="flex flex-col text-white gap-3">
      <h1 class="text-xl font-bold">These are the things im good at!</h1>

      <div
        v-for="(skill, i) in skills.sort((a, b) => b.level - a.level)"
        :key="i"
        class="flex flex-col justify-center items-center gap-2"
      >
        <h2>{{ skill.name }}</h2>
        <div
          class="bg-neutral-800 w-full h-5 border border-neutral-700 rounded-full shadow overflow-hidden"
        >
          <div
            :style="{
              backgroundColor: skill.color,
              width: `${enabled ? skill.level : 0}%`,
              transitionDelay: `${50 * i}ms`,
            }"
            class="h-full rounded-md transition-all"
          ></div>
        </div>
      </div>
    </div>
  </section>
</template>
