import { authMe, profileAPI, UserType } from '../api/api'
import { setIsLoginAC } from './auth-reducer'

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
  return (dispatch: any) => {
    authMe.me().then((res) => {
      dispatch(setIsLoginAC(true))
      dispatch(setUserAC(res.data))
    })
  }
}
export const changeNameTC = (name: string) => (dispatch: any) => {
  // dispatch(changeNameAC(name))
  profileAPI
    .changeUserName(name)
    .then((res) => {
      dispatch(changeNameAC(res.data.updatedUser))
    })
    .catch((err) => console.log(err))
}

//TYPE
export type ProfileAT = ChangeNameAT | SetUserAT
export type ChangeNameAT = ReturnType<typeof changeNameAC>
export type SetUserAT = ReturnType<typeof setUserAC>
