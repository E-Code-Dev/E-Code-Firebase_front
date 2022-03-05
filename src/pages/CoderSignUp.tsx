// React
import { ChangeEvent, useState, VFC } from 'react'

//  React Router
import { Link, Navigate } from 'react-router-dom'

// React-Hook-Form
import { useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'

// Firebase
import { storage } from '@lib/firebase'
import { ref, StorageError, uploadBytes } from 'firebase/storage'

// Uuid
import { v4 as uuidv4 } from 'uuid'

// Mui
import { Avatar, Box, Button, Stack } from '@mui/material'
import { AutoStories, HistoryEdu } from '@mui/icons-material'

// Styles
import { AvatorBox } from '@styles/pages/ReaderSign'

// Components
import BaseInput from '@components/BaseInput'
import BaseUpLoadImgButton from '@components/BaseUpLoadImgButton'
import SignPaper from '@components/SignPaper'

// Containers
import CoderSignUpModal from '@containers/CoderSignUpModal'

// Contexts
import { useAuthContext } from '@contexts/AuthContext'
import { useOAuthContext } from '@contexts/OAuthContext'

// Types
import { IFormValues } from '../types/FormValues'

const CoderSignUp: VFC = () => {
  const { coderCurrentUser } = useAuthContext()
  const { readerCurrentUser } = useOAuthContext()

  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [userPasswordConfirmation, setUserPasswordConfirmation] = useState('')
  const [userBirthDay, setUserBirthDay] = useState('')
  const [imagePath, setImagePath] = useState('')
  const [fileUrl, setFileUrl] = useState('')
  const [selectedFile, setSelectedFile] = useState<File>()

  const [errorMessage, setErrorMessage] = useState('')

  const [showModal, setShowModal] = useState(false)

  const imageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target
    if (files) {
      const imageFile = files[0]
      const imageUrl = URL.createObjectURL(imageFile)
      setImagePath(imageUrl)
      setSelectedFile(imageFile)
    }
  }
  const uploadFile = (file: File) => {
    const fileExtension = file.name.split('.').pop()

    if (fileExtension !== undefined) {
      const fileName = `${uuidv4()}.${fileExtension}`

      const storageRef = ref(storage, fileName)
      uploadBytes(storageRef, file).catch((error: StorageError) => {
        if (error) {
          setErrorMessage(error.message)
        }
      })

      setFileUrl(
        `https://firebasestorage.googleapis.com/v0/b/mako-e-code.appspot.com/o/${fileName}?alt=media`
      )
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormValues>()

  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    const { name, email, password, passwordConfirmation, birthDay } = data

    if (selectedFile) {
      uploadFile(selectedFile)
    }
    setUserEmail(email)
    setUserName(name)
    setUserBirthDay(birthDay)
    if (password === passwordConfirmation) {
      setUserPassword(password)
      setUserPasswordConfirmation(passwordConfirmation)
      setShowModal(true)
    } else {
      setErrorMessage('パスワードが一致していません')
    }
  }

  const closeModal = () => {
    setShowModal(false)
  }

  if (coderCurrentUser || readerCurrentUser) {
    return <Navigate to="/timeline" />
  }

  return (
    <SignPaper register={register} errors={errors} errorMessage={errorMessage}>
      <form>
        {errors.passwordConfirmation?.type === 'required' && (
          <p>パスワード(確認)が入力されていません</p>
        )}
        <Stack spacing={1}>
          <Box sx={{ marginTop: '8px' }}>
            <BaseInput
              type="password"
              label="passwordConfirmation"
              fieldLabel="パスワード（再確認）"
              register={register}
              requiredFlag
            />
          </Box>
          <AvatorBox>
            <Avatar src={imagePath} alt="アカウントアイコン" sx={{ width: 64, height: 64 }} />
          </AvatorBox>
        </Stack>
        <Stack spacing={1}>
          <BaseUpLoadImgButton label="userImg" onChange={imageChange} disableElevation>
            ICON SELECT
          </BaseUpLoadImgButton>
          {errors.name?.type === 'required' && <p>名前が入力されていません</p>}
          <BaseInput label="name" fieldLabel="名前" register={register} requiredFlag />
          {errors.birthDay?.type === 'required' && <p>誕生日が入力されていません</p>}
          <BaseInput
            type="date"
            label="birthDay"
            fieldLabel="誕生日"
            register={register}
            requiredFlag
            defaultValue="2000-01-01"
          />
        </Stack>

        <Button
          variant="contained"
          color="secondary"
          type="submit"
          disableElevation
          onClick={handleSubmit(onSubmit)}
          fullWidth
          startIcon={<HistoryEdu />}
          sx={{ marginTop: '32px' }}
        >
          CODER SIGN UP
        </Button>
      </form>
      <Button component={Link} to="/coder_login" fullWidth sx={{ marginTop: '32px' }}>
        CODER LOG IN
      </Button>
      <Button
        variant="contained"
        disableElevation
        component={Link}
        to="/reader_signup"
        fullWidth
        sx={{ margin: '32px 0 64px 0' }}
        startIcon={<AutoStories />}
      >
        READER SIGN UP
      </Button>

      <CoderSignUpModal
        imagePath={imagePath}
        imageUrl={fileUrl}
        userName={userName}
        userEmail={userEmail}
        userBirthDay={userBirthDay}
        userPassword={userPassword}
        userPasswordConfirmation={userPasswordConfirmation}
        showFlag={showModal}
        onClick={closeModal}
      />
    </SignPaper>
  )
}

export default CoderSignUp
