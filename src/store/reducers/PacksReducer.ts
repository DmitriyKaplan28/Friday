import { Dispatch } from 'redux'

import { packsAPI, PackType } from '../../api/api'
import { AppRootStateType } from '../store'

import { setResetSettingsPacksAC } from './PacksParamsReducer'

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
export const setCardPacksTC = () => (dispatch: Dispatch, getState: () => AppRootStateType) => {
  const paramsPacks = getState().paramsPacks
  const { page, pageCount, min, max, sortPacks, packName } = paramsPacks

  packsAPI.getCardPacks({ page, pageCount, min, max, sortPacks, packName }).then(res => {
    dispatch(setCardPacksAC(res.data.cardPacks))
    dispatch(setCardPacksTotalCountAC(res.data.cardPacksTotalCount))
  })
}
// export const resetSettingsInPacksTC =
//   () => (dispatch: Dispatch, getState: () => AppRootStateType) => {
//     const paramsPacks = getState().paramsPacks
//
//     console.log(paramsPacks)
//     packsAPI
//       .getCardPacks({ page: 1, pageCount: 4, min: 3, max: 110, sortPacks: '', packName: '' })
//       .then(res => {
//         dispatch(setCardPacksAC(res.data.cardPacks))
//         dispatch(setResetSettingsPacksAC())
//       })
//   }

//TYPE
export type PacksAT = SetCardPacksAT | SetCardPacksTotalCountAT
export type SetCardPacksAT = ReturnType<typeof setCardPacksAC>
export type SetCardPacksTotalCountAT = ReturnType<typeof setCardPacksTotalCountAC>
