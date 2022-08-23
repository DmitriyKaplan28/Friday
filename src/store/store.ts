import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'

import { authReducer } from '../reducers/auth-reducer'
import { enterNewPasswordReducer } from '../reducers/enter-new-password-reducer'
import { profileReducer } from '../reducers/profile-reducer'
import { resetPasswordReducer } from '../reducers/reset-password-reducer'
import { signUpReducer } from '../reducers/signup-reducer'

const rootReducer = combineReducers({
  profile: profileReducer,
  auth: authReducer,
  signUp: signUpReducer,
  resetPassword: resetPasswordReducer,
  newPassword: enterNewPasswordReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppActionsType = {
  type: string
}

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store
