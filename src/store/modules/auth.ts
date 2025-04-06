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
    getCurrentUser: state => state.user || JSON.parse(localStorage?.user),
    getCount:state => state.count,
    getToken:state => state.token || JSON.parse(localStorage?.token)
  },

  actions: {
     async tictokLogin_(payload:any){
      this.loading = true;
      const response = await Auth.tiktok(payload)
      this.loading = false
      let responseData = response.data
      try{
        if(responseData.response_code === "00")
            this.token = response.data.token
            this.user = response.data.user_info
            localStorage.user = JSON.stringify(response.data.user_info)
            localStorage.token = response.data.token
            router.push({name:'PROFILE'})
        alert(responseData.error)
      }catch(err){
        this.loading = false
        console.log('error:', err)
      }
     }
  }
});

