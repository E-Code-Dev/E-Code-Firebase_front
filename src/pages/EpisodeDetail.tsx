// React
import { useState, useEffect } from 'react'
import type { VFC, MouseEvent, ChangeEvent } from 'react'

// React Router
import { useNavigate, useParams } from 'react-router-dom'
import type { Params } from 'react-router-dom'

// Mui
import { Avatar, Box, Button } from '@mui/material'
import { AddComment } from '@mui/icons-material'

// Styles
import { EpisodeDetailPaper } from '@styles/pages/EpisodeDetailStyled'
import { ContributorInfo, ContributorInfoName } from '@styles/episodeListCard'

// Components
import EpisodeTextArea from '@components/EpisodeTextArea'
import ECodeNavBar from '@components/ECodeNaviBar'

// Containers
import Layout from '@containers/Layout'
import EpisodeComments from '@containers/EpisodeComments'

// Contexts
import { useAuthContext } from '@contexts/AuthContext'
import { useOAuthContext } from '@contexts/OAuthContext'

// Lib
import { getEpisodeDetail } from '@lib/api/episode'
import { createEpisodeComment, deleteEpisodeComment } from '@lib/api/episode_comment'

// Types
import { EpisodeCommentData } from '../types/EpisodeCommentData'
import { EpisodeData } from '../types/EpisodeData'

const EpisodeDetail: VFC = () => {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')

  const { corderCurrentUser } = useAuthContext()
  const { readerCurrentUser } = useOAuthContext()

  const [episodeCommentValue, setEpisodeCommentValue] = useState('')
  const [episodeId, setEpisodeId] = useState<number>(0)

  const [episodeData, setEpisodeData] = useState<EpisodeData | undefined>()

  const contributorName = corderCurrentUser?.name
  const contributorImage = corderCurrentUser?.fileUrl

  const query = useParams()

  const handleGetEpisodeDetail = async (data: Readonly<Params<string>>) => {
    const { id } = data

    if (id) {
      await getEpisodeDetail(id)
        .then((response) => {
          setEpisodeData(response.data)
          setEpisodeId(Number(id))
        })
        .catch((error) => {
          if (error) {
            setErrorMessage('エピソードの情報を取得することができませんでした')
          }
        })
    }
  }

  const handleChangeCreateArea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setEpisodeCommentValue(event.currentTarget.value)
  }

  const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    if (contributorName && contributorImage) {
      await createEpisodeComment({
        content: episodeCommentValue,
        episodeId,
        contributorName,
        contributorImage
      })
        .then(() => {
          window.location.reload()
        })
        .catch((error) => {
          if (error) {
            setErrorMessage('何らかのエラーが発生しました')
          }
        })
    }
  }

  useEffect(() => {
    handleGetEpisodeDetail(query)
      .then(() => {
        if (!corderCurrentUser && !readerCurrentUser) {
          navigate('/')
        }
      })
      .catch((error) => {
        if (error) {
          setErrorMessage('エピソードの詳細を取得することができませんでした')
        }
      })
  }, [corderCurrentUser, readerCurrentUser, navigate, query])

  const handleEpisodeCommentDelete = async (data: EpisodeCommentData) => {
    await deleteEpisodeComment(data.id)
      .then(() => {
        handleGetEpisodeDetail(query)
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

  const replaceNewLine = episodeData?.content.replaceAll(/\n/g, '<br>')
  const episodeContent = document.getElementById('episodeContent')
  if (episodeContent && replaceNewLine) {
    episodeContent.innerHTML = replaceNewLine
  }

  return (
    <Layout>
      <ECodeNavBar />
      <EpisodeDetailPaper>
        {errorMessage && <p>{errorMessage}</p>}
        <ContributorInfo>
          <Avatar
            src={episodeData?.contributorImage}
            alt="アカウントアイコン"
            sx={{ width: 64, height: 64 }}
          />
          <ContributorInfoName>{episodeData?.contributorName}</ContributorInfoName>
        </ContributorInfo>

        <Box sx={{ margin: '32px 0' }}>
          <div id="episodeContent" />
          <Box sx={{ fontSize: '14px', marginTop: '32px' }}>{episodeData?.createdAt}</Box>
        </Box>

        {corderCurrentUser && (
          <>
            <form>
              <EpisodeTextArea onChange={handleChangeCreateArea} />
            </form>
            <Button
              type="submit"
              variant="contained"
              onClick={handleSubmit}
              sx={{ marginTop: '16px' }}
              startIcon={<AddComment />}
            >
              コメントを投稿する
            </Button>
          </>
        )}
        <Box sx={{ marginTop: '32px' }}>
          <EpisodeComments
            episodeComments={episodeData?.episodeComments}
            handleEpisodeCommentDelete={handleEpisodeCommentDelete}
            corderCurrentUser={corderCurrentUser}
          />
        </Box>
      </EpisodeDetailPaper>
    </Layout>
  )
}

export default EpisodeDetail
