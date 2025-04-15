import { apiClient } from "./Base"
import type { SendOtpRequestType, LoginRequestType, SignupRequestType } from "../model/request/auth/authenticationRequest"

export default {
    tiktok(payload:any){
        return apiClient.accountClient.post('auth/tiktok/callback/', payload)
    },
    verifyOtp(payload:string){
        return apiClient.accountClient.get(`auth/verify/otp?otp=${payload}`)
    },
    sendOtp(payload:SendOtpRequestType){
        return apiClient.accountClient.post(`auth/verify/otp`, payload)
    },
    login(payload:LoginRequestType){
        return apiClient.accountClient.post(`authenticate-user`, payload)
    },

    signup(payload:SignupRequestType){
        return apiClient.accountClient.post(`register-users`, payload)
    },

    verifyInitiatingOtp(otp:string, email:string){
        return apiClient.accountClient.get(`verify/otp?otp=${otp}&email=${email}`)
    },
    sendInitiatingOtp(payload:SendOtpRequestType){
        return apiClient.accountClient.post(`verify/otp`, payload)
    },
}