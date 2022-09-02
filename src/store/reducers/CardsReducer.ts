//state
import { AxiosError } from 'axios'
import { Dispatch } from 'redux'

import { ErrorDataResponseType } from '../../api/api'
import { cardsAPI, CardsParamsType, CardsResponseType, CardsType } from '../../api/cardsApi'

import { AppReducerType, setAppErrorAC, setAppStatusAC } from './AppReducer'

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
export const setCardsParamsAC = (params: CardsResponseType) =>
  ({ type: 'SET-CARDS-PARAMS', params } as const)

export const setPageCountCardsAC = (pageCount: number) =>
  ({ type: 'SET-PAGE-COUNT', pageCount } as const)

export const deleteCardAC = (cardId: string) => ({ type: 'DELETE-CARD', cardId } as const)

export const addCardAC = (data: CardsType) => ({ type: 'ADD-CARD', data } as const)

export const setNameCardsAC = (value: string) => ({ type: 'SET-NAME-CADS', value } as const)

export const setPageCurrentCardsAC = (page: number) => ({ type: 'SET-CURRENT-PAGE', page } as const)

//thunk
export const getCardsTC = (data: CardsParamsType) => {
  return (dispatch: Dispatch<CardsACType | AppReducerType>) => {
    dispatch(setAppStatusAC('loading'))
    cardsAPI
      .getCard(data)
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

export const deleteCardTC = (cardId: string, data: CardsParamsType) => {
  return (dispatch: Dispatch<CardsACType | AppReducerType>) => {
    dispatch(setAppStatusAC('loading'))
    cardsAPI
      .deleteCard(cardId)
      .then(res => {
        //Разобраться с типизацией
        // @ts-ignore
        dispatch(getCardsTC(data))
      })
      .catch((error: AxiosError<ErrorDataResponseType>) => {
        dispatch(setAppErrorAC(error.response?.data.error))
      })
      .finally(() => {
        dispatch(setAppStatusAC('succeeded'))
      })
  }
}
export const updateCardTC = (cardId: string, params: CardsParamsType) => {
  return (dispatch: Dispatch<CardsACType | AppReducerType>) => {
    const data = {
      _id: cardId,
      question: 'new question',
      answer: 'new answer',
    }

    dispatch(setAppStatusAC('loading'))
    cardsAPI
      .updateCard(data)
      .then(res => {
        //Разобраться с типизацией
        // @ts-ignore
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
export const addCardTC = (cardsPack_id: string, params: CardsParamsType) => {
  return (dispatch: Dispatch<CardsACType | AppReducerType>) => {
    const data = {
      cardsPack_id: cardsPack_id,
      question: 'New Question',
      answer: 'New Answer',
    }

    dispatch(setAppStatusAC('loading'))
    cardsAPI
      .addCard(data)
      .then(res => {
        //Разобраться с типизацией
        // @ts-ignore
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
  | typeof setCardsParamsAC
  | typeof setPageCountCardsAC
  | typeof setPageCurrentCardsAC
  | typeof setNameCardsAC
  | typeof deleteCardAC
  | typeof addCardAC
>
