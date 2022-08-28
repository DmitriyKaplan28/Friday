import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from 'redux'
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { appReducer } from '../reducers/app-reducer'
import { authReducer } from '../reducers/auth-reducer'
import { enterNewPasswordReducer } from '../reducers/enter-new-password-reducer'
import { forgotPasswordReducer } from '../reducers/ForgotPasswordReducer'
import { profileReducer } from '../reducers/profile-reducer'
import { signUpReducer } from '../reducers/signup-reducer'

const rootReducer = combineReducers({
  profile: profileReducer,
  auth: authReducer,
  register: signUpReducer,
  resetPassword: forgotPasswordReducer,
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
