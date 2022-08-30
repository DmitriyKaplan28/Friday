import { packsAPI, PackType } from '../../api/api'
import { AppRootStateType } from '../store'

const initialState = {
  cardPacks: [] as Array<PackType>,
  page: 1,
  pageCount: 4,
  cardPacksTotalCount: 6303,
  minCardsCount: 0,
  maxCardsCount: 110,
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
    case 'packsReducer/SET-CURRENT-PAGE':
      return {
        ...state,
        page: action.page,
      }
  }

  return state
}

//ACTIONS
export const setCardPacksAC = (packs: Array<PackType>) =>
  ({ type: 'packsReducer/SET-CARD-PACKS', packs } as const)
export const setCurrentPageAC = (page: number) =>
  ({ type: 'packsReducer/SET-CURRENT-PAGE', page } as const)

//THUNK
export const setCardPacksTC =
  (page?: number) => (dispatch: any, getState: () => AppRootStateType) => {
    const packs = getState().packs

    packsAPI.getCardPacks(page).then(res => {
      dispatch(setCurrentPageAC(res.data.page))
      dispatch(setCardPacksAC(res.data.cardPacks))
    })
  }

//TYPE
export type PacksAT = SetCardPacksAT | SetCurrentPageAT
export type SetCardPacksAT = ReturnType<typeof setCardPacksAC>
export type SetCurrentPageAT = ReturnType<typeof setCurrentPageAC>
