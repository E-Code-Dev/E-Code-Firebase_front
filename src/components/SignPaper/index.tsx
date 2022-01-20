import { Container, Stack } from '@mui/material'
import type { ReactNode, VFC } from 'react'
import eCodeIcon from '@images/e-code-icon.svg'
import BaseInput from '@components/BaseInput'
import { IFormValues } from 'src/types/FormValues'
import { FieldError, UseFormRegister } from 'react-hook-form'

import { SignPagePaper, ECodeIcon, ECodeIconBox, SignFormDiv } from './styled'

type SignPaperProps = {
  children: ReactNode

  register: UseFormRegister<IFormValues>
  errors: {
    name?: FieldError | undefined
    email?: FieldError | undefined
    password?: FieldError | undefined
    passwordConfirmation?: FieldError | undefined
    birthDay?: FieldError | undefined
    fileUrl?: FieldError | undefined
    episode?: FieldError | undefined
  }
  errorMessage: string
}

const SignPaper: VFC<SignPaperProps> = (props) => {
  const { register, errors, errorMessage, children } = props
  return (
    <Container maxWidth="sm">
      <SignPagePaper>
        <ECodeIconBox>
          <ECodeIcon>
            <img src={eCodeIcon} alt="E-Codeのアイコン" />
          </ECodeIcon>
        </ECodeIconBox>

        <SignFormDiv>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <form>
            <Stack spacing={1}>
              {errors.email?.type === 'required' && <p>メールアドレスが入力されていません</p>}
              <BaseInput
                fieldLabel="email"
                placeholder="example@example.com"
                label="email"
                register={register}
                requiredFlag
              />
              {errors.password?.type === 'required' && <p>パスワードが入力されていません</p>}
              <BaseInput
                fieldLabel="password"
                type="password"
                label="password"
                register={register}
                requiredFlag
              />
            </Stack>
          </form>

          {children}
        </SignFormDiv>
      </SignPagePaper>
    </Container>
  )
}

export default SignPaper
