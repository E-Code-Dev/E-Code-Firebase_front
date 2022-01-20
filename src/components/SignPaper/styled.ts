import styled from '@emotion/styled'
import { Paper, Box } from '@mui/material'

export const SignPagePaper = styled(Paper)`
  margin: 32px 0 64px 0;
`

export const ECodeIcon = styled(Box)`
  width: 96px;
`

export const ECodeIconBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 64px 0;
`

export const SignFormDiv = styled.div`
  width: 70%;
  margin: 0 auto;
  @media screen and (max-width: 600px) {
    width: 90%;
  }
`
