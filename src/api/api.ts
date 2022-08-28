import axios, { AxiosResponse } from 'axios'

const instance = axios.create({
  //baseURL: 'http://localhost:7542/2.0/',
  baseURL: 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})

export const registerAPI = {
  postRegister(payload: RegisterParamsType) {
    return instance.post<ResponseRegisterType>('/auth/register', payload)
  },
}

export const profileAPI = {
  changeUserName(name: string, avatar?: string) {
    return instance.put<UpdateUserResponseType>(`auth/me`, { name, avatar })
  },
}

export const authAPI = {
  login(payload: LoginParamsType) {
    return instance.post<LoginParamsType, AxiosResponse<UserType>>(`auth/login`, payload)
  },
  logout() {
    return instance.delete(`auth/me`)
  },
  me() {
    return instance.post<GetMeResponseType>('/auth/me')
  },
}

export const forgotPasswordAPI = {
  forgotPassword(email: string) {
    return instance.post<ForgotPasswordResponseType>('/auth/forgot', { email })
  },
}

//TYPE
export type GetMeResponseType = UserType & { error: string }
export type logOutResponseType = { error: string }
export type UpdateUserResponseType = {
  updatedUser: UserType
  error: string
}
export type ResponseRegisterType = {
  addedUser: {}
  error?: string
}
export type ForgotPasswordResponseType = {
  info: string
  error: string
}
export type UserType = {
  avatar?: null
  created: string
  email: string
  isAdmin: boolean
  name: string
  publicCardPacksCount: number
  rememberMe: boolean
  token: string
  tokenDeathTime: number
  updated: string
  verified: boolean
  __v: number
  _id: string
}

export type LoginParamsType = {
  email: string
  password: string
  rememberMe: boolean
}
type LoginResponseType = {
  _id: string
  email: string
  name: string
  avatar?: string
  publicCardPacksCount: number
  // количество колод

  created: Date
  updated: Date
  isAdmin: boolean
  verified: boolean // подтвердил ли почту
  rememberMe: boolean

  error?: string
}

export type RegisterParamsType = {
  email: string
  password: string
}
