import type { Language, Project, Summit } from "../types";

import NodeIcon from "../components/icons/NodeIcon.vue";
import TailwindIcon from "../components/icons/TailwindIcon.vue";
import VueIcon from "../components/icons/VueIcon.vue";
import PostgresIcon from "../components/icons/PostgresIcon.vue";
import VLangIcon from "../components/icons/VLangIcon.vue";
import CppIcon from "../components/icons/CppIcon.vue";
import GoIcon from "../components/icons/GoIcon.vue";

import focus6 from "./img/focus6.png";
import shareddocument from "./img/shareddocument.png";
import windowvisualizer from "./img/windowvisualizer.png";

export const routes = {
  home: {
    title: "Home",
    pos: [1190, 0],
  },
  about: {
    title: "Over Mij",
    pos: [1190, 365],
  },
  projects: {
    title: "Projecten",
    pos: [365, 250],
  },
  languages: {
    title: "Talen",
    pos: [180, 930],
  },
  summits: {
    title: "Summits",
    pos: [823, 930]
  }
};

export const languages: { [id: number]: Language } = {
  0: {
    title: "Node.JS",
    icon: NodeIcon
  },
  1: {
    title: "TailwindCSS",
    icon: TailwindIcon
  },
  2: {
    title: "Vue.JS",
    icon: VueIcon
  },
  3: {
    title: "PostgreSQL",
    icon: PostgresIcon
  },
  4: {
    title: "VLang",
    icon: VLangIcon
  },
  5: {
    title: "C/C++",
    icon: CppIcon
  },
  6: {
    title: "Go",
    icon: GoIcon
  }
};

export const projects: Project[] = [
  {
    id: 0,
    title: "Bootloader",
    img: "",
    github: "https://github.com/ToastL/bootloader",
    languages: [],
  },
  {
    id: 1,
    title: "Focus6",
    img: focus6,
    link: "https://focuszes.pepijnbullens.nl",
    languages: [ languages[1], languages[2] ],
  },
  {
    id: 2,
    title: "Shared Document",
    img: shareddocument,
    github: "https://github.com/ToastL/SharedDocument",
    link: "https://shareddocument.etiendenouden.nl",
    languages: [ languages[1], languages[2], languages[4] ],
  },
  {
    id: 3,
    title: "Window Visualizer",
    img: windowvisualizer,
    github: "https://github.com/ToastL/window-visualizer",
    languages: [ languages[2], languages[6] ],
  },
];

export const summits: Summit[] = [
  {
    name: "Pic de Morgon",
    country: "France",
    date: new Date("2024-08-18"),
    summit: false,
    height: 2324
  },
  {
    name: "Fort de Dormillouse",
    country: "France",
    date: new Date("2024-08-20"),
    summit: true,
    height: 2505
  },
  {
    name: "Ramolkogel",
    country: "Austria",
    date: new Date("2025-08-27"), 
    summit: false,
    height: 3550
  },
];