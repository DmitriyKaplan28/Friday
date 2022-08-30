//state
import { AxiosError } from 'axios'
import { Dispatch } from 'redux'

import { ErrorDataResponseType } from '../../api/api'
import { cardsAPI, CardsParamsType, CardsResponseType } from '../../api/cardsApi'

import { AppReducerType, setAppErrorAC, setAppStatusAC } from './AppReducer'

const initialState: CardsResponseType = {
  cards: [],
  packUserId: '',
  page: 1,
  pageCount: 0,
  cardsTotalCount: 0,
  minGrade: 0,
  maxGrade: 0,
}

export const cardsReducer = (
  state: CardsResponseType = initialState,
  action: SingUpACType
): CardsResponseType => {
  switch (action.type) {
    case 'SET-CARDS-PARAMS':
      return { ...state, ...action.params }
    default:
      return state
  }
}
// Action
export const setCardsParamsAC = (params: CardsResponseType) =>
  ({ type: 'SET-CARDS-PARAMS', params } as const)

//thunk
export const getCardsTC = (data: CardsParamsType) => {
  return (dispatch: Dispatch<SingUpACType | AppReducerType>) => {
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
export type SingUpACType = ReturnType<typeof setCardsParamsAC>
