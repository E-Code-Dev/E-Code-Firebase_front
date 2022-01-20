// React
import { useState, useEffect, useContext, useMemo, useCallback } from 'react'
import type { VFC } from 'react'

// React Router
import { Navigate } from 'react-router-dom'

// Components
import ECodeNavBar from '@components/ECodeNaviBar'

// Containers
import Layout from '@containers/Layout'

import EpisodeListCard from '@containers/EpisodeListCard'

// Contexts
import { AuthContext } from '@contexts/AuthContext'
import { OAuthContext } from '@contexts/OAuthContext'

// Lib
import { deleteEpisode } from '@lib/api/episode'
import getUserEpisodes from '@lib/api/user_episode'

// Types
import { EpisodeData } from 'src/types/EpisodeData'
import { deleteEpisodeComment } from '@lib/api/episode_comment'
import { EpisodeCommentData } from 'src/types/EpisodeCommentData'

const UserEpisodeList: VFC = () => {
  const [errorMessage, setErrorMessage] = useState('')

  const { isSignedIn, corderCurrentUser } = useContext(AuthContext)
  const { readerCurrentUser } = useContext(OAuthContext)

  const [userEpisodes, setUserEpisodes] = useState<EpisodeData[] | undefined>([])

  const handleGetUserEpisodes = useCallback(async () => {
    if (corderCurrentUser?.id) {
      if (isSignedIn) {
        const response = await getUserEpisodes(corderCurrentUser?.id)
        setUserEpisodes(response.data)
      } else {
        return <Navigate to="/corder_login" />
      }
    }
    return false
  }, [corderCurrentUser?.id, isSignedIn])

  const handleEpisodeDelete = useMemo(() => {
    return async (contents: EpisodeData) => {
      await deleteEpisode(contents.id)
        .then(() => {
          handleGetUserEpisodes()
            .then(() => {
              //
            })
            .catch((error) => {
              if (error) {
                setErrorMessage('エピソードを取得できませんでした')
              }
            })
        })
        .catch((error) => {
          if (error) {
            setErrorMessage('このエピソードは消すことができなかったみたいです。')
          }
        })
    }
  }, [handleGetUserEpisodes])

  const handleEpisodeCommentDelete = async (data: EpisodeCommentData) => {
    await deleteEpisodeComment(data.id)
      .then(() => {
        handleGetUserEpisodes()
          .then(() => {
            //
          })
          .catch((error) => {
            if (error) {
              setErrorMessage('エピソードを取得できませんでした')
            }
          })
      })
      .catch((error) => {
        if (error) {
          setErrorMessage('このエピソードは消すことができなかったみたいです。')
        }
      })
  }

  useEffect(() => {
    handleGetUserEpisodes()
      .then(() => {
        //
      })
      .catch(() => {
        //
      })
  }, [corderCurrentUser, handleGetUserEpisodes])

  const UserEpisodeCard = () => {
    return useMemo(() => {
      if (userEpisodes) {
        if (userEpisodes?.length >= 1) {
          return (
            <EpisodeListCard
              episodeDataList={userEpisodes}
              handleEpisodeDelete={handleEpisodeDelete}
              corderCurrentUser={corderCurrentUser}
              handleEpisodeCommentDelete={handleEpisodeCommentDelete}
            />
          )
        }
      }
      return <h2>エピソードがありません</h2>
    }, [])
  }

  if (readerCurrentUser) {
    return <Navigate to="/timeline" />
  }

  return (
    <Layout>
      <ECodeNavBar />

      {errorMessage && <p>{errorMessage}</p>}

      <UserEpisodeCard />
    </Layout>
  )
}

export default UserEpisodeList
