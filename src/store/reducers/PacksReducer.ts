import { Dispatch } from 'redux'

import { packsAPI, PackType } from '../../api/api'
import { AppDispatch, AppThunk, AppRootStateType } from '../store'

import { setAppErrorAC, setAppStatusAC } from './AppReducer'
import { setIsLoggedInAC } from './AuthReducer'

const initialState = {
  cardPacks: [] as Array<PackType>,
  cardPacksTotalCount: 500,
}

type InitialStateType = typeof initialState
export const packsReducer = (
  state: InitialStateType = initialState,
  action: PacksAT
): InitialStateType => {
  switch (action.type) {
    case 'packsReducer/SET-CARD-PACKS':
      return {
        ...state,
        cardPacks: action.packs,
      }
    case 'packsReducer/SET-CARD-PACKS-TOTAL-COUNT':
      return {
        ...state,
        cardPacksTotalCount: action.cardPacksTotalCount,
      }
  }

  return state
}

//ACTIONS
export const setCardPacksAC = (packs: Array<PackType>) =>
  ({ type: 'packsReducer/SET-CARD-PACKS', packs } as const)
export const setCardPacksTotalCountAC = (cardPacksTotalCount: number) =>
  ({ type: 'packsReducer/SET-CARD-PACKS-TOTAL-COUNT', cardPacksTotalCount } as const)

//THUNK
export const setCardPacksTC =
  (): AppThunk => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const paramsPacks = getState().paramsPacks
    const { page, pageCount, min, max, sortPacks, packName, user_id } = paramsPacks

    dispatch(setAppStatusAC('loading'))
    packsAPI
      .getCardPacks({ page, pageCount, min, max, sortPacks, packName, user_id })
      .then(res => {
        dispatch(setCardPacksAC(res.data.cardPacks))
        dispatch(setCardPacksTotalCountAC(res.data.cardPacksTotalCount))
      })
      .catch(err => {
        dispatch(setAppErrorAC(err.response.data.error))
        dispatch(setIsLoggedInAC(false))
      })
      .finally(() => dispatch(setAppStatusAC('succeeded')))
  }

export const addPackTC =
  (name: string, deckCover?: string, isPrivate?: boolean) => (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('loading'))
    packsAPI
      .addPack(name, deckCover, isPrivate)
      .then(() => {
        dispatch(setCardPacksTC())
      })
      .catch(err => {
        dispatch(setAppErrorAC(err.response.data.error))
      })
      .finally(() => dispatch(setAppStatusAC('succeeded')))
  }
export const deletePackTC = (id: string) => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC('loading'))
  packsAPI
    .deletePack(id)
    .then(() => {
      dispatch(setCardPacksTC())
    })
    .catch(err => {
      dispatch(setAppErrorAC(err.response.data.error))
    })
    .finally(() => dispatch(setAppStatusAC('succeeded')))
}

export const updatePackTC = (id: string) => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC('loading'))
  packsAPI
    .updatePack(id)
    .then(() => {
      dispatch(setCardPacksTC())
    })
    .catch(err => {
      dispatch(setAppErrorAC(err.response.data.error))
    })
    .finally(() => dispatch(setAppStatusAC('succeeded')))
}

//TYPE
export type PacksAT = SetCardPacksAT | SetCardPacksTotalCountAT
export type SetCardPacksAT = ReturnType<typeof setCardPacksAC>
export type SetCardPacksTotalCountAT = ReturnType<typeof setCardPacksTotalCountAC>
