// React
import { createContext, useState, useEffect, useContext, useMemo } from 'react'
import type { VFC, ReactNode, Dispatch, SetStateAction } from 'react'

// Components
import Progress from '@components/Progress/intex'

// Interfaces
import { CorderUser } from '@interfaces/index'

// Lib
import { getCurrentUser } from '@lib/api/auth'

export const AuthContext = createContext(
  {} as {
    isSignedIn: boolean
    setIsSignedIn: Dispatch<SetStateAction<boolean>>
    corderCurrentUser: CorderUser | undefined
    setCorderCurrentUser: Dispatch<SetStateAction<CorderUser | undefined>>
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
  const [corderCurrentUser, setCorderCurrentUser] = useState<CorderUser | undefined>()

  // ログイン済みのユーザーがいるかどうかチェックし、確認できた場合はそのユーザーの情報を取得
  const handleGetCurrentUser = async () => {
    try {
      const response = await getCurrentUser()
      if (response?.data.isLogin === true) {
        setIsSignedIn(true)
        setCorderCurrentUser(response?.data.data)
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
      corderCurrentUser,
      setCorderCurrentUser
    }
  }, [isSignedIn, setIsSignedIn, corderCurrentUser, setCorderCurrentUser])

  useEffect(() => {
    handleGetCurrentUser()
      .then(() => {
        //
      })
      .catch(() => {
        //
      })
    setLoading(false)
  }, [setCorderCurrentUser])

  if (loading) {
    return <Progress />
  }
  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
