// React
import { useState } from 'react'
import type { VFC, MouseEvent } from 'react'

// Mui
import { Box, IconButton, Menu, Typography, MenuItem, Avatar } from '@mui/material'

// Contexts
import { useAuthContext } from '@contexts/AuthContext'
import { useOAuthContext } from '@contexts/OAuthContext'

import BaseHeader from '@components/BaseHeader'

type LoggedInHeaderProps = {
  handleCloseNavMenu: () => Promise<void>
}

const LoggedInHeader: VFC<LoggedInHeaderProps> = (props) => {
  const { handleCloseNavMenu } = props

  const { corderCurrentUser } = useAuthContext()
  const { readerCurrentUser } = useOAuthContext()

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <BaseHeader>
      <Box>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            alt="Logged In User Avater"
            src={(corderCurrentUser?.fileUrl || readerCurrentUser?.photoURL) ?? ''}
          />
        </IconButton>
        <Menu
          sx={{ mt: '45px' }}
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem onClick={handleCloseNavMenu}>
            <Typography textAlign="center">LogOut</Typography>
          </MenuItem>
        </Menu>
      </Box>
    </BaseHeader>
  )
}

export default LoggedInHeader
