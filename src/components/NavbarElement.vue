<script setup lang="ts">
import { routes } from "@/routes"

defineProps<{
  scroll: number
  height: number
}>()


function toPage(i: number) {
  window.scrollTo(0, window.innerHeight * i)
}
</script>

<template>
  <nav
    class="fixed flex flex-col justify-center items-center gap-5 top-0 right-0 w-20 h-screen z-20"
  >
    <button
      v-for="(route, i) in routes"
      :key="i"
      class="group relative transition-colors duration-500 w-4 h-4 rounded-full border border-white"
      :class="{ 'bg-white': scroll >= height * i - height / 2 }"
      @click="toPage(i)"
    >
      <h3
        class="pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity absolute whitespace-nowrap top-1/2 -translate-y-1/2 -translate-x-[115%]"
      >
        {{ route.name }}
      </h3>
    </button>
  </nav>
</template>