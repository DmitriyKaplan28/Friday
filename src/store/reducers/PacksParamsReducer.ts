const initialState = {
  packName: 'english',
  page: 1,
  pageCount: 4,
  sortPacks: '',
  min: 0,
  max: 110,
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
  }

  return state
}

//ACTIONS
export const setCurrentPageAC = (page: number) =>
  ({ type: 'packsParamsReducer/SET-CURRENT-PAGE', page } as const)
export const setPageCountAC = (pageCount: number) =>
  ({ type: 'packsParamsReducer/SET-PAGE-COUNT', pageCount } as const)

//TYPE
type InitialStateType = typeof initialState
export type packsParamsAT = SetCurrentPageAT | SetPageCountAC
export type SetCurrentPageAT = ReturnType<typeof setCurrentPageAC>
export type SetPageCountAC = ReturnType<typeof setPageCountAC>
