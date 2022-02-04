import type { SetStateAction } from 'react'
import { AxiosResponse } from 'axios'

import Cookies from 'js-cookie'

import { CoderSignUpParams, CoderLogInParams, CoderUser } from '@interfaces/index'

import client from './client'

type coderSignUpProps = {
  data: SetStateAction<CoderUser | undefined>
}

// Sign Up(Coder)
export const coderSignUp = (
  params: CoderSignUpParams
): Promise<AxiosResponse<coderSignUpProps>> => {
  return client.post('auth', params)
}

type coderLogInProps = {
  data: SetStateAction<CoderUser | undefined>
}

// Log In(Coder)
export const coderLogIn = (params: CoderLogInParams): Promise<AxiosResponse<coderLogInProps>> => {
  return client.post('auth/sign_in', params)
}

type coderLogOutProps = {
  success: boolean
  data: SetStateAction<CoderUser | undefined>
}

// Sign Out(Coder)
export const coderLogOut = (): Promise<AxiosResponse<coderLogOutProps>> => {
  return client.delete('auth/sign_out', {
    headers: {
      'access-token': Cookies.get('_access_token') ?? '',
      client: Cookies.get('_client') ?? '',
      uid: Cookies.get('_uid') ?? ''
    }
  })
}

type getCurrentUserProps = {
  isLogin: boolean
  data: SetStateAction<CoderUser | undefined>
  message: string
}

// 認証済みのユーザーを取得
export const getCurrentUser = (): Promise<AxiosResponse<getCurrentUserProps>> | undefined => {
  if (!Cookies.get('_access_token') || !Cookies.get('_client') || !Cookies.get('_uid'))
    return undefined
  return client.get('/auth/sessions', {
    headers: {
      'access-token': Cookies.get('_access_token') ?? '',
      client: Cookies.get('_client') ?? '',
      uid: Cookies.get('_uid') ?? ''
    }
  })
}
