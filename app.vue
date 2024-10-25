<script setup lang="ts">
import Cursor from "./components/Cursor.vue"

import ModelHome from "~/components/ModelHome.vue"

import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'

import Logo from '~/assets/images/toaster.png'

useSeoMeta({
  title: 'Toaster',
  description: 'Description...',
  // icon: Logo,
  // lang: 'en_us',
  ogTitle: 'Toaster',
  ogDescription: 'Description...',
  ogImage: Logo,
  ogUrl: 'test',
  twitterTitle: 'Toaster',
  twitterDescription: 'Description...',
  twitterImage: Logo,
  twitterCard: 'app'
})

const graphql = useStrapiGraphQL()

const { projects, common, socials } = await graphql(`
  query {
    projects {
      title
      description
      git
      banner {
        url
      }
    }
    
    common {
      about
      
      profile {
        url
      }
    }
      
    socials {
      icon {
        url
      }
      type
      url
    }
  }
`)
  .then(res => res.data)

let icons = {}
for (let i in socials)
  icons[socials[i].type] = await fetch(useStrapiMedia(socials[i].icon.url)).then(res => res.text())

const isMobile = ref<Boolean>(false)
const mouseDown = ref<Boolean>(false)
onMounted(() => {
  isMobile.value = window.matchMedia('(max-width: 600px)').matches

  document.addEventListener('mousedown', () => mouseDown.value = true)
  document.addEventListener('mouseup', () => mouseDown.value = false)

  
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }

  // Profile handler

  const profileDiv = document.getElementById("profileDiv") || document.createElement("div")

  let profileDivVel = [0, 0]
  let currProfileDivPos = [profileDiv.clientWidth/2, profileDiv.clientHeight/2]
  let profileDivPos = [profileDiv.clientWidth/2, profileDiv.clientHeight/2]

  profileDiv.addEventListener("mousemove", e => {
    profileDivPos[0] = e.offsetX
    profileDivPos[1] = e.offsetY
  })

  profileDiv.addEventListener("mouseleave", () => profileDivPos = [profileDiv.clientWidth/2, profileDiv.clientHeight/2])

  const profileDivLoop = () => {
    profileDivVel[0] = (profileDivPos[0]-currProfileDivPos[0])*.2
    profileDivVel[1] = (profileDivPos[1]-currProfileDivPos[1])*.2
    
    currProfileDivPos[0] += profileDivVel[0]
    currProfileDivPos[1] += profileDivVel[1]

    profileDiv.style.transform = `perspective(500px) rotateX(${(currProfileDivPos[1] - profileDiv.clientHeight / 2) / 10}deg) rotateY(${-(currProfileDivPos[0] - profileDiv.clientWidth / 2) / 10}deg)`

    requestAnimationFrame(profileDivLoop)
  }

  profileDivLoop()



  // Project scroll handler
  const projectScroll = document.getElementById("projectScroll") || document.createElement("div")

  let scrollVel = 0
  let autoScroll = true

  let last = Date.now()
  let now = last
  let totalX = 0
  projectScroll.addEventListener("mousemove", e => {
    last = now
    now = Date.now()
    const currentX = e.screenX

    const dt = now - last
    const distance = currentX - totalX
    const speed = Math.round(distance / dt * 1000)

    totalX = currentX

    if (mouseDown.value) {
      scrollVel += speed / 1000
    }
  })

  projectScroll.addEventListener("click", e => e.request)

  projectScroll.addEventListener("mouseenter", () => autoScroll = false)
  projectScroll.addEventListener("mouseleave", () => autoScroll = true)

  let scrollX = 3000
  let scrollLoop = () => {
    const scrollWidth = projectScroll.offsetWidth / 2

    if (scrollX >= scrollWidth + 2) scrollX = 0
    if (scrollX <= -1) scrollX = scrollWidth
    scrollX += -scrollVel

    scrollVel *= .95
    if (autoScroll) scrollX += 1

    projectScroll.style.transform = `translate3d(-${scrollX}px, 0px, 0px)`
    requestAnimationFrame(scrollLoop)
  }

  scrollLoop()
})

</script>

<template>
  <Cursor/>

  <Header class="dark:text-white text-black font-mono z-10" />

  <main class="dark:text-white text-black font-mono z-0 w-full min-h-screen dark:bg-primary-dark bg-primary-light">
    <section id="home" class="relative h-screen">
      <ModelHome />
    </section>
    <section id="about" class="flex flex-col lg:flex-row justify-center items-center content-center py-32">
      <div class="sm:p-3 mb-2">
        <h1 class="text-2xl mb-[2rem]">Who am i?</h1>
        <p class="pl-2 sm:w-[30rem]">{{ common.about }}</p>
        <div class="flex py-6 gap-3"><a v-for="(social, index) in socials" :href="social.url" target="_blank">
            <div class="flex justify-center items-center content-center w-10 h-10 bg-secondary-light dark:bg-secondary-dark rounded-md shadow-xl transition-all hover:scale-110 ">
              <div class="w-7">
                <i class="fill-black dark:fill-white" v-html="icons[social.type]"></i>
              </div>
            </div>
          </a></div>
      </div>
      <div class="p-3">
        <div id="profileDiv"
          class="dark:bg-secondary-dark bg-secondary-light rounded-md w-[20rem] overflow-hidden shadow-2xl">
          <img :src="useStrapiMedia(common.profile.url)" alt="" class="w-full h-full border-none object-cover">
        </div>
      </div>
    </section>
    <section id="projects" class="relative flex flex-col items-center content-center py-32 gap-10">
      <h1 class="text-xl">Projects i made</h1>
      <div class="relative w-full max-w-[60rem] overflow-hidden py-2 rounded-md">
        <div id="projectScroll" class="inline-flex gap-3 select-none">
          <div
            v-for="(project, index) in [...projects, ...projects, ...projects, ...projects, ...projects, ...projects]"
            :key="index" class="relative w-[20rem] h-[20rem] dark:bg-secondary-dark bg-secondary rounded-md transition-all z-0 overflow-hidden
                                  hover:scale-105 hover:shadow-xl hover:z-10 group">
            <div class="w-full h-full p-3">
              <div class="w-full h-full dark:bg-primary-dark bg-primary-light rounded-md">
                <img v-if="project.banner" class="w-full h-full object-cover" :src="useStrapiMedia(project.banner.url)"
                  alt="Banner">
              </div>
            </div>

            <div
              class="absolute flex flex-col justify-between left-0 top-0 w-full h-full backdrop-blur-sm p-5 transition-all group-hover:opacity-100 opacity-0">
              <div>
                <h1 class="mb-2">{{ project.title }}</h1>
                <p class="pl-2 text-sm">{{ project.description }}</p>
              </div>
              <div v-if="project.git" class="p-2">
                <a :href="project.git" class="bg-white p-2 text-black rounded-md">Visit the git!</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  <Footer class="dark:text-white text-black font-mono z-0" />
</template>

<style>
* {
  scroll-behavior: smooth;
}
</style>