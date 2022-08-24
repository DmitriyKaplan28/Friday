const initialState = {
  isLogin: false,
}
type initialStateType = typeof initialState

export const authReducer = (state: initialStateType = initialState, action: AuthReducerType) => {
  switch (action.type) {
    case 'SET-IS-LOGIN':
      return {
        ...state,
        isLogin: action.isLogin,
      }
  }
  return state
}

//ACTIONS
export const setIsLoginAC = (isLogin: boolean) => ({ type: 'SET-IS-LOGIN', isLogin } as const)

//TYPE
export type SetIsLoginAT = ReturnType<typeof setIsLoginAC>
export type AuthReducerType = SetIsLoginAT
