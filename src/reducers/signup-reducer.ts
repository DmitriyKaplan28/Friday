//state
const initialState = {
  isRegistration: false,
}

export type InitialStateType = typeof initialState

export const signUpReducer = (
  state: InitialStateType = initialState,
  action: SingUpACType
): InitialStateType => {
  switch (action.type) {
    case 'SET-REGISTRATION':
      return { ...state, isRegistration: action.register }
    default:
      return state
  }
}
export const setRegistration = (register: boolean) =>
  ({ type: 'SET-REGISTRATION', register } as const)
//thunk

// types
export type SingUpACType = ReturnType<typeof setRegistration>
