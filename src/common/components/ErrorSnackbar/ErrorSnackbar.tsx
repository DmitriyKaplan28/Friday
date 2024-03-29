import * as React from 'react'

import MuiAlert, { AlertProps } from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

import { setAppErrorAC, setModalStatusAC } from '../../../app/AppReducer'
import { useAppDispatch, useAppSelector } from '../../../store/store'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export const ErrorSnackbar = () => {
  const error = useAppSelector(state => state.app.error)
  const modalStatusRequest = useAppSelector(state => state.app.modalStatusRequest)
  const dispatch = useAppDispatch()

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(setAppErrorAC(null))
    dispatch(setModalStatusAC('idle'))
  }

  return (
    <Snackbar
      open={error !== null || modalStatusRequest === 'succeeded'}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      {error !== null ? (
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      ) : (
        <Alert onClose={handleClose} severity="success">
          {modalStatusRequest}
        </Alert>
      )}
    </Snackbar>
  )
}
