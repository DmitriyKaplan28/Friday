const initialState = {
  isLogin: false,
}

type InitialStateType = typeof initialState

export const loginReducer = (
  state: InitialStateType = initialState,
  action: ChangeIsLoginType
): InitialStateType => {
  switch (action.type) {
    case 'CHANGE-IS-LOGIN':
      return { ...state, isLogin: action.isLogin }
    default:
      return state
  }
}
// Action
export const changeIsLogin = (isLogin: boolean) => ({ type: 'CHANGE-IS-LOGIN', isLogin } as const)
//type
export type ChangeIsLoginType = ReturnType<typeof changeIsLogin>
