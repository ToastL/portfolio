<script setup lang="ts">
import { routes } from '../assets/data';

const emits = defineEmits([ 'navigate' ])

</script>

<template>
    <div class="fixed w-full bottom-10 flex justify-center pointer-events-none">
      <div class="flex items-center border-2 gap-2 px-4 py-1 border-neutral-600/80 rounded-full backdrop-blur-md pointer-events-auto">
        <button v-for="route in routes" @click="() => emits('navigate', route.pos[0], route.pos[1])" class="transition-transform text-neutral-200 hover:scale-105">{{ route.title }}</button>
      </div>
    </div>
</template>