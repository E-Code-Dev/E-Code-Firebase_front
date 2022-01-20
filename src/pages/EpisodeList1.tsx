// React
import { useState, useEffect } from 'react'
import type { VFC } from 'react'

// React Router
import { useNavigate } from 'react-router-dom'

// Components
import ECodeNavBar from '@components/ECodeNaviBar'

// Containers
import Layout from '@containers/Layout'
import EpisodeListCard from '@containers/EpisodeListCard'

// Contexts
import { useAuthContext } from '@contexts/AuthContext'
import { useOAuthContext } from '@contexts/OAuthContext'

// Lib
import { deleteEpisode, getEpisodeList } from '@lib/api/episode'
import { deleteEpisodeComment } from '@lib/api/episode_comment'

// Types
import { EpisodeCommentData } from '../types/EpisodeCommentData'
import type { EpisodeData } from '../types/EpisodeData'

const EpisodeList1: VFC = () => {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')
  const { corderCurrentUser } = useAuthContext()
  const { readerCurrentUser } = useOAuthContext()

  const [episodeDataList, setEpisodeDataList] = useState<EpisodeData[] | undefined>([])

  const handleGetEpisodeList = async () => {
    await getEpisodeList()
      .then((response) => {
        setEpisodeDataList(response.data)
      })
      .catch((error) => {
        if (error) {
          setErrorMessage('エピソードを取得できませんでした。')
        }
      })
  }

  useEffect(() => {
    handleGetEpisodeList()
      .then(() => {
        if (!corderCurrentUser && !readerCurrentUser) {
          navigate('/')
        }
      })
      .catch(() => {
        //
      })
  }, [corderCurrentUser, readerCurrentUser, navigate])

  const handleEpisodeDelete = async (contents: EpisodeData) => {
    await deleteEpisode(contents.id)
      .then(() => {
        handleGetEpisodeList()
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

  const handleEpisodeCommentDelete = async (data: EpisodeCommentData) => {
    await deleteEpisodeComment(data.id)
      .then(() => {
        handleGetEpisodeList()
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

  return (
    <Layout>
      <ECodeNavBar />

      {errorMessage && <p>{errorMessage}</p>}

      <EpisodeListCard
        episodeDataList={episodeDataList}
        handleEpisodeDelete={handleEpisodeDelete}
        handleEpisodeCommentDelete={handleEpisodeCommentDelete}
        corderCurrentUser={corderCurrentUser}
        sliceStartNumber={-50}
      />
    </Layout>
  )
}

export default EpisodeList1
