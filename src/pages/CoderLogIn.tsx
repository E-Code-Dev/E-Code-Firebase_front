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
import { CoderLogInParams } from '@interfaces/index'

// Lib
import { coderLogIn } from '@lib/api/auth'

// Types
import { IFormValues } from '../types/FormValues'

const CoderLogIn: VFC = () => {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')

  const { coderCurrentUser, setCoderCurrentUser, setIsSignedIn } = useAuthContext()
  const { readerCurrentUser } = useOAuthContext()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormValues>()

  const onSubmit: SubmitHandler<IFormValues> = async (data) => {
    const { email, password } = data

    const params: CoderLogInParams = {
      email,
      password
    }

    await coderLogIn(params)
      .then((response) => {
        const { status, headers } = response
        if (status === 200) {
          Cookies.set('_access_token', headers['access-token'])
          Cookies.set('_client', headers.client)
          Cookies.set('_uid', headers.uid)

          setIsSignedIn(true)
          setCoderCurrentUser(response.data.data)
          navigate('/timeline')
        }
      })
      .catch((error) => {
        if (error) {
          setErrorMessage('ログインできませんでした')
        }
      })
  }

  if (coderCurrentUser || readerCurrentUser) {
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
        CODER LOG IN
      </Button>
      <Button component={Link} to="/coder_signup" fullWidth sx={{ marginTop: '32px' }}>
        CODER SIGN UP
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

export default CoderLogIn
