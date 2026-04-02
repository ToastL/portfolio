<script setup lang="ts">
import { ref, computed, watch, nextTick } from "vue";
import gsap from "gsap";
import { projects } from "../assets/data";
import type { ProjectState } from "../types";

import GithubIcon from "./icons/GithubIcon.vue";
import GitlabIcon from "./icons/GitlabIcon.vue";
import LinkIcon from "./icons/LinkIcon.vue";
import SmoothText from "./SmoothText.vue";

const props = defineProps<{
  projectState?: ProjectState;
}>();

const emit = defineEmits<{
  activate: [];
  closed: [];
}>();

const project = computed(() =>
  projects.find((p) => p.id === props.projectState?.projectID)
);

const expanded = computed(() => props.projectState?.active ?? false);
const elevated = computed(
  () => expanded.value || (props.projectState?.closing ?? false)
);

const cardRef = ref<HTMLElement | null>(null);
const imageRef = ref<HTMLElement | null>(null);
const contentRef = ref<HTMLElement | null>(null);
const contentVisible = ref(false);

watch(expanded, (isExpanded, wasExpanded) => {
  if (!cardRef.value || !imageRef.value) return;

  if (isExpanded && !wasExpanded) {
    gsap.killTweensOf([cardRef.value, imageRef.value]);
    contentVisible.value = true;

    nextTick(() => {
      const tl = gsap.timeline();

      tl.to(cardRef.value!, {
        width: "200%",
        xPercent: -25,
        yPercent: -25,
        borderWidth: 2,
        duration: 0.3,
        ease: "power2.out",
      });

      tl.to(imageRef.value!, {
        height: "10rem",
        duration: 0.3,
        ease: "power2.out",
      }, "<");

      if (contentRef.value) {
        tl.fromTo(contentRef.value,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
          0.1
        );
      }
    });
  } else if (!isExpanded && wasExpanded) {
    gsap.killTweensOf([cardRef.value, imageRef.value]);
    if (contentRef.value) gsap.killTweensOf(contentRef.value);
    gsap.set(cardRef.value, { clearProps: "all" });
    gsap.set(imageRef.value, { clearProps: "all" });
    contentVisible.value = false;
  }
});

watch(
  () => props.projectState?.closing,
  (isClosing) => {
    if (!isClosing || !cardRef.value || !imageRef.value) return;

    const parentHeight = cardRef.value.parentElement?.offsetHeight || 0;

    const tl = gsap.timeline({
      onComplete: () => {
        if (cardRef.value) gsap.set(cardRef.value, { clearProps: "all" });
        if (imageRef.value) gsap.set(imageRef.value, { clearProps: "all" });
        emit("closed");
      },
    });

    if (contentRef.value) {
      tl.to(contentRef.value, {
        opacity: 0,
        y: -10,
        duration: 0.2,
        ease: "power2.in",
      });
    }

    tl.call(() => {
      if (cardRef.value) {
        gsap.set(cardRef.value, { height: cardRef.value.offsetHeight });
      }
      contentVisible.value = false;
    });

    tl.to(cardRef.value, {
      width: "100%",
      height: parentHeight,
      xPercent: 0,
      yPercent: 0,
      borderWidth: 0,
      duration: 0.35,
      ease: "power2.inOut",
    });

    tl.to(imageRef.value, {
      height: "100%",
      duration: 0.35,
      ease: "power2.inOut",
    }, "<");
  }
);
</script>

<template>
  <div class="relative">
    <div
      ref="cardRef"
      v-if="projectState && project"
      @click.stop="emit('activate')"
      class="absolute flex flex-col border-border bg-background overflow-hidden w-full"
      :class="[
        expanded ? 'min-h-full' : 'h-full cursor-pointer',
        elevated ? 'z-10' : 'z-0',
      ]"
    >
      <h4 class="text-heading px-2 py-1 border-b-2 border-border text-xs">
        {{ project.title }}
      </h4>

      <div
        ref="imageRef"
        class="relative overflow-hidden border-border h-full"
        :class="expanded ? 'border-b-2' : ''"
      >
        <img
          v-if="project.img"
          class="h-full w-full object-cover"
          :src="project.img"
          :alt="`Screenshot of ${project.title}`"
        />
        <div
          v-else
          class="placeholder h-full w-full flex items-center justify-center"
        >
          <span class="text-heading/40 text-2xl font-bold tracking-widest">
            {{ project.title }}
          </span>
        </div>
      </div>

      <div
        v-show="contentVisible"
        ref="contentRef"
        class="flex justify-center py-5"
      >
        <div class="w-72 space-y-5">
          <div v-if="project.languages.length > 0" class="pl-2">
            <span
              v-for="lang in project.languages"
              :key="lang.title"
              class="mr-1 mb-1 inline-flex gap-2 relative p-2 border-2 border-border"
            >
              <component
                :is="lang.icon"
                class="grayscale-100 brightness-200 w-5 h-5"
              />
              <span class="text-sm text-secondary">{{ lang.title }}</span>
            </span>
          </div>
          <SmoothText
            :text="$t(`projects.detail.${project.id}`)"
            class="text-body text-sm"
            :stagger="40"
          />
          <div
            v-if="project.github || project.link || project.gitlab"
            class="flex justify-start gap-2 pl-2"
          >
            <a
              v-if="project.github"
              target="_blank"
              :href="project.github"
              class="p-2 border-2 border-border"
            >
              <GithubIcon class="fill-primary w-5 h-5" />
            </a>
            <a
              v-if="project.gitlab"
              target="_blank"
              :href="project.gitlab"
              class="p-2 border-2 border-border"
            >
              <GitlabIcon class="fill-primary w-5 h-5" />
            </a>
            <a
              v-if="project.link"
              target="_blank"
              :href="project.link"
              class="p-2 border-2 border-border"
            >
              <LinkIcon class="fill-primary w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.placeholder {
  background-image: repeating-linear-gradient(
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
