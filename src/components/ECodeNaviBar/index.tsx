// React
import { VFC } from 'react'

// React Router
import { useNavigate } from 'react-router-dom'

// Mui
import { Button, ButtonGroup } from '@mui/material'
import { AccessTime, Face } from '@mui/icons-material'

// Contexts
import { useOAuthContext } from '@contexts/OAuthContext'

import NavPaper from './styled'

const ECodeNavBar: VFC = () => {
  const { readerCurrentUser } = useOAuthContext()

  const navigate = useNavigate()

  const timeLineNavigate = () => {
    navigate('/timeline')
  }

  const ownEpisodeNavigate = () => {
    navigate('/user/episodes')
  }

  return (
    <NavPaper>
      {readerCurrentUser ? (
        <ButtonGroup variant="text" fullWidth>
          <Button onClick={timeLineNavigate} startIcon={<AccessTime />} disabled>
            タイムライン
          </Button>
          <Button onClick={ownEpisodeNavigate} startIcon={<Face />} disabled>
            自分の投稿
          </Button>
        </ButtonGroup>
      ) : (
        <ButtonGroup variant="text" fullWidth>
          <Button onClick={timeLineNavigate} startIcon={<AccessTime />} sx={{ color: '#2286c3' }}>
            タイムライン
          </Button>
          <Button onClick={ownEpisodeNavigate} startIcon={<Face />} sx={{ color: '#2286c3' }}>
            自分の投稿
          </Button>
        </ButtonGroup>
      )}
    </NavPaper>
  )
}

export default ECodeNavBar
