import { ref } from 'vue'
import { routes } from '../assets/data'

export function useNavigation() {
  const scrollRef = ref()
  
  function navigate(x: number, y: number, instant = false) {
    scrollRef.value?.navigate(x, y, instant)
  }

  function navigateToRoute(routeName: keyof typeof routes, instant = false) {
    const route = routes[routeName]
    if (route) {
      navigate(route.pos[0], route.pos[1], instant)
    }
  }

  return {
    scrollRef,
    navigate,
    navigateToRoute
  }
}