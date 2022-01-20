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

// Firebase
import { signInWithEmailAndPassword } from 'firebase/auth'
import type { AuthError } from 'firebase/auth'

// Components
import SignPaper from '@components/SignPaper'
import OAuthAllButton from '@components/OAuthAllButton'

// Contexts
import { useAuthContext } from '@contexts/AuthContext'
import { useOAuthContext } from '@contexts/OAuthContext'

// Lib
import { auth } from '@lib/firebase'

// Types
import { IFormValues } from '../types/FormValues'

const ReaderLogin: VFC = () => {
  const { corderCurrentUser } = useAuthContext()
  const { readerCurrentUser } = useOAuthContext()
  const [errorMessage, setErrorMessage] = useState('')

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormValues>()

  const onSubmit: SubmitHandler<IFormValues> = async (data) => {
    const { email, password } = data
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const { user } = userCredential

        // ログイン出来たらTimeLineを表示
        if (user) {
          navigate('/timeline')
        }
      })
      .catch((error: AuthError) => {
        setErrorMessage(error.message)
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
        fullWidth
        startIcon={<AutoStories />}
        onClick={handleSubmit(onSubmit)}
        sx={{ margin: '32px 0' }}
      >
        READER LOG IN
      </Button>

      <OAuthAllButton />

      <Button component={Link} to="/reader_signup" fullWidth sx={{ marginTop: '32px' }}>
        READER SIGN UP
      </Button>

      <Button
        variant="contained"
        disableElevation
        color="secondary"
        component={Link}
        to="/corder_login"
        fullWidth
        sx={{ margin: '32px 0 64px 0' }}
        startIcon={<HistoryEdu />}
      >
        CORDER LOG IN
      </Button>
    </SignPaper>
  )
}

export default ReaderLogin
