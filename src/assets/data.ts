import type { Component } from "vue";

import NodeIcon from "../components/icons/NodeIcon.vue";
import TailwindIcon from "../components/icons/TailwindIcon.vue";
import VueIcon from "../components/icons/VueIcon.vue";
import PostgresIcon from "../components/icons/PostgresIcon.vue";
import VLangIcon from "../components/icons/VLangIcon.vue";

import focus6 from "./img/focus6.png";
import shareddocument from "./img/shareddocument.png";

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
  language: {
    title: "Talen",
    pos: [180, 930],
  },
};

export type Language = {
  title: string;
  icon: Component;
};

export type Project = {
  id: number;
  title: string;
  img: string;
  detail: string;
  languages: Language[];
  github?: string;
  link?: string;
};

export const languages: { [id: number]: Language } = {
  0: {
    title: "Node.JS",
    icon: NodeIcon,
  },
  1: {
    title: "TailwindCSS",
    icon: TailwindIcon,
  },
  2: {
    title: "Vue.JS",
    icon: VueIcon,
  },
  3: {
    title: "PostgreSQL",
    icon: PostgresIcon,
  },
  4: {
    title: "VLang",
    icon: VLangIcon,
  },
};

export type ProjectState = {
  active: boolean;
  projectID: number;
  disable: boolean;
}

export const projects: Project[] = [
  {
    id: 0,
    title: "Bootloader",
    img: "",
    detail:
      "Ik heb hierbij voor een keuzendeel opdracht in school gekozen om een x86_64 bootloader te bouwen.\n\nHet leren van de taal was wel een challenge maar ik vond het verder leuk om meer te weten te komen over low-level programmeren.",
    github: "https://github.com/ToastL/bootloader",
    languages: [],
  },
  {
    id: 1,
    title: "Focus6",
    img: focus6,
    detail:
      "Ik heb hierbij voor school een website gebouwd in een groep van 4 mensen, waarbij we gebruik maakten van Vue en TailwindCSS voor het stylen.\n\nWij moesten hierin beiden de Focus6 website en het Spiegelspel website opnieuw bouwen waarbij ik vooral gewerkt heb aan de Focus6 website.",
    link: "https://focuszes.pepijnbullens.nl",
    languages: [ languages[1], languages[2] ],
  },
  {
    id: 2,
    title: "Shared Document",
    img: shareddocument,
    detail:
      "Ik heb hierbij voor opdracht in school gekozen om een gedeelde document te maken, waarbij de gebruiker het kan aanpassen en een andere gebruiker het meteen ziet veranderen\n\nHierbij heb ik gebruik gemaakt van socket en de front-end gebouwt in Vue en de back-end in VLang met Redis als database.",
    github: "https://github.com/ToastL/SharedDocument",
    link: "https://shareddocument.etiendenouden.nl",
    languages: [ languages[1], languages[2], languages[4] ],
  },
];
