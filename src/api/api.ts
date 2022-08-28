import axios, { AxiosResponse } from 'axios'

import { ResponseRegisterType } from '../store/reducers/signup-reducer'

const instance = axios.create({
  //baseURL: 'http://localhost:7542/2.0/',
  baseURL: 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})

export const registerAPI = {
  postRegister(email: string, password: string) {
    return instance.post<ResponseRegisterType>('/auth/register', { email, password })
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

//TYPE
export type GetMeResponseType = UserType & { error: string }
export type UpdateUserResponseType = {
  updatedUser: UserType
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
  created: Date
  updated: Date
  isAdmin: boolean
  verified: boolean
  rememberMe: boolean
  error?: string
}
