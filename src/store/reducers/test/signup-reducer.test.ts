import { InitialStateType, setRegistration, signUpReducer } from '../signup-reducer'

const startState: InitialStateType = {
  isRegistration: false,
  error: '',
}

test('correct sing up should be changed register', () => {
  const endState = signUpReducer(startState, setRegistration(true))

  expect(endState.isRegistration).toBe(true)
})
