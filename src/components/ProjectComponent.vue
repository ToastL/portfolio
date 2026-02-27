<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { projects } from "../assets/data";
import type { ProjectState } from "../types";

import GithubIcon from "./icons/GithubIcon.vue";
import GitlabIcon from "./icons/GitlabIcon.vue";
import LinkIcon from "./icons/LinkIcon.vue";

const props = defineProps<{
  projectState?: ProjectState;
}>();

const emit = defineEmits<{
  disable: []
}>()

const project = computed(() => projects.find(p => p.id === props.projectState?.projectID))

const containerRef = ref<HTMLElement | null>(null);

function handleClickOutside(event: MouseEvent) {
  if (
    props.projectState &&
    props.projectState.active &&
    containerRef.value &&
    !containerRef.value.contains(event.target as Node)
  ) {
    emit('disable')
  }
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && props.projectState?.active) {
    emit('disable')
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  document.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
  document.removeEventListener("keydown", handleKeydown);
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
        <img v-if="project.img" class="h-full w-full object-cover" :src="project.img" :alt="`Screenshot of ${project.title}`" />
        <div v-else class="placeholder h-full w-full flex items-center justify-center">
          <span class="text-heading/40 text-2xl font-bold tracking-widest">{{ project.title }}</span>
        </div>
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
            <div v-if="project.github || project.link || project.gitlab" class="flex justify-start gap-2 pl-2">
              <a v-if="project.github" target="_blank" :href="project.github" class="p-2 border-2 border-border">
                <GithubIcon class="fill-primary w-5 h-5" />
              </a>
              <a v-if="project.gitlab" target="_blank" :href="project.gitlab" class="p-2 border-2 border-border">
                <GitlabIcon class="fill-primary w-5 h-5" />
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

.placeholder {
  background-image:
    repeating-linear-gradient(
      0deg,
      var(--color-border) 0,
      var(--color-border) 1px,
      transparent 1px,
      transparent 12px
    ),
    repeating-linear-gradient(
      90deg,
      var(--color-border) 0,
      var(--color-border) 1px,
      transparent 1px,
      transparent 12px
    );
  opacity: 0.4;
}
</style>
