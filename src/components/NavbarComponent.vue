<script setup lang="ts">
import i18next from 'i18next';
import { routes } from '../assets/data';

import DutchIcon from './icons/DutchIcon.vue';
import AmericanIcon from './icons/AmericanIcon.vue';

const emits = defineEmits([ 'navigate' ])

</script>

<template>
    <div class="fixed w-full bottom-10 flex justify-center gap-1 pointer-events-none">
      <div class="flex items-center border-2 px-2 border-neutral-600/80 rounded-full backdrop-blur-md pointer-events-auto">
        <button class="relative text-white w-5 h-5 overflow-hidden cursor-pointer" @click="$i18next.language == 'nl' ? i18next.changeLanguage('en') : i18next.changeLanguage('nl')">
          <div :class="['absolute flex w-[200%] h-full items-center top-0 transition-transform duration-200', $i18next.language == 'nl' ? '-translate-x-1/2' : 'translate-x-0']">
            <DutchIcon />
            <AmericanIcon />
          </div>
        </button>
      </div>
      <div class="flex items-center border-2 gap-2 px-4 py-1 border-neutral-600/80 rounded-full backdrop-blur-md pointer-events-auto">
        <button v-for="route, i in routes" @click="() => emits('navigate', route.pos[0], route.pos[1])" class="transition-transform text-neutral-200 hover:scale-105 cursor-pointer">{{ $t(`${i}.route`) }}</button>
      </div>
    </div>
</template>