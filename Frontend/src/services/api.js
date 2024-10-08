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
}
  