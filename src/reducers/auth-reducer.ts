import { Dispatch } from 'redux'

import { authAPI, LoginParamsType } from '../api/api'

const initialState: InitialLoginStateType = {
  isLoggedIn: false,
  error: null,
}

export const authReducer = (
  state: InitialLoginStateType = initialState,
  action: AuthActionsType
): InitialLoginStateType => {
  switch (action.type) {
    case 'login/SET-IS-LOGGED-IN':
      return { ...state, isLoggedIn: action.value }
    case 'login/SET-ERROR':
      return { ...state, error: action.error }
    default:
      return state
  }
}

// actions
export const setIsLoggedInAC = (value: boolean) =>
  ({ type: 'login/SET-IS-LOGGED-IN', value } as const)
export const setErrorAC = (error: string | null) => ({ type: 'login/SET-ERROR', error } as const)

// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: ThunkDispatchType) => {
  authAPI
    .login(data)
    .then(() => {
      dispatch(setIsLoggedInAC(true))
    })
    .catch(err => {
      setErrorAC(err.response.data.error)
    })
}

export const logoutTC = () => (dispatch: ThunkDispatchType) => {
  authAPI
    .logout()
    .then(() => {
      dispatch(setIsLoggedInAC(false))
    })
    .catch(err => {
      setErrorAC(err.response.data.error)
    })
}

// types
export type AuthActionsType = SetIsLoggedInType | ReturnType<typeof setErrorAC>
export type SetIsLoggedInType = ReturnType<typeof setIsLoggedInAC>

type InitialLoginStateType = {
  isLoggedIn: boolean
  error: string | null
}
export type ThunkDispatchType = Dispatch<AuthActionsType>
