// React
import { useState } from 'react'
import type { VFC, MouseEvent } from 'react'

// React Router
import { useNavigate } from 'react-router-dom'

// React-Hook-Form
import { useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'

// Mui
import { Avatar, Button } from '@mui/material'
import { Close, Done } from '@mui/icons-material'

// Js-Cookie
import Cookies from 'js-cookie'

// Styles
import { DoneButton, ProfileButton, ProfileCard, ProfileText } from '@styles/corderSignUpModal'

// Components
import BaseModal from '@components/BaseModal'

// Contexts
import { useAuthContext } from '@contexts/AuthContext'

// Interfaces
import { CorderSignUpParams } from '@interfaces/index'

// Lib
import { corderSignUp } from '@lib/api/auth'

// Types
import { IFormValues } from '../types/FormValues'

type CreateAccountModalProps = {
  showFlag: boolean
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
  userName: string
  userEmail: string
  userPassword: string
  userPasswordConfirmation: string
  userBirthDay: string
  imagePath: string
  imageUrl: string
}

const CreateAccountModal: VFC<CreateAccountModalProps> = (props) => {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')

  const {
    showFlag,
    userName,
    userEmail,
    userPassword,
    userPasswordConfirmation,
    userBirthDay,
    imagePath,
    imageUrl,
    onClick
  } = props

  const { setIsSignedIn, setCorderCurrentUser } = useAuthContext()

  const modalFileUrl = imageUrl
  const modalUserName = userName
  const modalUserEmail = userEmail
  const modalUserBirthDay = userBirthDay
  const modalUserPassword = userPassword
  const modalUserPasswordConfirmation = userPasswordConfirmation

  const { register, handleSubmit } = useForm<IFormValues>()

  const onSubmit: SubmitHandler<IFormValues> = async (data) => {
    const { name, email, password, passwordConfirmation, birthDay, fileUrl } = data

    const params: CorderSignUpParams = {
      name,
      email,
      password,
      passwordConfirmation,
      birthDay,
      fileUrl
    }

    try {
      const response = await corderSignUp(params)

      if (response.status === 200) {
        // アカウント作成に成功したらCookieを格納
        Cookies.set('_access_token', response.headers['access-token'])
        Cookies.set('_client', response.headers.client)
        Cookies.set('_uid', response.headers.uid)

        setIsSignedIn(true)
        setCorderCurrentUser(response.data.data)

        navigate('/timeline')
      }
    } catch (error) {
      if (error) {
        setErrorMessage('アカウントの作成に失敗しました。')
      }
    }
  }

  return (
    <BaseModal showFlag={showFlag}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ProfileCard>
          <div>
            <Avatar src={imagePath} alt="アカウントアイコン" sx={{ width: 96, height: 96 }} />
          </div>
          <ProfileText>
            <p>{modalUserName}</p>

            <p>{modalUserEmail}</p>

            <p>{modalUserBirthDay}</p>
          </ProfileText>
        </ProfileCard>

        <input type="hidden" {...register('email')} defaultValue={modalUserEmail} />
        <input type="hidden" {...register('fileUrl')} defaultValue={modalFileUrl} />
        <input type="hidden" {...register('name')} defaultValue={modalUserName} />
        <input type="hidden" {...register('birthDay')} defaultValue={modalUserBirthDay} />
        <input type="hidden" {...register('password')} defaultValue={modalUserPassword} />
        <input
          type="hidden"
          {...register('passwordConfirmation')}
          defaultValue={modalUserPasswordConfirmation}
        />
        {errorMessage && <p>{errorMessage}</p>}

        <ProfileButton>
          <Button
            variant="contained"
            onClick={onClick}
            fullWidth
            startIcon={<Close />}
            disableElevation
          >
            CANCEL
          </Button>
          <DoneButton
            variant="contained"
            color="secondary"
            type="submit"
            fullWidth
            startIcon={<Done />}
            disableElevation
          >
            SIGN UP
          </DoneButton>
        </ProfileButton>
      </form>
    </BaseModal>
  )
}

export default CreateAccountModal
