import { instance } from './api'

export const cardsAPI = {
  getCard(cardsPack_id: string, params: CardsParamsType) {
    return instance.get<CardsResponseType>(`/cards/card?cardsPack_id=${cardsPack_id}`, { params })
  },
  addCard(data: AddCardDataType) {
    return instance.post<CardsResponseType>(`cards/card`, { card: data })
  },
  deleteCard(cardId: string) {
    return instance.delete<CardsResponseType>(`cards/card?id=${cardId}`)
  },
  updateCard(data: UpdateCardDataType) {
    return instance.put<CardsResponseType>(`cards/card`, { card: data })
  },
  updateCardGrade(card_id: string, grade: number) {
    return instance.put('/cards/grade', { card_id, grade })
  },
}

//TYPE
export type CardsParamsType = {
  cardsPack_id: string
  cardAnswer?: string
  cardQuestion: string
  sortCards: string
  page: number
  pageCount: number
}
export type AddCardDataType = {
  cardsPack_id: string
  question: string
  answer: string
  grade?: number
  shots?: number
  answerImg?: string
  questionImg?: string
  questionVideo?: string
  answerVideo?: string
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
export type UpdateCardDataType = {
  _id: string
  question?: string
  answer?: string
}

export type CardsResponseType = {
  cards: CardsType[]
  packUserId: string
  packName: string
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
