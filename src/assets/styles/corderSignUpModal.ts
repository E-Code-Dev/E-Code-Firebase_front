import styled from '@emotion/styled'
import { Button } from '@mui/material'

export const ProfileCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
  @media screen and (max-width: 600px) {
    flex-direction: column;
    text-align: center;
  }
`
export const ProfileText = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px 0 0 64px;

  @media screen and (max-width: 600px) {
    flex-direction: column;
    text-align: center;
    margin-left: 0;
  }
`

export const ProfileButton = styled.div`
  display: flex;
  @media screen and (max-width: 600px) {
    flex-direction: column-reverse;
  }
`

export const DoneButton = styled(Button)`
  margin-left: 32px;
  @media screen and (max-width: 600px) {
    margin-bottom: 32px;
  }
`
