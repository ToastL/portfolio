<script setup>
import * as THREE from 'three'
import Model from '~/assets/js/model';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

let model = ref(null)

onMounted(async () => {
    if (!model) throw new Error("Model is not defined")

    const isMobile = window.matchMedia('(max-width: 600px)').matches

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

    const hemisphereLight = new THREE.HemisphereLight(0xB97A20, 0xB97A20, 1)
    scene.add(hemisphereLight)

    const directionalLight1 = new THREE.DirectionalLight(0xFFFFFF, .7)
    directionalLight1.position.set(10, 10, 20)
    directionalLight1.target.position.set(0, 0, 0)
    scene.add(directionalLight1)

    const directionalLight2 = new THREE.DirectionalLight(0xFFFFFF, .5)
    directionalLight2.position.set(-10, 10, -20)
    directionalLight2.target.position.set(0, 0, 0)
    scene.add(directionalLight2)

    const toaster = await Model.load('toaster')
    toaster.getObject().position.y = -.5
    scene.add(toaster.getObject())

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.physicallyCorrectLights = true
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 3
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFShadowMap

    renderer.setPixelRatio(window.devicePixelRatio * 1.5)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)

    if (window.matchMedia('(max-width: 600px)').matches) renderer.domElement.classList.add("pointer-events-none")
    model.value.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
    // controls.autoRotateSpeed = 5
    controls.enableDamping = true
    controls.autoRotate = true
    controls.enableZoom = false
    controls.enablePan = false
    controls.enableRotate = true
    if (isMobile) controls.enableRotate = false

    camera.position.set(0, 1, 3)

    function animate() {
        requestAnimationFrame(animate)

        controls.update()
        renderer.render(scene, camera)
    }

    animate()

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()

        renderer.setSize(window.innerWidth, window.innerHeight)
    })
})
</script>

<template>
    <div class="absolute w-full h-full" ref="model">

    </div>
</template>

<style>
    canvas {
        outline: none;
    }
</style>