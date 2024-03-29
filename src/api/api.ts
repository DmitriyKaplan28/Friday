import axios, { AxiosResponse } from 'axios'

export const instance = axios.create({
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
  forgotPassword(data: ForgotPasswordParamsType) {
    return instance.post<ResetPasswordResponseType>('/auth/forgot', data)
  },
  enterNewPassword(payload: NewPasswordParamsType) {
    return instance.post<ResetPasswordResponseType>('/auth/set-new-password', payload)
  },
}

export const packsAPI = {
  getCardPacks(data: PacksParamsType) {
    return instance.get<GetResponseCardPacksType>(`/cards/pack?`, { params: data })
  },
  addPack(name: string, deckCover?: string, isPrivate?: boolean) {
    return instance.post<AddPackType, AxiosResponse<GetResponseCardPacksType>>('/cards/pack', {
      cardsPack: {
        name,
        deckCover,
        private: isPrivate,
      },
    })
  },
  deletePack(id: string) {
    return instance.delete<'', AxiosResponse<GetResponseCardPacksType>>('/cards/pack', {
      params: { id },
    })
  },
  updatePack(_id: string, name: string) {
    return instance.put<AxiosResponse<GetResponseCardPacksType>>('cards/pack', {
      cardsPack: {
        _id,
        name,
      },
    })
  },
}

//TYPES

type AddPackType = {
  name?: string
  deckCover?: string
  private?: boolean
}

export type PacksParamsType = {
  packName?: string
  pageCount?: number
  page?: number
  min?: number
  max?: number
  sortPacks?: string
  user_id?: string
}

export type GetMeResponseType = UserType & { error: string }

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

export type ForgotPasswordParamsType = {
  email: string
  from: string
  message: string
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
  cardPacks: PackType[]
  cardPacksTotalCount: number
  maxCardsCount: number
  minCardsCount: number
  page: number
  pageCount: number
}
