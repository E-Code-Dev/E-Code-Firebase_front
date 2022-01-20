// React
import { useState } from 'react'
import type { ReactNode, VFC } from 'react'

// React Router
import { useNavigate } from 'react-router-dom'

// Firebase
import { AuthError, signOut } from 'firebase/auth'

// Js-Cookies
import Cookies from 'js-cookie'

// Mui
import { Container } from '@mui/material'

// Components
import BaseHeader from '@components/BaseHeader'

// Container
import LogedInHeader from '@containers/LogedInHeader'

// Contexts
import { useAuthContext } from '@contexts/AuthContext'
import { useOAuthContext } from '@contexts/OAuthContext'

// Lib
import { corderLogOut } from '@lib/api/auth'
import auth from '@lib/firebase'

type LayoutProps = {
  children: ReactNode
}

const Layout: VFC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')

  const { corderCurrentUser, setIsSignedIn } = useAuthContext()
  const { readerCurrentUser } = useOAuthContext()

  const handleCloseNavMenu = async () => {
    if (corderCurrentUser) {
      await corderLogOut()
        .then((response) => {
          if (response.data.success === true) {
            // ログアウト出来たらCookieを削除
            Cookies.remove('_access_token')
            Cookies.remove('_client')
            Cookies.remove('_uid')
            setIsSignedIn(false)
            navigate('/')
            window.location.reload()
          }
        })
        .catch((error) => {
          if (error) {
            setErrorMessage('ログアウトできませんでした')
          }
        })
    }

    if (readerCurrentUser) {
      await signOut(auth)
        .then(() => {
          // Sign-out successful.
          navigate('/')
        })
        .catch((error: AuthError) => {
          // An error happened.
          setErrorMessage(error.message)
        })
    }
  }
  return (
    <>
      {corderCurrentUser || readerCurrentUser ? (
        <LogedInHeader handleCloseNavMenu={handleCloseNavMenu} />
      ) : (
        <BaseHeader />
      )}
      <Container maxWidth="md" sx={{ marginBottom: '64px' }}>
        <div>{errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}</div>
        {children}
      </Container>
    </>
  )
}

export default Layout
