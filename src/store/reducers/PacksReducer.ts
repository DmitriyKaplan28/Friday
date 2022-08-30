import { packsAPI, PackType } from '../../api/api'
import { AppRootStateType } from '../store'

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
export const setCardPacksTC = () => (dispatch: any, getState: () => AppRootStateType) => {
  const paramsPacks = getState().paramsPacks
  const { page, pageCount, min, max, sortPacks, packName } = paramsPacks

  packsAPI.getCardPacks({ page, pageCount, min, max, sortPacks, packName }).then(res => {
    dispatch(setCardPacksAC(res.data.cardPacks))
    console.log(res.data)
    dispatch(setCardPacksTotalCountAC(res.data.cardPacksTotalCount))
  })
}

//TYPE
export type PacksAT = SetCardPacksAT | SetCardPacksTotalCountAT
export type SetCardPacksAT = ReturnType<typeof setCardPacksAC>
export type SetCardPacksTotalCountAT = ReturnType<typeof setCardPacksTotalCountAC>
