//state
import { AxiosError } from 'axios'
import { Dispatch } from 'redux'

import { registerAPI, RegisterParamsType } from '../api/api'

import { AppReducerType, setAppErrorAC, setAppStatusAC } from './app-reducer'
import { setIsLoggedInAC, SetIsLoggedInType } from './auth-reducer'

const initialState = {
  isRegistration: false,
}

export type InitialStateType = {
  isRegistration: boolean
}

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
// Action
export const setRegistration = (register: boolean) =>
  ({ type: 'SET-REGISTRATION', register } as const)

//thunk
export const setRegistrationTC = (data: RegisterParamsType) => {
  return (dispatch: Dispatch<SingUpACType | SetIsLoggedInType>) => {
    dispatch(setAppStatusAC('loading'))
    registerAPI
      .postRegister(data)
      .then(res => {
        if (res.data.addedUser) {
          dispatch(setRegistration(true))
          dispatch(setIsLoggedInAC(true))
        } else if (res.data.error) {
          dispatch(setAppErrorAC(res.data.error))
        }
      })
      .catch((error: AxiosError<ErrorDataResponseType>) => {
        dispatch(setAppErrorAC(error.response?.data.error))
      })
      .finally(() => {
        dispatch(setAppStatusAC('succeeded'))
      })
  }
}
// types
export type SingUpACType = ReturnType<typeof setRegistration> | AppReducerType

type ErrorDataResponseType = {
  error: string
  in: string
  isEmailValid: boolean
  isPassValid: boolean
}
