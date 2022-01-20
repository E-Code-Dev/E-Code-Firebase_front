import { Container } from '@mui/material'
import { ReactNode, VFC } from 'react'

import eCodeLogo from '@images/e-code-logo.svg'
import { AppBarBox, AppBarLogo, ECodeAppBar } from './styled'

type BaseHeaderProps = {
  children?: ReactNode
}

const BaseHeader: VFC<BaseHeaderProps> = (props) => {
  const { children } = props
  return (
    <ECodeAppBar>
      <Container maxWidth="md">
        <AppBarBox>
          <AppBarLogo>
            <img src={eCodeLogo} alt="E-Codeのロゴ" />
          </AppBarLogo>
          {children}
        </AppBarBox>
      </Container>
    </ECodeAppBar>
  )
}

export default BaseHeader
