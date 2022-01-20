import type { VFC } from 'react'

// Components
import BaseOAuthButton from '@components/BaseOAuthButton'

// Containers
import { facebookAuth, githubAuth, googleAuth, twitterAuth } from '@containers/OAuth'

// Images
import googleIcon from '@images/google-icon.svg'
import twitterIcon from '@images/twitter-icon.svg'
import facebookIcon from '@images/facebook-icon.svg'
import githubIcon from '@images/github-icon.svg'
import OAuthAllButtonDiv from './styled'

const OAuthAllButton: VFC = () => {
  return (
    <OAuthAllButtonDiv>
      <BaseOAuthButton
        serviceAuth={googleAuth}
        oAuthIcon={googleIcon}
        oAuthAlt="Googleのアイコン"
      />
      <BaseOAuthButton
        serviceAuth={twitterAuth}
        oAuthIcon={twitterIcon}
        oAuthAlt="twitterのアイコン"
      />
      <BaseOAuthButton
        serviceAuth={facebookAuth}
        oAuthIcon={facebookIcon}
        oAuthAlt="Facebookのアイコン"
      />
      <BaseOAuthButton
        serviceAuth={githubAuth}
        oAuthIcon={githubIcon}
        oAuthAlt="GitHubのアイコン"
      />
    </OAuthAllButtonDiv>
  )
}

export default OAuthAllButton
