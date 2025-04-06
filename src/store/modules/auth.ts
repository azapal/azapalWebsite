import { defineStore } from "pinia";
import Auth from "../../service/Auth";
import router from "../../router"
export const useAuthStore = defineStore("authStore", {
  state: () => ({
    loading: false,
    token:null,
    user: null,
    count:0
  }),

  getters: {
    getLoading: state => state.loading,
    getCurrentUser: state => state.user,
    getCount:state => state.count,
    getToken:state => state.token
  },

  actions: {
     async tictokLogin_(payload:any){
      this.loading = true;
      const response = await Auth.tiktok(payload)
      this.loading = false
      try{
        this.token = response.data.token
        this.user = response.data.user
        localStorage.user = JSON.stringify(response.data)
        router.push({name:'PROFILE'})
      }catch(err){
        this.loading = false
        console.log('error:', err)
      }
     }
  }
});

