<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import type { Project } from "../assets/data";

import GithubIcon from "./icons/GithubIcon.vue";

const { project } = defineProps<{
  project?: Project;
}>();

const active = ref(false);
const containerRef = ref<HTMLElement | null>(null);

function handleClickOutside(event: MouseEvent) {
  if (
    active.value &&
    containerRef.value &&
    !containerRef.value.contains(event.target as Node)
  ) {
    active.value = false;
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

</script>

<template>
  <div ref="containerRef" class="relative">
    <div
      v-if="project"
      @click="active = true"
      :class="[
        'absolute flex flex-col border-neutral-700 bg-black transition-all duration-300 overflow-hidden',
        active
          ? 'min-h-full w-[200%] -translate-1/4 z-10 border-2'
          : 'z-0 w-full h-full',
      ]"
    >
      <h4
        class="text-neutral-400 px-2 py-1 border-b-2 border-neutral-700 text-xs"
      >
        {{ project.title }}
      </h4>

      <div
        :class="['relative overflow-hidden border-neutral-700', active ? 'h-40 border-b-2' : 'h-full']"
      >
        <img
          class="h-full w-full object-cover"
          :src="project.img"
          alt="Project Image"
        />
      </div>

      <transition name="fade">
        <div v-if="active" class="flex justify-center z-0 py-5">
          <div class="w-72 space-y-5">
            <p class="text-neutral-300 text-sm whitespace-pre-line">{{ project.detail }}</p>
            <div class="flex justify-start">
              <a
                target="_blank"
                :href="project.github"
                class="p-1 bg-[#de5d40] border border-neutral-700"
                ><GithubIcon class="fill-white w-7 h-7"
              /></a>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<style>
.fade-enter-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
