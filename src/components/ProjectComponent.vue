<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { projects } from "../assets/data";
import type { ProjectState } from "../types";

import GithubIcon from "./icons/GithubIcon.vue";
import LinkIcon from "./icons/LinkIcon.vue";

const { projectState } = defineProps<{
  projectState?: ProjectState;
}>();

const emit = defineEmits<{
  disable: []
}>()

const project = projects.find(project => project.id === projectState?.projectID)

const containerRef = ref<HTMLElement | null>(null);

function handleClickOutside(event: MouseEvent) {
  if (
    projectState &&
    projectState.active &&
    containerRef.value &&
    !containerRef.value.contains(event.target as Node)
  ) {
    emit('disable')
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
    <div v-if="projectState && project" @click="projectState.active = true;" :class="[
      'absolute flex flex-col border-border bg-background transition-all duration-300 overflow-hidden',
      projectState.active
        ? 'min-h-full w-[200%] -translate-1/4 z-10 border-2'
        : 'z-0 w-full h-full cursor-pointer',
    ]">
      <h4 class="text-heading px-2 py-1 border-b-2 border-border text-xs">
        {{ project.title }}
      </h4>

      <div :class="[
        'relative overflow-hidden border-border',
        projectState.active ? 'h-40 border-b-2' : 'h-full',
      ]">
        <img class="h-full w-full object-cover" :src="project.img" alt="Project Image" />
      </div>

      <transition name="fade">
        <div v-if="projectState.active" class="flex justify-center z-0 py-5">
          <div class="w-72 space-y-5">
            <div v-if="project.languages.length > 0" class="pl-2">
              <span v-for="lang in project.languages"
                class="mr-1 mb-1 inline-flex gap-2 relative p-2 border-2 border-border group">
                <component :is="lang.icon" class="grayscale-100 brightness-200 w-5 h-5" />
                <span class="text-sm text-secondary">{{ lang.title }}</span>
              </span>
            </div>
            <p class="text-body text-sm whitespace-pre-line">
              {{ $t(`projects.detail.${project.id}`) }}
            </p>
            <div v-if="project.github || project.link" class="flex justify-start gap-2 pl-2">
              <a v-if="project.github" target="_blank" :href="project.github" class="p-2 border-2 border-border">
                <GithubIcon class="fill-primary w-5 h-5" />
              </a>
              <a v-if="project.link" target="_blank" :href="project.link" class="p-2 border-2 border-border">
                <LinkIcon class="fill-primary w-5 h-5" />
              </a>
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
