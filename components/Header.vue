<script setup>
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

</script>

<template>
    <header class="fixed flex justify-between items-center w-screen h-[6rem] backdrop-blur-md px-10">
        <h1 class="text-xl"><img class="inline h-16" :src="useStrapiMedia(common.logo.url)" alt="Logo">{{ common.title }}</h1>
        <div class="flex gap-5">
            <a class="text-md" href="#home">Home</a>
            <a class="text-md" href="#about">About</a>
            <a class="text-md" href="#projects">Projects</a>
        </div>
    </header>
</template>