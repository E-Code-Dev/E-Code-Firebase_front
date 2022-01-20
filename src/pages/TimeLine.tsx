// React
import { useEffect, useState } from 'react'
import type { VFC, MouseEvent, ChangeEvent } from 'react'

// React Router
import { useNavigate } from 'react-router-dom'

// Mui
import { Button } from '@mui/material'
import { HistoryEdu } from '@mui/icons-material'

// Styles
import EpisodeCreateBox from '@styles/pages/TimeLineStyled'

// Contexts
import { useAuthContext } from '@contexts/AuthContext'
import { useOAuthContext } from '@contexts/OAuthContext'

// Components
import BaseModal from '@components/BaseModal'
import ECodeNavBar from '@components/ECodeNaviBar'
import EpisodeTextArea from '@components/EpisodeTextArea'

// Containers
import Layout from '@containers/Layout'
import EpisodeCreateButton from '@containers/EpisodeCreateButton'

import EpisodeListCard from '@containers/EpisodeListCard'

// Lib
import { createEpisode, deleteEpisode, getEpisodeList } from '@lib/api/episode'
import { deleteEpisodeComment } from '@lib/api/episode_comment'

// Types
import { EpisodeCommentData } from '../types/EpisodeCommentData'
import { EpisodeData } from '../types/EpisodeData'

const TimeLine: VFC = () => {
  const { corderCurrentUser } = useAuthContext()
  const { readerCurrentUser } = useOAuthContext()
  const navigate = useNavigate()

  const [errorMessage, setErrorMessage] = useState('')

  const [episodeDataList, setEpisodeDataList] = useState<EpisodeData[] | undefined>([])

  const [episodeValue, setEpisodeValue] = useState('')

  const [showModal, setShowModal] = useState(false)

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

  const contributorName = corderCurrentUser?.name
  const contributorImage = corderCurrentUser?.fileUrl

  const handleChangeCreateArea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setEpisodeValue(event.currentTarget.value)
  }

  const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    if (contributorName && contributorImage) {
      await createEpisode({ content: episodeValue, contributorName, contributorImage })
        .then(() => {
          handleGetEpisodeList()
            .then(() => {
              setShowModal(false)
            })
            .catch((error) => {
              if (error) {
                setErrorMessage('エピソードを取得できませんでした')
              }
            })
        })
        .catch((error) => {
          if (error) {
            setErrorMessage('エピソード一覧を取得できませんでした')
          }
        })
    }
  }

  const openModal = () => {
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <Layout>
      <ECodeNavBar />

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <EpisodeListCard
        episodeDataList={episodeDataList}
        handleEpisodeDelete={handleEpisodeDelete}
        handleEpisodeCommentDelete={handleEpisodeCommentDelete}
        corderCurrentUser={corderCurrentUser}
        sliceStartNumber={-50}
      />

      <BaseModal showFlag={showModal}>
        <form>
          <EpisodeTextArea onChange={handleChangeCreateArea} />
        </form>
        <EpisodeCreateBox>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            onClick={handleSubmit}
            sx={{ marginTop: '16px' }}
            startIcon={<HistoryEdu />}
          >
            投稿する
          </Button>
          <Button type="submit" variant="contained" onClick={closeModal} sx={{ marginTop: '32px' }}>
            閉じる
          </Button>
        </EpisodeCreateBox>
      </BaseModal>
      <EpisodeCreateButton onClick={openModal} />
    </Layout>
  )
}

export default TimeLine
