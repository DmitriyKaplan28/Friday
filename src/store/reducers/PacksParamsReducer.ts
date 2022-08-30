import { PacksParamsType } from '../../api/api'

const initialState = {
  packName: '',
  page: 1,
  pageCount: 4,
  sortPacks: '',
  min: 3,
  max: 110,
}

export const packsParamsReducer = (
  state: InitialStateType = initialState,
  action: PacksParamsAT
): InitialStateType => {
  switch (action.type) {
    case 'packsParamsReducer/SEARCH-PACK-NAME':
      return {
        ...state,
        packName: action.name,
      }
    case 'packsFilterReducer/SET-PACKS-FILTER':
      return {
        ...state,
        ...action.filterData,
      }
  }

  return state
}

//ACTIONS

export const searchPackNameAC = (name: string) =>
  ({ type: 'packsParamsReducer/SEARCH-PACK-NAME', name } as const)
export const setPacksParamsAC = (filterData: PacksParamsType) =>
  ({ type: 'packsFilterReducer/SET-PACKS-FILTER', filterData } as const)
//TYPE
type InitialStateType = typeof initialState
export type PacksParamsAT = SearchPackNameAC | PacksFilterAT

export type SearchPackNameAC = ReturnType<typeof searchPackNameAC>
export type PacksFilterAT = ReturnType<typeof setPacksParamsAC>
