import { Dispatch } from 'redux'

import { authAPI, LoginParamsType } from '../../api/api'

import { AppReducerType, setAppErrorAC, setAppStatusAC } from './AppReducer'
import { setUserAC } from './ProfileReducer'

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
  dispatch(setAppStatusAC('loading'))
  authAPI
    .login(data)
    .then(res => {
      dispatch(setIsLoggedInAC(true))
      dispatch(setUserAC(res.data))
    })
    .catch(err => {
      dispatch(setAppErrorAC(err.response.data.error))
    })
    .finally(() => dispatch(setAppStatusAC('succeeded')))
}

export const logoutTC = () => (dispatch: ThunkDispatchType) => {
  dispatch(setAppStatusAC('loading'))
  authAPI
    .logout()
    .then(() => {
      dispatch(setIsLoggedInAC(false))
    })
    .catch(err => {
      dispatch(setAppErrorAC(err.response.data.error))
    })
    .finally(() => dispatch(setAppStatusAC('succeeded')))
}

// types
export type AuthActionsType =
  | SetIsLoggedInType
  | ReturnType<typeof setErrorAC>
  | ReturnType<typeof setUserAC>
export type SetIsLoggedInType = ReturnType<typeof setIsLoggedInAC>

type InitialLoginStateType = {
  isLoggedIn: boolean
  error: string | null
}
export type ThunkDispatchType = Dispatch<AuthActionsType | AppReducerType>
