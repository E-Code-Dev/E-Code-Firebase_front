import type { SetStateAction } from 'react'
import { AxiosResponse } from 'axios'

import Cookies from 'js-cookie'

import { CorderSignUpParams, CorderLogInParams, CorderUser } from '@interfaces/index'

import client from './client'

type corderSignUpProps = {
  data: SetStateAction<CorderUser | undefined>
}

// Sign Up(Corder)
export const corderSignUp = (
  params: CorderSignUpParams
): Promise<AxiosResponse<corderSignUpProps>> => {
  return client.post('auth', params)
}

type corderLogInProps = {
  data: SetStateAction<CorderUser | undefined>
}

// Log In(Corder)
export const corderLogIn = (
  params: CorderLogInParams
): Promise<AxiosResponse<corderLogInProps>> => {
  return client.post('auth/sign_in', params)
}

type corderLogOutProps = {
  success: boolean
  data: SetStateAction<CorderUser | undefined>
}

// Sign Out(Corder)
export const corderLogOut = (): Promise<AxiosResponse<corderLogOutProps>> => {
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
  data: SetStateAction<CorderUser | undefined>
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
