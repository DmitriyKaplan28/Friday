const initialState = {
  packName: '',
  page: 1,
  pageCount: 4,
  sortPacks: '0',
  min: 3,
  max: 110,
  user_id: '',
}

export const packsParamsReducer = (
  state: InitialStateType = initialState,
  action: packsParamsAT
) => {
  switch (action.type) {
    case 'packsParamsReducer/SET-CURRENT-PAGE':
      return {
        ...state,
        page: action.page,
      }
    case 'packsParamsReducer/SET-PAGE-COUNT':
      return {
        ...state,
        pageCount: action.pageCount,
      }
    case 'packsParamsReducer/SET-MIN-COUNT-CARD':
      return {
        ...state,
        min: action.min,
      }
    case 'packsParamsReducer/SET-MAX-COUNT-CARD':
      return {
        ...state,
        max: action.max,
      }
    case 'packsParamsReducer/SET-SORT-UP-CARD':
      return {
        ...state,
        sortPacks: action.value + `updated`,
      }
    case 'packsParamsReducer/SET-SORT-DOWN-CARD':
      return {
        ...state,
        sortPacks: action.value + `updated`,
      }
    case 'packsParamsReducer/SEARCH-PACK-NAME':
      return {
        ...state,
        packName: action.name,
      }
    case 'packsParamsReducer/SET-MY-PACKS':
      return {
        ...state,
        user_id: action.id,
      }
    case 'packsParamsReducer/RESET-SETTINGS-PACKS':
      return {
        ...state,
        packName: '',
        page: 1,
        pageCount: 4,
        sortPacks: '0',
        min: 3,
        max: 110,
        user_id: '',
      }
  }

  return state
}

//ACTIONS
export const setCurrentPageAC = (page: number) =>
  ({ type: 'packsParamsReducer/SET-CURRENT-PAGE', page } as const)
export const setPageCountAC = (pageCount: number) =>
  ({ type: 'packsParamsReducer/SET-PAGE-COUNT', pageCount } as const)
export const setMinCountCardAC = (min: number) =>
  ({ type: 'packsParamsReducer/SET-MIN-COUNT-CARD', min } as const)
export const setMaxCountCardAC = (max: number) =>
  ({ type: 'packsParamsReducer/SET-MAX-COUNT-CARD', max } as const)
export const setSortUpCardAC = (value: number) =>
  ({ type: 'packsParamsReducer/SET-SORT-UP-CARD', value } as const)
export const setSortDownCardAC = (value: number) =>
  ({ type: 'packsParamsReducer/SET-SORT-DOWN-CARD', value } as const)
export const searchPackNameAC = (name: string) =>
  ({ type: 'packsParamsReducer/SEARCH-PACK-NAME', name } as const)
export const setMyPacksAC = (id: string) =>
  ({ type: 'packsParamsReducer/SET-MY-PACKS', id } as const)

export const setResetSettingsPacksAC = () =>
  ({ type: 'packsParamsReducer/RESET-SETTINGS-PACKS' } as const)
//TYPE
type InitialStateType = typeof initialState
export type packsParamsAT =
  | SetCurrentPageAT
  | SetPageCountAC
  | SetMinCountCardAT
  | SetMaxCountCardAT
  | SetSortUpCardAT
  | SetSortDownCardAT
  | SearchPackNameAT
  | SetResetSettingsPacksAT
  | SetMyPacksAT
export type SetCurrentPageAT = ReturnType<typeof setCurrentPageAC>
export type SetPageCountAC = ReturnType<typeof setPageCountAC>
export type SetMinCountCardAT = ReturnType<typeof setMinCountCardAC>
export type SetMaxCountCardAT = ReturnType<typeof setMaxCountCardAC>
export type SetSortUpCardAT = ReturnType<typeof setSortUpCardAC>
export type SetSortDownCardAT = ReturnType<typeof setSortDownCardAC>
export type SearchPackNameAT = ReturnType<typeof searchPackNameAC>
export type SetResetSettingsPacksAT = ReturnType<typeof setResetSettingsPacksAC>
export type SetMyPacksAT = ReturnType<typeof setMyPacksAC>
