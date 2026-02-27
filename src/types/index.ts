import type { Component } from "vue";

import GithubIcon from "../components/icons/GithubIcon.vue";
import LinkedinIcon from "../components/icons/LinkedinIcon.vue";
import MailIcon from "../components/icons/MailIcon.vue";

export interface SocialLink {
  name: string
  url: string
  icon: Component
  target: '_blank' | '_self'
}

export interface ProjectState {
  active: boolean
  projectID: number
  disableCount: number
}

export interface Language {
  title: string
  icon: Component
}

export interface Project {
  id: number
  title: string
  img: string
  languages: Language[]
  github?: string
  gitlab?: string
  link?: string
}

export interface Summit {
  name: string
  country: string
  date: Date
  summit: boolean
  height: number
}

// Constants
export const APP_CONFIG = {
  name: 'Etien den Ouden Portfolio',
  version: '1.0.0',
  author: 'Etien den Ouden',
  email: 'etiendenouden2006@gmail.com',
  github: 'https://github.com/ToastL',
  linkedin: 'https://www.linkedin.com/in/etien-den-ouden-098421370/',
} as const

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/ToastL',
    icon: GithubIcon,
    target: '_blank'
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/etien-den-ouden-098421370/',
    icon: LinkedinIcon,
    target: '_blank'
  },
  {
    name: 'Email',
    url: 'mailto:etiendenouden2006@gmail.com',
    icon: MailIcon,
    target: '_self'
  }
] as const