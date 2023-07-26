import { AxiosResponse } from 'axios'
import { Dispatch } from 'redux'

import { authAPI } from '../api/api'
import { setIsLoggedInAC } from '../features/Login/AuthReducer'
import { setUserAC } from '../features/Profile/ProfileReducer'

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type RequestStatusModalType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type errorType = string | null | undefined

const initialState = {
  status: 'idle' as RequestStatusType,
  error: null as errorType,
  initialized: false,
  isLoad: false,
  registerError: null,
  modalStatusRequest: 'idle' as RequestStatusModalType,
}

type InitialStateType = typeof initialState
export const appReducer = (
  state: InitialStateType = initialState,
  action: AppReducerType
): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return { ...state, status: action.status }
    case 'APP/SET-ERROR':
      return {
        ...state,
        error: action.error,
      }
    case 'APP/SET-APP-INITIAL':
      return {
        ...state,
        initialized: action.value,
      }
    case 'APP/SET-APP-LOAD':
      return {
        ...state,
        isLoad: action.value,
      }
    case 'APP/SET-MODAL-STATUS':
      return {
        ...state,
        modalStatusRequest: action.value,
      }
    default:
      return state
  }
}
//THUNKS
export const appInitialTC = () => (dispatch: Dispatch) => {
  authAPI
    .me()
    .then((res: AxiosResponse) => {
      dispatch(setUserAC(res.data))
      dispatch(setIsLoggedInAC(true))
    })
    .finally(() => dispatch(setAppInitialAC(true)))
}
//ACTIONS CREATOR
export const setAppStatusAC = (status: RequestStatusType) =>
  ({ type: 'APP/SET-STATUS', status } as const)
export const setAppErrorAC = (error: string | null | undefined) =>
  ({ type: 'APP/SET-ERROR', error } as const)
export const setAppInitialAC = (value: boolean) => ({ type: 'APP/SET-APP-INITIAL', value } as const)
export const setAppLoadAC = (value: boolean) => ({ type: 'APP/SET-APP-LOAD', value } as const)
export const setModalStatusAC = (value: RequestStatusModalType) =>
  ({ type: 'APP/SET-MODAL-STATUS', value } as const)
//TYPES
type SetAppStatusAT = ReturnType<typeof setAppStatusAC>
type SetAppErrorAT = ReturnType<typeof setAppErrorAC>
type SetAppInitialAT = ReturnType<typeof setAppInitialAC>
type SetAppLoadAT = ReturnType<typeof setAppLoadAC>
type SetModalStatusAT = ReturnType<typeof setModalStatusAC>
export type AppReducerType =
  | SetAppStatusAT
  | SetAppErrorAT
  | SetAppInitialAT
  | SetAppLoadAT
  | SetModalStatusAT
