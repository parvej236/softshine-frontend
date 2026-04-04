import { defineStore } from 'pinia'
import { projectAPI } from '@/services/api'

export const useProjectStore = defineStore('projects', {
  state: () => ({ projects:[], featured:[], loading:false, error:null, totalPages:0 }),
  actions: {
    async fetchPublic() {
      this.loading = true
      try { const { data } = await projectAPI.getPublic(); this.projects = data.data }
      catch(e) { this.error = e.message }
      finally { this.loading = false }
    },
    async fetchFeatured() {
      try { const { data } = await projectAPI.getFeatured(); this.featured = data.data }
      catch(e) { console.error(e) }
    }
  }
})