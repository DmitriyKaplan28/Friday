import { Dispatch } from 'redux'

import { packsAPI, PackType } from '../../api/api'
import { AppDispatch, AppRootStateType, AppThunk } from '../store'

import { setAppErrorAC, setAppStatusAC, setModalStatusAC } from './AppReducer'
import { setIsLoggedInAC } from './AuthReducer'

const initialState = {
  cardPacks: [] as PackType[],
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
export const setCardPacksAC = (packs: PackType[]) =>
  ({ type: 'packsReducer/SET-CARD-PACKS', packs } as const)
export const setCardPacksTotalCountAC = (cardPacksTotalCount: number) =>
  ({ type: 'packsReducer/SET-CARD-PACKS-TOTAL-COUNT', cardPacksTotalCount } as const)

//THUNK
export const setCardPacksTC =
  (): AppThunk => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const paramsPacks = getState().paramsPacks

    // const { page, pageCount, min, max, sortPacks, packName, user_id } = paramsPacks
    dispatch(setAppStatusAC('loading'))
    packsAPI
      .getCardPacks(paramsPacks)
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
  (name: string, isPrivate?: boolean, deckCover?: string) => (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(setModalStatusAC('loading'))
    packsAPI
      .addPack(name, deckCover, isPrivate)
      .then(() => {
        dispatch(setCardPacksTC())
        dispatch(setModalStatusAC('succeeded'))
      })
      .catch(err => {
        dispatch(setModalStatusAC('failed'))
        dispatch(setAppErrorAC(err.response.data.error))
      })
      .finally(() => {
        dispatch(setAppStatusAC('succeeded'))
      })
  }
export const deletePackTC = (id: string) => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC('loading'))
  dispatch(setModalStatusAC('loading'))
  packsAPI
    .deletePack(id)
    .then(() => {
      dispatch(setModalStatusAC('succeeded'))
      dispatch(setCardPacksTC())
    })
    .catch(err => {
      dispatch(setModalStatusAC('failed'))
      dispatch(setAppErrorAC(err.response.data.error))
    })
    .finally(() => dispatch(setAppStatusAC('succeeded')))
}

export const updatePackTC = (id: string, name: string) => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC('loading'))
  dispatch(setModalStatusAC('loading'))
  packsAPI
    .updatePack(id, name)
    .then(() => {
      dispatch(setModalStatusAC('succeeded'))
      dispatch(setCardPacksTC())
    })
    .catch(err => {
      dispatch(setAppErrorAC(err.response.data.error))
      dispatch(setModalStatusAC('failed'))
    })
    .finally(() => dispatch(setAppStatusAC('succeeded')))
}

//TYPE
export type PacksAT = SetCardPacksAT | SetCardPacksTotalCountAT
export type SetCardPacksAT = ReturnType<typeof setCardPacksAC>
export type SetCardPacksTotalCountAT = ReturnType<typeof setCardPacksTotalCountAC>
