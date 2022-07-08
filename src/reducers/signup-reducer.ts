import {AppActionsType} from "../store/store";

const initialState = {}

type InitialStateType = typeof initialState

export const signUpReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        default:
            return state
    }
}
