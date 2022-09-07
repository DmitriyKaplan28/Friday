//state
import { AxiosError } from 'axios'
import { Dispatch } from 'redux'

import { ErrorDataResponseType } from '../../api/api'
import { cardsAPI, CardsResponseType, CardsType } from '../../api/cardsApi'
import { AppRootStateType, AppThunk } from '../store'

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
    case 'SET-CARDS':
      return { ...state, ...action.data }
    case 'UPDATE-CARD':
      return {
        ...state,
        //cards: state.cards.map(t => (t.question = action.value)),
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
export const setCardsAC = (data: CardsResponseType) => ({ type: 'SET-CARDS', data } as const)

export const deleteCardAC = (cardId: string) => ({ type: 'DELETE-CARD', cardId } as const)

export const addCardAC = (data: CardsType) => ({ type: 'ADD-CARD', data } as const)

export const setUpdateCardsAC = (value: string) => ({ type: 'UPDATE-CARD', value } as const)

//thunk
export const getCardsTC = (): AppThunk => {
  return (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const paramsCard = getState().paramsCard

    dispatch(setAppStatusAC('loading'))
    cardsAPI
      .getCard(paramsCard)
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

export const deleteCardTC = (cardId: string): AppThunk => {
  return dispatch => {
    dispatch(setAppStatusAC('loading'))
    cardsAPI
      .deleteCard(cardId)
      .then(res => {
        dispatch(getCardsTC())
      })
      .catch((error: AxiosError<ErrorDataResponseType>) => {
        dispatch(setAppErrorAC(error.response?.data.error))
      })
      .finally(() => {
        dispatch(setAppStatusAC('succeeded'))
      })
  }
}
export const updateCardTC = (cardId: string): AppThunk => {
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
        dispatch(getCardsTC())
      })
      .catch((error: AxiosError<ErrorDataResponseType>) => {
        dispatch(setAppErrorAC(error.response?.data.error))
      })
      .finally(() => {
        dispatch(setAppStatusAC('succeeded'))
      })
  }
}
export const addCardTC = (cardsPack_id: string, question: string, answer: string): AppThunk => {
  const data = {
    cardsPack_id: cardsPack_id,
    question: question,
    answer: answer,
  }

  return dispatch => {
    dispatch(setAppStatusAC('loading'))
    cardsAPI
      .addCard(data)
      .then(res => {
        dispatch(getCardsTC())
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
  typeof setCardsAC | typeof deleteCardAC | typeof addCardAC | typeof setUpdateCardsAC
>
