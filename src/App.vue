<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";

import ScrollComponent from "./components/ScrollComponent.vue";
import ProjectComponent from "./components/ProjectComponent.vue";
import NavbarComponent from "./components/NavbarComponent.vue";
import CursorComponent from "./components/CursorComponent.vue";

import GithubIcon from "./components/icons/GithubIcon.vue";
import MailIcon from "./components/icons/MailIcon.vue";
import LinkedinIcon from "./components/icons/LinkedinIcon.vue";

import profile from "./assets/img/profile.jpeg";
import { languages, projects, routes, type ProjectState } from "./assets/data";
import { getAge } from "./assets/js/age";

const scrollRef = ref();
function navigate(x: number, y: number, instant = false) {
  scrollRef.value?.navigate(x, y, instant);
}

onMounted(() => {
  navigate(routes.home.pos[0], routes.home.pos[1], true);
});

const projectList: ProjectState[] = reactive([])
projects.forEach((project, i) => {
  projectList.push({
    active: false,
    projectID: project.id,
    disable: true
  })
})
</script>

<template>
  <div class="w-full h-screen">
    <ScrollComponent ref="scrollRef" class="z-0">
      <div
        class="col-span-2 row-span-1 col-start-3 row-start-4 border border-neutral-700 flex flex-col justify-center items-center"
      >
        <h1 class="text-2xl font-bold">Etien den Ouden</h1>
        <h2 class="text-xl text-neutral-200">Web Developer</h2>
      </div>
      <div
        class="flex flex-col gap-6 items-center col-span-2 row-span-3 col-start-3 row-start-5 border border-neutral-700"
      >
        <h3
          class="text-neutral-400 px-2 py-1 border-b-2 border-neutral-700 w-full"
        >
          Over Mij
        </h3>
        <div class="w-40 h-40 bg-white">
          <img
            class="w-full h-full object-cover object-center"
            :src="profile"
            alt="profile"
          />
        </div>
        <p class="text-neutral-300 text-sm p-4">
          Ik ben {{ getAge(new Date("08/14/2006")) }} jaar oud, ik hou van web
          development. Ik programmeer al {{getAge(new Date("06/06/2019")) }} jaar en ben begonnen met het maken van spellen in roblox, en vanuit daar doorgegroeid naar het bouwen van complexere dingen.
          <br><br>
          Los daarvan zit ik op dit moment in het versneld traject op Grafisch Lyceum Utrecht voor web development.
        </p>
        <div class="flex justify-start gap-5">
          <a
            target="_blank"
            href="https://github.com/ToastL"
            class="p-2 border-2 border-neutral-700"
            ><GithubIcon class="fill-white w-5 h-5"
          /></a>
          <a
            target="_blank"
            href="https://www.linkedin.com/in/etien-den-ouden-098421370/"
            class="p-2 border-2 border-neutral-700"
            ><LinkedinIcon class="fill-white w-5 h-5"
          /></a>
          <a
            href="mailto:etiendenouden2006@gmail.com"
            class="p-2 border-2 border-neutral-700"
            ><MailIcon class="fill-white w-5 h-5"
          /></a>
        </div>
      </div>
      <div
        class="flex flex-col col-span-3 row-span-4 col-start-5 row-start-4 border border-neutral-700"
      >
        <h3 class="text-neutral-400 px-2 py-1 border-b-2 border-neutral-700">
          Projecten
        </h3>
        <div class="grid grid-cols-3 grid-rows-3 flex-1">
          <ProjectComponent
            v-for="(_, i) in 9"
            :class="[
              'bg-black border-1 border-neutral-700 transition-all',
              i % 3 === 0 ? 'border-l-0' : '',
              i % 3 === 2 ? 'border-r-0' : '',
              i < 3 ? 'border-t-0' : '',
              i > 5 ? 'border-b-0' : '',
            ]"
            :project-state="projectList[i]"
          />
        </div>
      </div>
      <div
        class="flex flex-col col-span-5 row-span-3 col-start-3 row-start-1 border border-neutral-700"
      >
        <h3 class="text-neutral-400 px-2 py-1 border-b-2 border-neutral-700">
          Talen & Tools
        </h3>
        <div class="flex-1 grid grid-cols-5 grid-rows-3">
          <div
            v-for="(_, i) in 15"
            :class="[
              'border-1 border-neutral-700',
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
                class="absolute top-0 w-full px-2 py-1 border-b-2 border-neutral-700 bg-black -translate-y-full group-hover:translate-y-0 transition-transform"
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
        class="col-span-2 row-span-7 col-start-1 row-start-1 border border-neutral-700"
      ></div>
    </ScrollComponent>
    <div
      class="z-10 absolute top-0 left-0 w-full h-full backdrop-saturate-0 backdrop-blur-xs backdrop-brightness-200 pointer-events-none"
      style="
        mask-image: radial-gradient(
          circle at 50% 50%,
          rgba(0, 0, 0, 0) 30%,
          rgba(0, 0, 0, 1) 70%
        );
        -webkit-mask-image: -moz-radial-gradient(
          circle at 50% 50%,
          rgba(0, 0, 0, 0) 30%,
          rgba(0, 0, 0, 1) 70%
        );
        zoom: 2;
      "
    ></div>
    <NavbarComponent @navigate="navigate" class="z-20" />
    <CursorComponent />
  </div>
</template>
