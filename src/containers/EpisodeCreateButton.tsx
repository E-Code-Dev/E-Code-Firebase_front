import type { VFC, MouseEvent } from 'react'

import { HistoryEdu } from '@mui/icons-material'

import { useAuthContext } from '@contexts/AuthContext'

import EpiCreateButton from '@styles/EpisodeCreateButtonStyled'

type EpisodeCreateButtonProps = {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
}

const EpisodeCreateButton: VFC<EpisodeCreateButtonProps> = (props) => {
  const { onClick } = props
  const { corderCurrentUser } = useAuthContext()

  return (
    <div>
      {corderCurrentUser && (
        <EpiCreateButton onClick={onClick} color="secondary">
          <HistoryEdu />
        </EpiCreateButton>
      )}
    </div>
  )
}

export default EpisodeCreateButton
