import { setRegistration, signUpReducer, InitialStateType } from '../SignUpReducer'

const startState: InitialStateType = {
  isRegistration: false,
}

test('correct sing up should be changed register', () => {
  const endState = signUpReducer(startState, setRegistration(true))

  expect(endState.isRegistration).toBe(true)
})
