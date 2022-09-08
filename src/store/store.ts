import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore as createStore,
} from 'redux'
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { appReducer } from './reducers/AppReducer'
import { authReducer } from './reducers/AuthReducer'
import { cardsParamsReducer } from './reducers/CardsParamsReducer'
import { cardsReducer } from './reducers/CardsReducer'
import { enterNewPasswordReducer } from './reducers/EnterNewPasswordReducer'
import { packsParamsReducer } from './reducers/PacksParamsReducer'
import { packsReducer } from './reducers/PacksReducer'
import { profileReducer } from './reducers/ProfileReducer'
import { resetPasswordReducer } from './reducers/ResetPasswordReducer'
import { signUpReducer } from './reducers/SignUpReducer'

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
