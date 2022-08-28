//state
import { AxiosError } from 'axios'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'

import { registerAPI } from '../../api/api'
import { AppDispatch, AppRootStateType } from '../store'

import { setIsLoggedInAC, SetIsLoggedInType } from './auth-reducer'

const initialState = {
  isRegistration: false,
  error: null,
}

export type InitialStateType = {
  isRegistration: boolean
  error: ErrorType
}

export const signUpReducer = (
  state: InitialStateType = initialState,
  action: SingUpACType
): InitialStateType => {
  switch (action.type) {
    case 'SET-REGISTRATION':
      return { ...state, isRegistration: action.register }
    case 'SET-ERROR':
      return { ...state, error: action.error }
    default:
      return state
  }
}
// Action
export const setRegistration = (register: boolean) =>
  ({ type: 'SET-REGISTRATION', register } as const)

export const setError = (error: ErrorType) => ({ type: 'SET-ERROR', error } as const)
//thunk
export const setRegistrationTC = (email: string, password: string) => {
  return (dispatch: Dispatch<SingUpACType | SetIsLoggedInType>) => {
    registerAPI
      .postRegister(email, password)
      .then(res => {
        if (res.data.addedUser) {
          dispatch(setRegistration(true))
          dispatch(setIsLoggedInAC(true))
        } else if (res.data.error) {
          dispatch(setError(res.data.error))
        }
      })
      .catch((error: AxiosError<DataResponseType>) => {
        dispatch(setError(error.response?.data.error))
      })
  }
}
// types
export type SingUpACType = ReturnType<typeof setRegistration> | ReturnType<typeof setError>

export type ResponseRegisterType = {
  addedUser: {}
  error?: string
}

type DataResponseType = {
  error: string
  in: string
  isEmailValid: boolean
  isPassValid: boolean
}
export type ErrorType = string | null | undefined

//hooks
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
