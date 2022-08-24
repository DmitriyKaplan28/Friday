import { withStyles } from '@mui/styles'
import { TextField } from '@mui/material'

export const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#000000',
      opacity: 0.2,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#000000',
      opacity: 0.2,
    },
    '& 	.MuiButton-textPrimary': {
      color: '#FFFFFF',
      backgroundColor: '#366EFF',
      padding: '0 10px',
      fontSize: '12px',
      lineHeight: '24px',
    },
    '& 	.MuiButton-textPrimary:hover': {
      backgroundColor: '#808080',
    },
  },
})(TextField)
