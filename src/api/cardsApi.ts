import axios from 'axios'

const instance = axios.create({
  //baseURL: 'http://localhost:7542/2.0/',
  baseURL: 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})

export const cardsAPI = {
  getCards(params: CardsParamsType) {
    console.log(params)

    return instance.get<CardsResponseType>('/cards/card', {
      params,
    })
  },
}

//TYPE
export type CardsParamsType = {
  cardsPack_id: string
  cardAnswer?: string
  cardQuestion?: string
  // min?: number - подумать нужны ли
  // max?: number - подумать нужны ли
  sortCards?: string
  page?: number
  pageCount: number
}

export type CardsType = {
  answer: string
  question: string
  cardsPack_id: string
  grade: number
  shots: number
  user_id: string
  created: string
  updated: string
  comments: string
  type: string
  rating: number
  more_id: string
  __v: 0
  _id: string
}
export type CardsResponseType = {
  cards: CardsType[]
  packUserId?: string
  packName?: string
  packPrivate?: boolean
  packCreated?: string
  packUpdated: string
  page: number
  pageCount: number
  cardsTotalCount: number
  minGrade: number
  maxGrade: number
} & TokenType

type TokenType = {
  token?: string
  tokenDeathTime?: number
}
