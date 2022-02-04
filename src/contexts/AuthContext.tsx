// React
import { createContext, useState, useEffect, useContext, useMemo } from 'react'
import type { VFC, ReactNode, Dispatch, SetStateAction } from 'react'

// Components
import Progress from '@components/Progress/intex'

// Interfaces
import { CoderUser } from '@interfaces/index'

// Lib
import { getCurrentUser } from '@lib/api/auth'

export const AuthContext = createContext(
  {} as {
    isSignedIn: boolean
    setIsSignedIn: Dispatch<SetStateAction<boolean>>
    coderCurrentUser: CoderUser | undefined
    setCoderCurrentUser: Dispatch<SetStateAction<CoderUser | undefined>>
  }
)

export const useAuthContext = () => {
  return useContext(AuthContext)
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContextProvider: VFC<AuthContextProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
  const [coderCurrentUser, setCoderCurrentUser] = useState<CoderUser | undefined>()

  // ログイン済みのユーザーがいるかどうかチェックし、確認できた場合はそのユーザーの情報を取得
  const handleGetCurrentUser = async () => {
    try {
      const response = await getCurrentUser()
      if (response?.data.isLogin === true) {
        setIsSignedIn(true)
        setCoderCurrentUser(response?.data.data)
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }

  const value = useMemo(() => {
    return {
      isSignedIn,
      setIsSignedIn,
      coderCurrentUser,
      setCoderCurrentUser
    }
  }, [isSignedIn, setIsSignedIn, coderCurrentUser, setCoderCurrentUser])

  useEffect(() => {
    handleGetCurrentUser()
      .then(() => {
        //
      })
      .catch(() => {
        //
      })
    setLoading(false)
  }, [setCoderCurrentUser])

  if (loading) {
    return <Progress />
  }
  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
