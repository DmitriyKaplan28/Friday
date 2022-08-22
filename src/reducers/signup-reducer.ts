//state
import axios, { AxiosError } from 'axios'
import { Dispatch } from 'redux'
import { AppDispatch, AppRootStateType } from '../store/store'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { changeIsLogin, ChangeIsLoginType } from './login-reducer'

const initialState = {
  isRegistration: false,
  error: '',
}

export type InitialStateType = {
  isRegistration: boolean
  error?: string
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

export const setError = (error: string | undefined) => ({ type: 'SET-ERROR', error } as const)
//thunk
export const setRegistrationTC = (email: string, password: string) => {
  return (dispatch: Dispatch<SingUpACType | ChangeIsLoginType>) => {
    registerAPI
      .postRegister(email, password)
      .then((res) => {
        if (res.data.addedUser) {
          dispatch(setRegistration(true))
          dispatch(changeIsLogin(true))
        } else if (res.data.error) {
          dispatch(setError(res.data.error))
        }
      })
      .catch((error: AxiosError<DataResponseType>) => {
        dispatch(setError(error.response?.data.error))
      })
  }
}
//response.data.emailRegExp.error
//api
const instance = axios.create({
  baseURL: 'http://localhost:7542/2.0/',
  //baseURL: 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})

export const registerAPI = {
  postRegister(email: string, password: string) {
    return instance.post<ResponseType>('/auth/register', { email, password })
  },
}

// types
export type SingUpACType = ReturnType<typeof setRegistration> | ReturnType<typeof setError>

type ResponseType = {
  addedUser: {}
  error?: string
}

type DataResponseType = {
  error: string
  in: string
  isEmailValid: boolean
  isPassValid: boolean
}

//hooks
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
