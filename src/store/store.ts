import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from 'redux'
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { signUpReducer } from '../reducers/signup-reducer'
import { profileReducer } from '../reducers/profile-reducer'
import { loginReducer } from '../reducers/login-reducer'
import { authReducer } from '../reducers/auth-reducer'
import { appReducer } from '../reducers/app-reducer'

const rootReducer = combineReducers({
  register: signUpReducer,
  profile: profileReducer,
  login: loginReducer,
  auth: authReducer,
  app: appReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  AnyAction
>
// @ts-ignore
window.store = store
