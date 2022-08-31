//state
import { AxiosError } from 'axios'
import { Dispatch } from 'redux'

import { ErrorDataResponseType } from '../../api/api'
import { cardsAPI, CardsParamsType, CardsResponseType } from '../../api/cardsApi'

import { AppReducerType, setAppErrorAC, setAppStatusAC } from './AppReducer'

const initialState: CardsResponseType = {
  cards: [],
  page: 1,
  pageCount: 4,
  packUpdated: '',
  cardsTotalCount: 0,
  minGrade: 0,
  maxGrade: 0,
}

export const cardsReducer = (
  state: CardsResponseType = initialState,
  action: CardsACType
): CardsResponseType => {
  switch (action.type) {
    case 'SET-CARDS-PARAMS':
      return { ...state, ...action.params }
    case 'SET-PAGE-COUNT':
      return { ...state, pageCount: action.pageCount }
    case 'SET-CURRENT-PAGE':
      return { ...state, page: action.page }
    default:
      return state
  }
}
// Action
export const setCardsParamsAC = (params: CardsResponseType) =>
  ({ type: 'SET-CARDS-PARAMS', params } as const)

export const setPageCountCardsAC = (pageCount: number) =>
  ({ type: 'SET-PAGE-COUNT', pageCount } as const)

export const setPageCurrentCardsAC = (page: number) => ({ type: 'SET-CURRENT-PAGE', page } as const)

//thunk
export const getCardsTC = (data: CardsParamsType) => {
  return (dispatch: Dispatch<CardsACType | AppReducerType>) => {
    dispatch(setAppStatusAC('loading'))
    cardsAPI
      .getCards(data)
      .then(res => {
        dispatch(setCardsParamsAC(res.data))
      })
      .catch((error: AxiosError<ErrorDataResponseType>) => {
        dispatch(setAppErrorAC(error.response?.data.error))
      })
      .finally(() => {
        dispatch(setAppStatusAC('succeeded'))
      })
  }
}
// types
export type CardsACType = ReturnType<
  typeof setCardsParamsAC | typeof setPageCountCardsAC | typeof setPageCurrentCardsAC
>
