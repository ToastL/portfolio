import { reactive } from 'vue'
import { projects } from '../assets/data'
import type { ProjectState } from '../types'

export function useProjects() {
  const projectList: ProjectState[] = reactive(
    projects.map(p => ({ projectID: p.id, active: false, closing: false }))
  )

  let cleanup: (() => void) | null = null

  function activate(index: number) {
    if (!projectList[index]) return
    if (projectList[index].active && !projectList[index].closing) return

    for (const p of projectList) {
      p.active = false
      p.closing = false
    }
    cleanup?.()

    projectList[index].active = true

    function close() {
      cleanup?.()
      // Set closing — component's GSAP animation handles the rest
      projectList[index].closing = true
    }

    function onKeydown(e: KeyboardEvent) {
      if (e.key === 'Escape') close()
    }

    cleanup = () => {
      document.removeEventListener('click', close)
      document.removeEventListener('keydown', onKeydown)
      cleanup = null
    }

    setTimeout(() => {
      document.addEventListener('click', close)
      document.addEventListener('keydown', onKeydown)
    })
  }

  function completeClose(index: number) {
    if (!projectList[index]) return
    projectList[index].active = false
    projectList[index].closing = false
  }

  return { projectList, activate, completeClose }
}
