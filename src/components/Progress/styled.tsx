import styled from '@emotion/styled'
import { Box } from '@mui/material'

export const ProgressDiv = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const ProgressImageBox = styled(Box)`
  width: 10%;
  padding-bottom: 32px;
  @media screen and (max-width: 500px) {
    width: 30%;
  }
`
