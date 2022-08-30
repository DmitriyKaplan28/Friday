const initialState = {
  packName: 'english',
  page: 1,
  pageCount: 4,
  sortPacks: '',
  min: 0,
  max: 110,
}

export const packsParamsReducer = (state: InitialStateType, action: packsParamsAT) => {
  switch (action.type) {
    case 'packsParamsReducer/SET-CURRENT-PAGE':
      return {
        ...state,
        page: action.page,
      }
  }

  return state
}

//ACTIONS
export const setCurrentPageAC = (page: number) =>
  ({ type: 'packsParamsReducer/SET-CURRENT-PAGE', page } as const)

//TYPE
type InitialStateType = typeof initialState
export type packsParamsAT = SetCurrentPageAT
export type SetCurrentPageAT = ReturnType<typeof setCurrentPageAC>
