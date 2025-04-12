export const tiktokLogin = {
  access_token: null
};


export type SendOtpRequestType = {
  email:string | null,
  phone_number: string | null,
  source: string,
  platform: string,
  otp: string | null
}

export type LoginRequestType = {
  email: string,
  password: string
}


export const SendOtpRequest:SendOtpRequestType = {
  email: null,
  phone_number: null,
  source: "",
  platform: "",
  otp:null 
}

export const LoginRequest = {
  email: "",
  password: ""
}