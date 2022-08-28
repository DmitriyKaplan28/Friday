import { AxiosError } from 'axios'
import { Dispatch } from 'redux'

import { forgotPasswordAPI } from '../api/api'

import { AppReducerType, setAppErrorAC, setAppStatusAC } from './app-reducer'
import { ErrorDataResponseType } from './signup-reducer'

const initialState = {
  isSend: false,
}

export const forgotPasswordReducer = (
  state: InitialStateType = initialState,
  action: ForgotPasswordAT
): InitialStateType => {
  switch (action.type) {
    case 'SEND-EMAIL':
      return { ...state, isSend: action.isSend }
    default:
      return state
  }
}
//Action
const sendEmailAC = (isSend: boolean) => ({ type: 'SEND-EMAIL', isSend } as const)

//Thunk
export const forgotPasswordTC =
  (email: string) => (dispatch: Dispatch<AppReducerType | ForgotPasswordAT>) => {
    dispatch(setAppStatusAC('loading'))
    forgotPasswordAPI
      .forgotPassword(email)
      .then(res => {
        dispatch(sendEmailAC(true))
      })
      .catch((error: AxiosError<ErrorDataResponseType>) => {
        dispatch(setAppErrorAC(error.response?.data.error))
      })
      .finally(() => {
        dispatch(setAppStatusAC('succeeded'))
      })
  }

//Types
type InitialStateType = typeof initialState
type ForgotPasswordAT = ReturnType<typeof sendEmailAC>
