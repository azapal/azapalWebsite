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

export type SendEmailOtpRequestType = {
  email:string
}

export type LoginRequestType = {
  email: string,
  password: string
}

export type ResetPasswordRequestType = {
  email: string,
  password: string,
  otp: string
}

export type ChangePasswordRequestType = {
  email: string,
  password: string,
  old_password: string,
  otp: string
}


export type SignupRequestType = {
  email:string,
  password: string,
  phone_number: string,
  first_name: string,
  last_name: string
}

export type UpdateUserRequestType = {
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

export const SendEmailOtpRequest:SendEmailOtpRequestType = {
  email:""
}

export const ResetPasswordRequest:ResetPasswordRequestType = {
  email: "",
  password: "",
  otp: ""
}

export const ChangePasswordRequest:ChangePasswordRequestType = {
  email: "",
  password: "",
  old_password: "",
  otp: ""
}

export const UpdateUserRequest:UpdateUserRequestType = {
  phone_number: "",
  first_name: "",
  last_name: ""
}



