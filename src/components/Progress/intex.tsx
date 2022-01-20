import { CircularProgress } from '@mui/material'
import type { VFC } from 'react'
import eCodeIcon from '@images/e-code-icon.svg'
import { ProgressDiv, ProgressImageBox } from './styled'

const Progress: VFC = () => {
  return (
    <ProgressDiv>
      <ProgressImageBox>
        <img src={eCodeIcon} alt="E-Codeのアイコン" />
      </ProgressImageBox>
      <CircularProgress />
    </ProgressDiv>
  )
}

export default Progress
