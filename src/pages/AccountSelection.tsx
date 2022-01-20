import type { VFC } from 'react'
import { Link, Navigate } from 'react-router-dom'

import { Button, Container, Paper, Stack } from '@mui/material'

import { useOAuthContext } from '@contexts/OAuthContext'
import { useAuthContext } from '@contexts/AuthContext'
import { AutoStories, HistoryEdu } from '@mui/icons-material'
import { ECodeIconBox, AccountSelectionHead } from '@styles/pages/AccountSelectionStyled'

const AccountSelection: VFC = () => {
  const { corderCurrentUser } = useAuthContext()
  const { readerCurrentUser } = useOAuthContext()

  if (readerCurrentUser || corderCurrentUser) {
    return <Navigate to="/timeline" />
  }

  return (
    <Container maxWidth="sm">
      <Stack spacing={4}>
        <Paper sx={{ mt: '64px' }} elevation={2}>
          <ECodeIconBox>
            <img src="../../src/assets/images/e-code-icon.svg" alt="E-Codeのアイコン" />
          </ECodeIconBox>
          <AccountSelectionHead>E-Codeへようこそ(⌒∇⌒)</AccountSelectionHead>
        </Paper>
        <Stack direction="row" spacing={4}>
          <Button
            variant="contained"
            component={Link}
            to="/reader_signup"
            startIcon={<AutoStories />}
            fullWidth
          >
            E-READER
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/corder_signup"
            startIcon={<HistoryEdu />}
            fullWidth
          >
            E-CORDER
          </Button>
        </Stack>
      </Stack>
    </Container>
  )
}

export default AccountSelection
