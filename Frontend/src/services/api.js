const BASE_URL = "http://localhost:4000"

export const endpoints = {
    SENDOTP_API: BASE_URL + "/api/v1/auth/sendotp",
    SIGNUP_API: BASE_URL + "/api/v1/auth/signup",
    LOGIN_API: BASE_URL + "/api/v1/auth/login",
    RESETPASSTOKEN_API: BASE_URL + "/api/v1/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/api/v1/auth/reset-password",
}

export const classendpoints = {
  CREATE_API: BASE_URL + "/class/createclass",
  JOIN_API: BASE_URL + "/class/joinclass",
  GET_CLASSES :BASE_URL+"/class/getallclass",
}

export const videoendpoints = {
  GENRATE_URL: BASE_URL + "/api/v1/aws/generate-presigned-url",
}
  
export const postendpoints = {
  VIDEO_DETAILS_SAVE: BASE_URL + "/api/v1/post/updatevideodetails",
  GET_VIDEO_METADATA: BASE_URL + "/api/v1/post/getvideos",
}