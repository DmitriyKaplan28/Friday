import { AnyAction } from 'redux'
import { UserType } from '../api/api'

const initialState = {
  user: {
    name: '',
  } as UserType,
}

type InitialStateType = typeof initialState

export const profileReducer = (
  state: InitialStateType = initialState,
  action: AnyAction
): InitialStateType => {
  switch (action.type) {
    default:
      return state
  }
}

//ACTIONS CREATOR
export const changeNameAC = (updatedUser: UserType) =>
  ({ type: 'CHANGE-NAME', updatedUser } as const)
export const setUserAC = (user: UserType) => ({ type: 'SET-USER', user } as const)
