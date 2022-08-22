//state
import axios from 'axios'
import { Dispatch } from 'redux'
import { AppDispatch, AppRootStateType } from '../store/store'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

const initialState = {
  isRegistration: false,
}

export type InitialStateType = typeof initialState

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
export const setRegistration = (register: boolean) =>
  ({ type: 'SET-REGISTRATION', register } as const)
//thunk
export const setRegistrationTC = (email: string, password: string) => {
  return (dispatch: Dispatch<SingUpACType>) => {
    registerAPI.postRegister(email, password).then((res) => {
      if (res.data.addedUser === {}) {
        dispatch(setRegistration(true))
      }
    })
  }
}

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
export type SingUpACType = ReturnType<typeof setRegistration>

type ResponseType = {
  addedUser: {}
  error?: string
}

//hooks
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
