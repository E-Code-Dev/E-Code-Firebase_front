// React
import { useState } from 'react'
import type { VFC } from 'react'

// React Router
import { Link, Navigate, useNavigate } from 'react-router-dom'

// React-Hook-Form
import { useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'

// Mui
import { Button } from '@mui/material'
import { AutoStories, HistoryEdu } from '@mui/icons-material'

// Js-Cookie
import Cookies from 'js-cookie'

// Components
import SignPaper from '@components/SignPaper'

// Contexts
import { useAuthContext } from '@contexts/AuthContext'
import { useOAuthContext } from '@contexts/OAuthContext'

// Interfaces
import { CorderLogInParams } from '@interfaces/index'

// Lib
import { corderLogIn } from '@lib/api/auth'

// Types
import { IFormValues } from '../types/FormValues'

const CorderLogIn: VFC = () => {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')

  const { corderCurrentUser, setCorderCurrentUser, setIsSignedIn } = useAuthContext()
  const { readerCurrentUser } = useOAuthContext()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormValues>()

  const onSubmit: SubmitHandler<IFormValues> = async (data) => {
    const { email, password } = data

    const params: CorderLogInParams = {
      email,
      password
    }

    await corderLogIn(params)
      .then((response) => {
        const { status, headers } = response
        if (status === 200) {
          Cookies.set('_access_token', headers['access-token'])
          Cookies.set('_client', headers.client)
          Cookies.set('_uid', headers.uid)

          setIsSignedIn(true)
          setCorderCurrentUser(response.data.data)
          navigate('/timeline')
        }
      })
      .catch((error) => {
        if (error) {
          setErrorMessage('ログインできませんでした')
        }
      })
  }

  if (corderCurrentUser || readerCurrentUser) {
    return <Navigate to="/timeline" />
  }

  return (
    <SignPaper register={register} errors={errors} errorMessage={errorMessage}>
      <Button
        variant="contained"
        type="submit"
        disableElevation
        color="secondary"
        fullWidth
        startIcon={<HistoryEdu />}
        onClick={handleSubmit(onSubmit)}
        sx={{ marginTop: '32px' }}
      >
        CORDER LOG IN
      </Button>
      <Button component={Link} to="/corder_signup" fullWidth sx={{ marginTop: '32px' }}>
        CORDER SIGN UP
      </Button>
      <Button
        variant="contained"
        disableElevation
        component={Link}
        to="/reader_login"
        fullWidth
        sx={{ margin: '32px 0 64px 0' }}
        startIcon={<AutoStories />}
      >
        READER LOG IN
      </Button>
    </SignPaper>
  )
}

export default CorderLogIn
