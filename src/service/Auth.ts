import { apiClient } from "./Base"
import type {
    SendOtpRequestType,
    LoginRequestType,
    SignupRequestType,
    SendEmailOtpRequestType,
    UpdateUserRequestType
} from "../model/request/auth/authenticationRequest"

export default {
    tiktok(payload:any){
        return apiClient.accountClient.post('auth/tiktok/callback/', payload)
    },
    resetPassword(payload:any){
        return apiClient.accountClient.post('user/reset-password', payload)
    },
    changePassword(payload:any){
        return apiClient.accountClient.post('user/change-password', payload)
    },

    verifyOtp(payload:string){
        return apiClient.accountClient.get(`auth/verify/otp?otp=${payload}`)
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

    sendOtp(payload:SendOtpRequestType){
        return apiClient.accountClient.post(`auth/verify/otp`, payload)
    },
    sendEmailOtp(payload:SendEmailOtpRequestType){
        return apiClient.accountClient.post(`send-otp`, payload)
    },
    updateUser(payload:UpdateUserRequestType){
        return apiClient.accountClient.put(`user/update`, payload)
    },

    readUser(){
        return apiClient.accountClient.get(`user/read-user`)
    },

    verifyEmailOtp(otp:string, email:string){
        return apiClient.accountClient.get(`send-otp?otp=${otp}&email=${email}`)
    },


}