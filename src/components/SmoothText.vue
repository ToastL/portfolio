<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, nextTick } from "vue";
import { prepareWithSegments, layoutWithLines } from "@chenglou/pretext";

const props = withDefaults(
  defineProps<{
    text: string;
    stagger?: number;
  }>(),
  {
    stagger: 30,
  }
);

interface Line {
  text: string;
}

const el = ref<HTMLElement | null>(null);
const font = ref("");
const lh = ref(20);
const maxW = ref(0);
const lines = ref<Line[]>([]);
const height = ref<number | null>(null);
const leaving = ref(false);
const gen = ref(0);
const ready = ref(false);

function readStyle() {
  if (!el.value) return;
  const s = getComputedStyle(el.value);
  font.value = `${s.fontWeight} ${s.fontSize} ${s.fontFamily}`;
  lh.value =
    s.lineHeight === "normal"
      ? parseFloat(s.fontSize) * 1.2
      : parseFloat(s.lineHeight);
  maxW.value = el.value.getBoundingClientRect().width;
}

function calcLines(text: string): Line[] {
  if (!text || maxW.value <= 0 || !font.value) return [{ text }];
  const prepared = prepareWithSegments(text, font.value, {
    whiteSpace: "pre-wrap",
  });
  const { lines: result } = layoutWithLines(prepared, maxW.value, lh.value);
  return result.map((l) => ({ text: l.text }));
}

function update(text: string) {
  lines.value = calcLines(text);
  height.value = lines.value.length * lh.value;
}

watch(
  () => props.text,
  async (next, prev) => {
    if (!font.value) return;
    if (!prev || !ready.value) {
      update(next);
      return;
    }

    // Phase 1: cascade out old lines (bottom to top)
    leaving.value = true;
    const fadeOutDuration = 150 + lines.value.length * props.stagger;
    await new Promise((r) => setTimeout(r, fadeOutDuration));

    // Phase 2: swap to new lines, cascade in (top to bottom)
    update(next);
    gen.value++;
    leaving.value = false;
  }
);

let ro: ResizeObserver | null = null;

onMounted(() => {
  readStyle();
  update(props.text);
  nextTick(() => {
    ready.value = true;
  });

  if (el.value) {
    ro = new ResizeObserver(() => {
      readStyle();
      update(props.text);
    });
    ro.observe(el.value);
  }
});

onUnmounted(() => ro?.disconnect());
</script>

<template>
  <span
    ref="el"
    class="block overflow-hidden"
    :class="{ 'transition-[height] duration-300': ready }"
    :style="height != null ? { height: `${height}px` } : {}"
  >
    <span
      v-for="(line, i) in lines"
      :key="`${gen}-${i}`"
      :class="['block', leaving ? 'st-exit' : 'st-enter']"
      :style="{
        animationDelay: leaving
          ? `${(lines.length - 1 - i) * stagger}ms`
          : `${i * stagger}ms`,
      }"
      >{{ line.text.trim() || "\u00A0" }}</span
    >
  </span>
</template>

<style>
.st-enter {
  opacity: 0;
  animation: st-in 0.2s ease forwards;
}
.st-exit {
  animation: st-out 0.15s ease forwards;
}
@keyframes st-in {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes st-out {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-4px);
  }
}
</style>
