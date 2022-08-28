import { Dispatch } from 'redux'

import { authAPI, profileAPI, UserType } from '../api/api'

import { AppReducerType, setAppErrorAC, setAppStatusAC } from './app-reducer'
import { AuthActionsType, setIsLoggedInAC } from './auth-reducer'

const initialState = {
  user: {
    name: '',
  } as UserType,
}

type InitialStateType = typeof initialState

export const profileReducer = (
  state: InitialStateType = initialState,
  action: ProfileAT
): InitialStateType => {
  switch (action.type) {
    case 'SET-USER':
      return {
        ...state,
        user: action.user,
      }
    case 'CHANGE-NAME':
      return {
        ...state,
        user: action.updatedUser,
      }
    default:
      return state
  }
}

//ACTIONS CREATOR
export const changeNameAC = (updatedUser: UserType) =>
  ({ type: 'CHANGE-NAME', updatedUser } as const)
export const setUserAC = (user: UserType) => ({ type: 'SET-USER', user } as const)

//THUNK
export const setUserTC = () => {
  return (dispatch: ThunkDispatchInProfileType) => {
    authAPI
      .me()
      .then(res => {
        dispatch(setIsLoggedInAC(true))
        dispatch(setUserAC(res.data))
      })
      .catch(err => dispatch(setAppErrorAC(err.response.data.error)))
  }
}
export const changeNameTC = (name: string) => (dispatch: ThunkDispatchInProfileType) => {
  dispatch(setAppStatusAC('loading'))
  profileAPI
    .changeUserName(name)
    .then(res => {
      dispatch(changeNameAC(res.data.updatedUser))
    })
    .catch(err => console.log(err))
    .finally(() => dispatch(setAppStatusAC('succeeded')))
}

//TYPE
export type ProfileAT = ChangeNameAT | SetUserAT
export type ChangeNameAT = ReturnType<typeof changeNameAC>
export type SetUserAT = ReturnType<typeof setUserAC>

export type ThunkDispatchInProfileType = Dispatch<AuthActionsType | ProfileAT | AppReducerType>
