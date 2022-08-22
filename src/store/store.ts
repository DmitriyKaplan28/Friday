import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { profileReducer } from '../reducers/profile-reducer'
import { signUpReducer } from '../reducers/signup-reducer'
import { resetPasswordReducer } from '../reducers/reset-password-reducer'
import { enterNewPasswordReducer } from '../reducers/enter-new-password-reducer'
import { authReducer } from '../reducers/auth-reducer'

const rootReducer = combineReducers({
  profile: profileReducer,
  login: authReducer,
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
