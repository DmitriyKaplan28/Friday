const initialState = {}

type InitialStateType = typeof initialState

export const enterNewPasswordReducer = (
  state: InitialStateType = initialState,
  action: any
): InitialStateType => {
  switch (action.type) {
    default:
      return state
  }
}
