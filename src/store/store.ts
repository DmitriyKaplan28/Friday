import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from 'redux'

import { signUpReducer } from '../reducers/signup-reducer'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AnyAction, applyMiddleware, combineReducers, createStore } from 'redux'
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { authReducer } from '../reducers/auth-reducer'
import { enterNewPasswordReducer } from '../reducers/enter-new-password-reducer'
import { profileReducer } from '../reducers/profile-reducer'
import { loginReducer } from '../reducers/login-reducer'
import { signUpReducer } from '../reducers/signup-reducer'
import { resetPasswordReducer } from '../reducers/reset-password-reducer'
import { enterNewPasswordReducer } from '../reducers/enter-new-password-reducer'
import { appReducer } from '../reducers/app-reducer'

const rootReducer = combineReducers({
  profile: profileReducer,
  auth: authReducer,
  register: signUpReducer,
  resetPassword: resetPasswordReducer,
  newPassword: enterNewPasswordReducer,
  app: appReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  AnyAction
>
export type AppActionsType = {
  type: string
}
// @ts-ignore
window.store = store
