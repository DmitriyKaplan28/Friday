import { AxiosError } from 'axios'
import { Dispatch } from 'redux'

import { ErrorDataResponseType, resetPasswordAPI } from '../../api/api'
import { AppReducerType, setAppErrorAC, setAppStatusAC } from '../../app/AppReducer'

const initialState = {
  isSend: false,
  email: '',
}

export const resetPasswordReducer = (
  state: InitialStateType = initialState,
  action: ResetPasswordAT
): InitialStateType => {
  switch (action.type) {
    case 'SEND-EMAIL':
      return { ...state, isSend: action.isSend }
    case 'SET-EMAIL':
      return { ...state, email: action.email }
    default:
      return state
  }
}
//Action
export const sendEmailAC = (isSend: boolean) => ({ type: 'SEND-EMAIL', isSend } as const)
const setEmailAC = (email: string) => ({ type: 'SET-EMAIL', email } as const)

//Thunk
export const resetPasswordTC =
  (email: string) => (dispatch: Dispatch<AppReducerType | ResetPasswordAT>) => {
    dispatch(setAppStatusAC('loading'))
    resetPasswordAPI
      .forgotPassword(email)
      .then(res => {
        dispatch(setEmailAC(email))
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
type ResetPasswordAT = ReturnType<typeof setEmailAC> | ReturnType<typeof sendEmailAC>