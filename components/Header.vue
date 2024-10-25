<script setup lang="ts">
import Logo from '~/assets/images/toaster.png'

const graphql = useStrapiGraphQL()

const common = await graphql(`
    query {
        common {
            title
            logo {
                url
            }
        }
    }
`).then(res => res.data.common)

const isMobile = ref<boolean>(false)
onMounted(() => {
  isMobile.value = window.matchMedia('(max-width: 600px)').matches
})

</script>

<template>
    <header class="fixed flex justify-between items-center w-screen h-[6rem] backdrop-blur-md px-10">
        <a href="/"><h1 class="text-xl"><img class="inline h-16" :src="useStrapiMedia(common.logo.url)" alt="Logo"><span v-if="!isMobile">{{ common.title }}</span></h1></a>
        <div class="flex gap-5">
            <a class="text-md" href="#home">Home</a>
            <a class="text-md" href="#about">About</a>
            <a class="text-md" href="#projects">Projects</a>
        </div>
    </header>
</template>