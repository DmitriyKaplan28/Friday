const initialState = {
  open: false,
}

export const ModalReducer = (state: InitialStateType = initialState, action: ModalReducerAT) => {
  switch (action.type) {
    case 'SET-SHOW-MODAL':
      return {
        ...state,
        open: action.value,
      }
  }

  return state
}

//ACTION
export const setShowModalAC = (value: boolean) => ({ type: 'SET-SHOW-MODAL', value } as const)

//TYPE
type InitialStateType = typeof initialState
export type SetAPShowModalAT = ReturnType<typeof setShowModalAC>

export type ModalReducerAT = SetAPShowModalAT
