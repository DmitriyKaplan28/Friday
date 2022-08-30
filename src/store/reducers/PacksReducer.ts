import { packsAPI, PackType } from '../../api/api'
import { AppRootStateType } from '../store'

const initialState = {
  cardPacks: [] as Array<PackType>,
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
  }

  return state
}

//ACTIONS
export const setCardPacksAC = (packs: Array<PackType>) =>
  ({ type: 'packsReducer/SET-CARD-PACKS', packs } as const)

//THUNK
export const setCardPacksTC = () => (dispatch: any, getState: () => AppRootStateType) => {
  const paramsPacks = getState().paramsPacks
  const { page, pageCount, min, max, sortPacks, packName } = paramsPacks

  packsAPI.getCardPacks({ page, pageCount, min, max, sortPacks, packName }).then(res => {
    dispatch(setCardPacksAC(res.data.cardPacks))
  })
}

//TYPE
export type PacksAT = SetCardPacksAT
export type SetCardPacksAT = ReturnType<typeof setCardPacksAC>
