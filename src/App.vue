<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";

import ScrollComponent from "./components/ScrollComponent.vue";
import ProjectComponent from "./components/ProjectComponent.vue";
import NavbarComponent from "./components/NavbarComponent.vue";
import CursorComponent from "./components/CursorComponent.vue";

import GithubIcon from "./components/icons/GithubIcon.vue";
import MailIcon from "./components/icons/MailIcon.vue";
import LinkedinIcon from "./components/icons/LinkedinIcon.vue";

import profile from "./assets/img/profile.jpeg";
import {
  languages,
  projects,
  routes,
  summits,
  type ProjectState,
} from "./assets/data";
import { getAge } from "./assets/js/age";

const scrollRef = ref();
function navigate(x: number, y: number, instant = false) {
  scrollRef.value?.navigate(x, y, instant);
}

onMounted(() => {
  navigate(routes.home.pos[0], routes.home.pos[1], true);
});

const projectList: ProjectState[] = reactive([]);
projects.forEach((project) => {
  projectList.push({
    active: false,
    projectID: project.id,
    disableCount: 0,
  });
});

function disableProject(id: number) {
  projectList[id].disableCount++;
  if (projectList[id].disableCount == 9) {
    projectList[id].active = false;
    projectList[id].disableCount = 0;
  }
}
</script>

<template>
  <div class="w-full h-screen">
    <ScrollComponent ref="scrollRef" class="z-0">
      <div
        class="col-span-2 row-span-1 col-start-3 row-start-4 border border-border flex flex-col justify-center items-center"
      >
        <h1 class="text-2xl font-bold text-primary">Etien den Ouden</h1>
        <h2 class="text-xl text-secondary">Web Developer</h2>
      </div>
      <div
        class="flex flex-col gap-6 items-center col-span-2 row-span-3 col-start-3 row-start-5 border border-border"
      >
        <h3 class="text-heading px-2 py-1 border-b-2 border-border w-full">
          {{ $t("about.title") }}
        </h3>
        <div class="w-40 h-40 bg-background">
          <img
            class="w-full h-full object-cover object-center"
            :src="profile"
            alt="profile"
          />
        </div>
        <p class="whitespace-pre-line text-body text-sm p-4">
          {{
            $t("about.content", {
              age: getAge(new Date("08/14/2006")),
              experience: getAge(new Date("06/06/2019")),
            })
          }}
        </p>
        <div class="flex justify-start gap-5">
          <a
            target="_blank"
            href="https://github.com/ToastL"
            class="p-2 border-2 border-border"
            ><GithubIcon class="fill-primary w-5 h-5"
          /></a>
          <a
            target="_blank"
            href="https://www.linkedin.com/in/etien-den-ouden-098421370/"
            class="p-2 border-2 border-border"
            ><LinkedinIcon class="fill-primary w-5 h-5"
          /></a>
          <a
            href="mailto:etiendenouden2006@gmail.com"
            class="p-2 border-2 border-border"
            ><MailIcon class="fill-primary w-5 h-5"
          /></a>
        </div>
      </div>
      <div
        class="flex flex-col col-span-3 row-span-4 col-start-5 row-start-4 border border-border"
      >
        <h3 class="text-heading px-2 py-1 border-b-2 border-border">
          {{ $t("projects.title") }}
        </h3>
        <div class="grid grid-cols-3 grid-rows-3 flex-1">
          <ProjectComponent
            v-for="(_, i) in 9"
            :class="[
              'bg-background border-1 border-border transition-all',
              i % 3 === 0 ? 'border-l-0' : '',
              i % 3 === 2 ? 'border-r-0' : '',
              i < 3 ? 'border-t-0' : '',
              i > 5 ? 'border-b-0' : '',
            ]"
            :project-state="projectList[i]"
            @disable="disableProject(i)"
          />
        </div>
      </div>
      <div
        class="flex flex-col col-span-5 row-span-3 col-start-3 row-start-1 border border-border"
      >
        <h3 class="text-heading px-2 py-1 border-b-2 border-border">
          {{ $t("languages.title") }}
        </h3>
        <div class="flex-1 grid grid-cols-5 grid-rows-3">
          <div
            v-for="(_, i) in 15"
            :class="[
              'border-1 border-border',
              i % 5 === 0 ? 'border-l-0' : '',
              i % 5 === 4 ? 'border-r-0' : '',
              i < 5 ? 'border-t-0' : '',
              i > 9 ? 'border-b-0' : '',
            ]"
          >
            <div
              v-if="languages[i]"
              class="relative w-full h-full group overflow-hidden"
            >
              <h4
                class="absolute top-0 w-full px-2 py-1 text-xs border-b-2 border-border bg-background text-heading -translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400"
              >
                {{ languages[i].title }}
              </h4>
              <div class="flex items-center h-full px-10">
                <component :is="languages[i].icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="col-span-2 row-span-7 col-start-1 row-start-1 border border-border"
      >
        <h3 class="text-heading px-2 py-1 border-b-2 border-border">
          {{ $t("summits.title") }}
        </h3>
        <p class="whitespace-pre-line text-body text-sm p-4">
          {{ $t("summits.content") }}
        </p>
        <div class="flex flex-col gap-3 text-sm px-4">
          <div class="flex items-center flex-col border-b border-border" v-for="summit in summits">
            <div class="flex justify-between w-full text-secondary">
              <p class="w-[130px]">{{ summit.name }}</p>
              <p>{{ summit.height }}m</p>
              <p class="w-[120px]">{{ summit.summit ? $t("summits.reached") : "" }}</p>
            </div>
            <p class="text-body"><span>{{ summit.country }}</span> - <span>{{ summit.date.getDate() }} {{ $t(`month.${summit.date.getMonth()}`) }} {{ summit.date.getFullYear() }}</span></p>
          </div>
        </div>
      </div>
    </ScrollComponent>
    <div
      class="z-10 absolute top-0 left-0 w-full h-full backdrop-saturate-0 backdrop-blur-xs backdrop-brightness-200 pointer-events-none"
      style="
        --mask: radial-gradient(
          circle at 50% 50%,
          rgba(0, 0, 0, 0) 30%,
          rgba(0, 0, 0, 1) 70%
        );
        mask-image: var(--mask);
        -webkit-mask-image: var(--mask);
        zoom: 2;
      "
    ></div>
    <NavbarComponent @navigate="navigate" class="z-20" />
    <CursorComponent />
  </div>
</template>
