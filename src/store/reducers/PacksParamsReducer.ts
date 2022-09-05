import { PacksParamsType } from '../../api/api'

const initialState = {
  packName: '',
  page: 1,
  pageCount: 4,
  sortPacks: '0',
  min: 0,
  max: 110,
  user_id: '',
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
    case 'packsParamsReducer/SET-MY-PACKS':
      return {
        ...state,
        user_id: action.id,
      }
    case 'packsParamsReducer/RESET-SETTINGS-PACKS':
      return {
        ...state,
        ...initialState,
      }
  }

  return state
}

//ACTIONS

export const searchPackNameAC = (name: string) =>
  ({ type: 'packsParamsReducer/SEARCH-PACK-NAME', name } as const)
export const setPacksParamsAC = (filterData: PacksParamsType) =>
  ({ type: 'packsFilterReducer/SET-PACKS-FILTER', filterData } as const)
export const setMyPacksAC = (id: string) =>
  ({ type: 'packsParamsReducer/SET-MY-PACKS', id } as const)

export const setResetSettingsPacksAC = () =>
  ({ type: 'packsParamsReducer/RESET-SETTINGS-PACKS' } as const)

//TYPE
type InitialStateType = typeof initialState
export type PacksParamsAT =
  | SearchPackNameAT
  | PacksFilterAT
  | SetResetSettingsPacksAT
  | SetMyPacksAT
export type SearchPackNameAT = ReturnType<typeof searchPackNameAC>
export type PacksFilterAT = ReturnType<typeof setPacksParamsAC>
export type SetResetSettingsPacksAT = ReturnType<typeof setResetSettingsPacksAC>
export type SetMyPacksAT = ReturnType<typeof setMyPacksAC>
