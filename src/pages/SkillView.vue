<script setup lang="ts">
import { skills } from '@/assets/data'

const { enabled } = defineProps<{
  enabled?: boolean
}>()
</script>

<template>
  <section class="flex justify-center items-center">
    <div class="flex flex-col gap-3">
      <h1 class="text-center text-xl font-bold">Waar ben ik goed in?</h1>

      <div
        v-for="(skill, i) in skills.sort((a, b) => b.level - a.level)"
        :key="i"
        class="flex flex-col justify-center items-center gap-2"
      >
        <h2>{{ skill.name }}</h2>
        <div
          class="bg-neutral-800 w-80 h-5 border border-neutral-700 rounded-full shadow overflow-hidden"
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
