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

export const resetPasswordAPI = {
  forgotPassword(email: string) {
    return instance.post<ResetPasswordResponseType>('/auth/forgot', { email })
  },
  enterNewPassword(payload: NewPasswordParamsType) {
    return instance.post<ResetPasswordResponseType>('/auth/set-new-password', payload)
  },
}

export const packsAPI = {
  getCardPacks(page: number | undefined) {
    return instance.get<GetResponseCardPacksType>(
      `/cards/pack?` + `pageCount=8` + `&page=${page}` + `&min=3` + `&max=9` + `&sortPacks=0updated`
    )
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
export type ResetPasswordResponseType = {
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
  verified: boolean
  rememberMe: boolean

  error?: string
}

export type RegisterParamsType = {
  email: string
  password: string
}

export type ErrorDataResponseType = {
  error: string
  in: string
  isEmailValid: boolean
  isPassValid: boolean
}

export type NewPasswordParamsType = {
  password: string
  resetPasswordToken: string
}
export type PackType = {
  _id: string
  user_id: string
  user_name: string
  private: boolean
  name: string
  path: string
  grade: number
  shots: number
  cardsCount: number
  type: string
  rating: number
  created: string
  updated: string
  more_id: string
  __v: number
  deckCover: null
}

export type GetResponseCardPacksType = {
  cardPacks: Array<PackType>
  cardPacksTotalCount: number
  maxCardsCount: number
  minCardsCount: number
  page: number
  pageCount: number
}
