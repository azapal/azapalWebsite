import { defineStore } from "pinia";
import Auth from "../../service/Auth";
import router from "../../router"
import type { SendOtpRequestType, LoginRequestType, SignupRequestType } from "../../model/request/auth/authenticationRequest";
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
     },

     async login(payload:LoginRequestType){
      this.loading = true;
      const response = await Auth.login(payload)
      this.loading = false
      let responseData = response.data
      try{
        if(responseData.code === "00"){
          const currentRoute = router.currentRoute?.value?.query?.redirectFrom
          this.token = responseData.token
          this.user = responseData.data
          localStorage.user = JSON.stringify(responseData.data)
          localStorage.token = responseData.token
          if(currentRoute){
            router.push({path:currentRoute as string})
          }else{
            router.push({name:"Dashboard"})
          }
         
        }else{
          alert(responseData.message)
        }
      }catch(err){
        this.loading = false
        console.log('error:', err)
        alert(responseData.message)
      }
     },

     async signUp(payload:SignupRequestType){
      this.loading = true;
      const response = await Auth.signup(payload)
      this.loading = false
      let responseData = response.data
      try{
        if(responseData.code === "00"){
          this.token = responseData.token
          this.user = responseData.data
          localStorage.user = JSON.stringify(responseData.data)
          localStorage.token = responseData.token
          router.push({name:"Dashboard"})
        }else{
          alert(responseData.message)
        }
      }catch(err){
        this.loading = false
        console.log('error:', err)
        alert(responseData.message)
      }
     },

     async sendInitiatingOtp(payload:SendOtpRequestType){
      this.loading = true;
      const response = await Auth.sendInitiatingOtp(payload)
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
     async verifyInitiatingOtp(payload:{otp:"", email:""}){
      this.loading = true;
      const response = await Auth.verifyInitiatingOtp(payload?.otp, payload?.email)
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
     },
  },

  
});

