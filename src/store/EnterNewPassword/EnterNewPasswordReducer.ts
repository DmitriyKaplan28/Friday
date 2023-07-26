import { AxiosError } from 'axios'
import { Dispatch } from 'redux'

import { ErrorDataResponseType, NewPasswordParamsType, resetPasswordAPI } from '../../api/api'
import { AppReducerType, setAppErrorAC, setAppStatusAC } from '../../app/AppReducer'

const initialState = {
  isSentNewPassword: false,
}

export const enterNewPasswordReducer = (
  state: InitialStateType = initialState,
  action: NewPasswordACType
): InitialStateType => {
  switch (action.type) {
    case 'SET-NEW-PASSWORD':
      return { ...state, isSentNewPassword: action.isSentNewPassword }
    default:
      return state
  }
}
// Action
export const statusSetNewPasswordAC = (isSentNewPassword: boolean) =>
  ({ type: 'SET-NEW-PASSWORD', isSentNewPassword } as const)

//thunk
export const setNewPasswordTC = (data: NewPasswordParamsType) => {
  return (dispatch: Dispatch<NewPasswordACType | AppReducerType>) => {
    dispatch(setAppStatusAC('loading'))
    resetPasswordAPI
      .enterNewPassword(data)
      .then(res => {
        dispatch(statusSetNewPasswordAC(true))
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
export type NewPasswordACType = ReturnType<typeof statusSetNewPasswordAC>
type InitialStateType = typeof initialState
