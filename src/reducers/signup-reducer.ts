//state
import { AxiosError } from 'axios'
import { Dispatch } from 'redux'

import { registerAPI, RegisterParamsType } from '../api/api'

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
export const setRegistrationTC = (data: RegisterParamsType) => {
  return (dispatch: Dispatch<SingUpACType | SetIsLoggedInType>) => {
    registerAPI
      .postRegister(data)
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

type DataResponseType = {
  error: string
  in: string
  isEmailValid: boolean
  isPassValid: boolean
}
export type ErrorType = string | null | undefined
