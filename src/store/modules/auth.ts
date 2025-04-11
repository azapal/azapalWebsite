import { defineStore } from "pinia";
import Auth from "../../service/Auth";
import router from "../../router"
import type { SendOtpRequestType } from "../../model/request/auth/authenticationRequest";
export const useAuthStore = defineStore("authStore", {
  state: () => ({
    loading: false,
    token:null,
    user: null,
    count:0,
    showOtpScreen:false,
    verificationDone:false
  }),

  getters: {
    getLoading: state => state.loading,
    getCurrentUser: state => state.user || localStorage.user ? JSON.parse(localStorage?.user) : null,
    getCount:state => state.count,
    getToken:state => state.token || JSON.parse(localStorage?.token),
    getShowOtpScreen:state => state.showOtpScreen,
    isVerificationDone:state => state.verificationDone
  },

  actions: {  
     async tictokLogin_(payload:any){
      this.loading = true;
      const response = await Auth.tiktok(payload)
      this.loading = false
      let responseData = response.data
      try{
        if(responseData.response_code === "00"){
          this.token = response.data.token
          this.user = response.data.user_info
          localStorage.user = JSON.stringify(response.data.user_info)
          localStorage.token = response.data.token
          router.push({name:'Dashboard'})
        }else{
          alert(responseData.error)
        }
      }catch(err){
        this.loading = false
        console.log('error:', err)
      }
     },
     async sendOtp(payload:SendOtpRequestType){
      this.loading = true;
      const response = await Auth.sendOtp(payload)
      this.loading = false
      let responseData = response.data
      try{
        if(responseData.response_code === "00"){
          this.showOtpScreen = true
        }else{
          alert(responseData.error)
        }
      }catch(err){
        this.loading = false
        console.log('error:', err)
      }
     },
     async verifyOtp(payload:string){
      this.loading = true;
      const response = await Auth.verifyOtp(payload)
      this.loading = false
      let responseData = response.data
      try{
        if(responseData.response_code === "00"){
          this.showOtpScreen = false
          this.verificationDone = true
        }else{
          alert(responseData.error)
        }
      }catch(err){
        this.loading = false
        console.log('error:', err)
      }
     }
  },

  
});

