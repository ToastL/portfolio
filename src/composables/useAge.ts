import { computed } from 'vue'

export function useAge() {
    const birthDate = new Date("2006-08-14")
    const startDate = new Date("2019-06-06")
    
    const currentAge = computed(() => {
      const today = new Date()
      let age = today.getFullYear() - birthDate.getFullYear()
      const monthDiff = today.getMonth() - birthDate.getMonth()
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }
      return age
    })
    
    const experienceYears = computed(() => {
      const today = new Date()
      let years = today.getFullYear() - startDate.getFullYear()
      const monthDiff = today.getMonth() - startDate.getMonth()
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < startDate.getDate())) {
        years--
      }
      return years
    })
    
    return { currentAge, experienceYears }
}