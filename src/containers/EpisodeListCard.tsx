// React
import type { VFC } from 'react'

// React Router
import { Link } from 'react-router-dom'

// Mui
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  IconButton,
  Stack
} from '@mui/material'
import { Delete, Edit } from '@mui/icons-material'

// Styles
import LinkText from '@styles/LintText'
import { ContributorInfo, ContributorInfoName } from '@styles/episodeListCard'

// Containers
import EpisodeComments from '@containers/EpisodeComments'

// Interfaces
import { CorderUser } from '@interfaces/index'

// Types
import { EpisodeCommentData } from '../types/EpisodeCommentData'
import { EpisodeData } from '../types/EpisodeData'

type EpisodeListCardProps = {
  episodeDataList: EpisodeData[] | undefined
  handleEpisodeDelete: (contents: EpisodeData) => Promise<void>
  handleEpisodeCommentDelete: (data: EpisodeCommentData) => Promise<void>
  corderCurrentUser: CorderUser | undefined

  sliceStartNumber?: number | undefined
  sliceEndNumber?: number | undefined
}

const EpisodeListCard: VFC<EpisodeListCardProps> = (props) => {
  const {
    episodeDataList,
    handleEpisodeDelete,
    handleEpisodeCommentDelete,
    corderCurrentUser,
    sliceStartNumber,
    sliceEndNumber
  } = props

  return (
    <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
      <Stack spacing={2}>
        {episodeDataList
          ?.slice(sliceStartNumber, sliceEndNumber)
          .reverse()
          .map((contents: EpisodeData) => {
            const {
              id,
              content,
              contributorName,
              contributorImage,
              userId,
              episodeComments,
              createdAt
            } = contents

            const replaceNewLine = content.replaceAll(/\n/g, '<br>')
            const episodeContent = document.getElementById('episodeContent')
            if (episodeContent && replaceNewLine) {
              episodeContent.innerHTML = replaceNewLine
            }

            const date = createdAt
              .toString()
              .replace('T', ' ')
              .split('.')
              .shift()
              ?.replace(/-/g, '/')

            return (
              <Accordion key={id}>
                <AccordionSummary>
                  <div>
                    <ContributorInfo>
                      <Avatar
                        src={contributorImage}
                        alt="アカウントアイコン"
                        sx={{ width: 64, height: 64 }}
                      />
                      <ContributorInfoName>{contributorName}</ContributorInfoName>
                    </ContributorInfo>

                    <LinkText to={`/episode_detail/${id}`}>
                      <p>{content}</p>
                    </LinkText>
                    <p>{date}</p>
                    {corderCurrentUser?.id === userId ? (
                      <IconButton component={Link} to={`/episode_edit/${id}`}>
                        <Edit />
                      </IconButton>
                    ) : (
                      <IconButton disabled>
                        <Edit />
                      </IconButton>
                    )}

                    {corderCurrentUser?.id === userId ? (
                      <IconButton
                        onClick={() => {
                          return handleEpisodeDelete(contents)
                        }}
                        sx={{ marginLeft: '16px' }}
                      >
                        <Delete />
                      </IconButton>
                    ) : (
                      <IconButton disabled sx={{ marginLeft: '16px' }}>
                        <Delete />
                      </IconButton>
                    )}
                  </div>
                </AccordionSummary>

                <AccordionDetails>
                  <EpisodeComments
                    corderCurrentUser={corderCurrentUser}
                    episodeComments={episodeComments}
                    handleEpisodeCommentDelete={handleEpisodeCommentDelete}
                  />
                </AccordionDetails>
              </Accordion>
            )
          })}
      </Stack>
    </div>
  )
}

export default EpisodeListCard
