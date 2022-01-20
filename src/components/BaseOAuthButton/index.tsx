import type { VFC } from 'react'

import { OAuthButtonTypes } from '../../types/OAuthButton'

// Styled
import { OAuthButton, SvgBox } from './styled'

const BaseOAuthButton: VFC<OAuthButtonTypes> = (props) => {
  const { serviceAuth, oAuthIcon, oAuthAlt } = props
  return (
    <OAuthButton variant="outlined" onClick={serviceAuth}>
      <SvgBox>
        <img src={oAuthIcon} alt={oAuthAlt} />
      </SvgBox>
    </OAuthButton>
  )
}

export default BaseOAuthButton
