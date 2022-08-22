import { AnyAction } from 'redux'

const initialState = {}

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
