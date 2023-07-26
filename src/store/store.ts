import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore as createStore,
} from 'redux'
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { appReducer } from '../app/AppReducer'

import { cardsParamsReducer } from './Cards/CardsParamsReducer'
import { cardsReducer } from './Cards/CardsReducer'
import { enterNewPasswordReducer } from './EnterNewPassword/EnterNewPasswordReducer'
import { authReducer } from './Login/AuthReducer'
import { packsParamsReducer } from './Packs/PacksParamsReducer'
import { packsReducer } from './Packs/PacksReducer'
import { profileReducer } from './Profile/ProfileReducer'
import { resetPasswordReducer } from './ResetPassword/ResetPasswordReducer'
import { signUpReducer } from './SignUp/SignUpReducer'

const rootReducer = combineReducers({
  profile: profileReducer,
  auth: authReducer,
  register: signUpReducer,
  resetPassword: resetPasswordReducer,
  newPassword: enterNewPasswordReducer,
  app: appReducer,
  packs: packsReducer,
  cards: cardsReducer,
  paramsPacks: packsParamsReducer,
  paramsCard: cardsParamsReducer,
})

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

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
