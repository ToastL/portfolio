import focus6 from "./images/focus6.png"

export type Skill = {
  name: string
  level: number
  color: string
}

export const skills: Skill[] = [
  { name: 'Node.JS', level: 70, color: '#56bc60' },
  { name: 'Vue', level: 75, color: '#63b585' },
  { name: 'V Lang', level: 60, color: '#7199ce' },
  { name: 'C/C++', level: 40, color: '#6686BB' },
]

export type Project = {
  name: string
  image: string
  github: string
}

export const projects: Project[] = [
  { name: 'Focus6/Spiegelspel', image: focus6, github: '' },
  { name: 'Hendrik Hogendijk', image: '', github: '' },
  { name: 'Toast Lang', image: '', github: 'https://github.com/ToastL/TL' },
  { name: 'Game Engine', image: '', github: 'https://github.com/ToastL/Engine' },
]
