import { defineStore } from "pinia";
import Auth from "../../service/Auth";
import router from "../../router"
import type {
    SendOtpRequestType,
    LoginRequestType,
    SignupRequestType,
    SendEmailOtpRequestType
} from "../../model/request/auth/authenticationRequest";
import {notify} from "../../utils/toast.ts";

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
          await router.push({path:'/business/vendor'})
        }else{
          alert(responseData.error)
        }
      }catch(err){
        this.loading = false
        console.log('error:', err)
      }
     },

      resetPassword(payload:any){
         return Auth.resetPassword(payload)
      },

      changePassword(payload:any){
         return Auth.changePassword(payload)
      },

      updateUser(payload:any){
         return Auth.updateUser(payload)
      },

    sendInitiatingOtp(payload:SendOtpRequestType){
      return  Auth.sendInitiatingOtp(payload)
     },

    sendEmailOtp(payload:SendEmailOtpRequestType){
      return  Auth.sendEmailOtp(payload)
     },

    verifyEmailOtp(payload:{otp:"", email:""}){
          return  Auth.verifyEmailOtp(payload.otp, payload.email)
      },


      async verifyOtp(payload:string){

      try{
        const response = await Auth.verifyOtp(payload)
        let responseData = response.data
        if(responseData.response_code === "00"){
          this.showOtpScreen = false
          this.verificationDone = true
        }else{
          notify(responseData.response_message, 'error')
        }
      }catch(err:any){
          notify(err, 'error')
          console.log('error:', err)
      }
     },

     login(payload:LoginRequestType){
         return Auth.login(payload)
      },

     async signUp(payload:SignupRequestType){
      this.loading = true
      try{
          const response = await Auth.signup(payload)
          let responseData = response.data
          this.loading = false
          if(responseData.code === "00"){
              this.token = responseData.token
              this.user = responseData.data
              localStorage.user = JSON.stringify(responseData.data)
              localStorage.token = responseData.token
              await router.push({path: "business/vendor"})
            }else{
              notify(responseData.message, 'error')
          }
      }catch(err:any){
        this.loading = false
        console.log('error:', err)
        notify(err, 'error')
      }
     },

     async readUser(){

      try{
          const response = await Auth.readUser()
          let responseData = response.data
          if(responseData.code === "00"){
              this.user = responseData.data
              localStorage.user = JSON.stringify(responseData.data)
              location.reload()
          }else{
              notify(responseData.message, 'error')
          }
      }catch(err:any){
        this.loading = false
        console.log('error:', err)
        notify(err, 'error')
      }
     },

     async verifyInitiatingOtp(payload:{otp:"", email:""}){
      this.loading = true
      const response = await Auth.verifyInitiatingOtp(payload?.otp, payload?.email)
      let responseData = response.data
      this.loading = false
      try{
        if(responseData.response_code === "00"){
          this.verificationDone = true
        }else{
          notify(responseData.response_message, 'error')
        }
      }catch(err:any){
        this.loading = false
        notify(err, 'error')
      }
     },
  },

  
});

