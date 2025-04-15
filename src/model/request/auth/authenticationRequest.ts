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

export type SignupRequestType = {
  email:string,
  password: string,
  phone_number: string,
  first_name: string,
  last_name: string
}


export const SendOtpRequest:SendOtpRequestType = {
  email: null,
  phone_number: null,
  source: "",
  platform: "",
  otp:"" 
}

export const LoginRequest = {
  email: "",
  password: ""
}

export const SignupRequest = {
  email:"",
  password: "",
  phone_number: "",
  first_name: "",
  last_name: ""
}
