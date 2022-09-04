//state
import { AxiosError } from 'axios'

import { ErrorDataResponseType } from '../../api/api'
import { cardsAPI, CardsParamsType, CardsResponseType, CardsType } from '../../api/cardsApi'
import { AppThunk } from '../store'

import { setAppErrorAC, setAppStatusAC } from './AppReducer'

const initialState: CardsResponseType = {
  cards: [],
  packUserId: '',
  packName: '',
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
    case 'SET-NAME-CADS':
      return {
        ...state,
        // cards: state.cards.map(t => (t.question = action.value)),
      }
    case 'ADD-CARD':
      return { ...state, cards: [action.data, ...state.cards] }
    case 'DELETE-CARD':
      return { ...state, cards: state.cards.filter(c => c.cardsPack_id !== action.cardId) }
    default:
      return state
  }
}
// Action
export const setCardsAC = (params: CardsResponseType) =>
  ({ type: 'SET-CARDS-PARAMS', params } as const)

export const setPageCountCardsAC = (pageCount: number) =>
  ({ type: 'SET-PAGE-COUNT', pageCount } as const)

export const deleteCardAC = (cardId: string) => ({ type: 'DELETE-CARD', cardId } as const)

export const addCardAC = (data: CardsType) => ({ type: 'ADD-CARD', data } as const)

export const setNameCardsAC = (value: string) => ({ type: 'SET-NAME-CADS', value } as const)

export const setPageCurrentCardsAC = (page: number) => ({ type: 'SET-CURRENT-PAGE', page } as const)

//thunk
export const getCardsTC = (data: CardsParamsType): AppThunk => {
  return dispatch => {
    dispatch(setAppStatusAC('loading'))
    cardsAPI
      .getCard(data)
      .then(res => {
        dispatch(setCardsAC(res.data))
      })
      .catch((error: AxiosError<ErrorDataResponseType>) => {
        dispatch(setAppErrorAC(error.response?.data.error))
      })
      .finally(() => {
        dispatch(setAppStatusAC('succeeded'))
      })
  }
}

export const deleteCardTC = (cardId: string, params: CardsParamsType): AppThunk => {
  return dispatch => {
    dispatch(setAppStatusAC('loading'))
    cardsAPI
      .deleteCard(cardId)
      .then(res => {
        dispatch(getCardsTC(params))
      })
      .catch((error: AxiosError<ErrorDataResponseType>) => {
        dispatch(setAppErrorAC(error.response?.data.error))
      })
      .finally(() => {
        dispatch(setAppStatusAC('succeeded'))
      })
  }
}
export const updateCardTC = (cardId: string, params: CardsParamsType): AppThunk => {
  const data = {
    _id: cardId,
    question: 'new question',
    answer: 'new answer',
  }

  return dispatch => {
    dispatch(setAppStatusAC('loading'))
    cardsAPI
      .updateCard(data)
      .then(res => {
        dispatch(getCardsTC(params))
      })
      .catch((error: AxiosError<ErrorDataResponseType>) => {
        dispatch(setAppErrorAC(error.response?.data.error))
      })
      .finally(() => {
        dispatch(setAppStatusAC('succeeded'))
      })
  }
}
export const addCardTC = (cardsPack_id: string, params: CardsParamsType): AppThunk => {
  const data = {
    cardsPack_id: cardsPack_id,
    question: 'New Question',
    answer: 'New Answer',
  }

  return dispatch => {
    dispatch(setAppStatusAC('loading'))
    cardsAPI
      .addCard(data)
      .then(res => {
        dispatch(getCardsTC(params))
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
  | typeof setCardsAC
  | typeof setPageCountCardsAC
  | typeof setPageCurrentCardsAC
  | typeof setNameCardsAC
  | typeof deleteCardAC
  | typeof addCardAC
>
