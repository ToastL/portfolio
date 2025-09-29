// src/composables/useProjects.ts - SIMPLIFIED
import { reactive } from 'vue'
import { projects } from '../assets/data'
import type { ProjectState } from '../types'

export function useProjects() {
    const projectList: ProjectState[] = reactive([])

    // Initialize project states
    projects.forEach((project) => {
        projectList.push({
            active: false,
            projectID: project.id,
            disableCount: 0,
        })
    })

    function disableProject(id: number) {
        projectList[id].disableCount++
        if (projectList[id].disableCount === 9) {
            projectList[id].active = false
            projectList[id].disableCount = 0
        }
    }

    return {
        projectList,
        disableProject
    }
}   