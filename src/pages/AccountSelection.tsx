import type { VFC } from 'react'
import { Link, Navigate } from 'react-router-dom'

import { Button, Container, Paper, Stack } from '@mui/material'

import { useOAuthContext } from '@contexts/OAuthContext'
import { useAuthContext } from '@contexts/AuthContext'
import { AutoStories, HistoryEdu } from '@mui/icons-material'
import { ECodeIconBox } from '@styles/pages/AccountSelectionStyled'

import eCodeIcon from '@images/e-code-icon.svg'

const AccountSelection: VFC = () => {
  const { coderCurrentUser } = useAuthContext()
  const { readerCurrentUser } = useOAuthContext()

  if (readerCurrentUser || coderCurrentUser) {
    return <Navigate to="/timeline" />
  }

  return (
    <Container maxWidth="sm">
      <Stack spacing={4}>
        <Paper sx={{ mt: '48px' }} elevation={2}>
          <ECodeIconBox>
            <img src={eCodeIcon} alt="E-Codeのアイコン" />
          </ECodeIconBox>
        </Paper>
        <Stack direction="row" spacing={4}>
          <Button
            variant="contained"
            component={Link}
            to="/reader_signup"
            startIcon={<AutoStories />}
            fullWidth
          >
            READER
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/coder_signup"
            startIcon={<HistoryEdu />}
            fullWidth
          >
            CODER
          </Button>
        </Stack>
      </Stack>
    </Container>
  )
}

export default AccountSelection
