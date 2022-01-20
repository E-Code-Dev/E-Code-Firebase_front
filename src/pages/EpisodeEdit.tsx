// React
import { ChangeEvent, useEffect, useState } from 'react'
import type { VFC, MouseEvent } from 'react'

// React Router
import { useNavigate, useParams } from 'react-router-dom'
import type { Params } from 'react-router-dom'

// Mui
import { Button } from '@mui/material'
import { Edit } from '@mui/icons-material'

// Components
import ECodeNavBar from '@components/ECodeNaviBar'
import EpisodeTextArea from '@components/EpisodeTextArea'

// Containers
import Layout from '@containers/Layout'
import { EpisodeEditPaper } from '@styles/pages/EpisodeEditStyled'

// Contexts
import { useAuthContext } from '@contexts/AuthContext'
import { useOAuthContext } from '@contexts/OAuthContext'

// Lib
import { getEpisodeDetail, updateEpisode } from '@lib/api/episode'

const EpisodeEdit: VFC = () => {
  const { corderCurrentUser } = useAuthContext()
  const { readerCurrentUser } = useOAuthContext()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')

  const [episodeDataValue, setEpisodeDataValue] = useState('')
  const query = useParams()

  const handleGetEpisodeData = async (data: Readonly<Params<string>>) => {
    const { id } = data
    if (id) {
      await getEpisodeDetail(id)
        .then((response) => {
          setEpisodeDataValue(response.data.content)
        })
        .catch((error) => {
          if (error) {
            setErrorMessage('エピソードを取得できませんでした。')
          }
        })
    }
  }

  useEffect(() => {
    handleGetEpisodeData(query)
      .then(() => {
        if (!corderCurrentUser && !readerCurrentUser) {
          navigate('/')
        }
      })
      .catch(() => {
        //
      })
  }, [corderCurrentUser, readerCurrentUser, navigate, query])

  const handleChangeTextArea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setEpisodeDataValue(event.currentTarget.value)
  }

  const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    if (query.id) {
      await updateEpisode({
        id: query.id,
        params: { content: episodeDataValue }
      })
        .then(() => {
          navigate('/timeline')
        })
        .catch((error) => {
          if (error) {
            setErrorMessage('更新に失敗しました')
          }
        })
    }
  }

  return (
    <Layout>
      <ECodeNavBar />

      <EpisodeEditPaper>
        {errorMessage && <p>{errorMessage}</p>}
        <form>
          <EpisodeTextArea onChange={handleChangeTextArea} value={episodeDataValue} />
        </form>
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          onClick={handleSubmit}
          startIcon={<Edit />}
          sx={{ marginTop: '16px' }}
          disableElevation
        >
          更新する
        </Button>
      </EpisodeEditPaper>
    </Layout>
  )
}

export default EpisodeEdit
