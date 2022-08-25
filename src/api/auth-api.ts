import axios, { AxiosResponse } from 'axios'
//api

const instance = axios.create({
  baseURL: 'http://localhost:7542/2.0/',
  //baseURL: 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})

export const authAPI = {
  login(payload: LoginParamsType) {
    return instance.post<LoginParamsType, AxiosResponse<LoginResponseType>>(`auth/login`, payload)
  },
  logout() {
    return instance.delete(`auth/me`)
  },
}

//types

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