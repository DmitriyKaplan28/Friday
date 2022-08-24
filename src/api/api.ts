import axios from 'axios'
import { ResponseRegisterType } from '../reducers/signup-reducer'

const instance = axios.create({
  baseURL: 'http://localhost:7542/2.0/',
  //baseURL: 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})

export const registerAPI = {
  postRegister(email: string, password: string) {
    return instance.post<ResponseRegisterType>('/auth/register', { email, password })
  },
}

export const profileApi = {
  changeUserName(name: string, avatar?: string) {
    return instance.put(`auth/me`, { name, avatar })
  },
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
