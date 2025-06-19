import WelcomeView from '@/pages/WelcomeView.vue'
import MeView from '@/pages/MeView.vue'
import SkillView from '@/pages/SkillView.vue'
import ProjectsView from '@/pages/ProjectsView.vue'

export const routes = [
  { name: 'Home', page: WelcomeView },
  { name: 'About Me', page: MeView },
  { name: 'Mijn Skills', page: SkillView },
  { name: 'Projecten', page: ProjectsView },
]