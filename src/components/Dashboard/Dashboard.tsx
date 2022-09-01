import * as React from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SchoolIcon from '@mui/icons-material/School'
import Button from '@mui/material/Button'
import Fade from '@mui/material/Fade'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

type FadeMenuPropsType = {
  title?: string
}
export const FadeMenu = (props: FadeMenuPropsType) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Button
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {props.title}
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>
          <EditIcon />
          <span>Edit</span>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <DeleteIcon />
          <span>Delete</span>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <SchoolIcon />
          <span>Learn</span>
        </MenuItem>
      </Menu>
    </div>
  )
}
