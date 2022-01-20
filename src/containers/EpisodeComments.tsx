import { useState } from 'react'
import type { VFC } from 'react'

// Firebase
import { storage } from '@lib/firebase'
import { getDownloadURL, ref } from 'firebase/storage'

// Mui
import { Avatar, IconButton, Stack } from '@mui/material'
import { Delete } from '@mui/icons-material'

// Interfaces
import { CorderUser } from '@interfaces/index'

// Styles
import {
  CommentContent,
  CommentContentDate,
  CommentContributorInfoName,
  ContributorInfo
} from '@styles/episodeListCard'

// Types
import { EpisodeCommentData } from '../types/EpisodeCommentData'

type EpisodeCommentsProps = {
  episodeComments: EpisodeCommentData[] | null | undefined
  handleEpisodeCommentDelete: (data: EpisodeCommentData) => Promise<void>
  corderCurrentUser: CorderUser | undefined
}
const EpisodeComments: VFC<EpisodeCommentsProps> = (props) => {
  const { episodeComments, handleEpisodeCommentDelete, corderCurrentUser } = props

  const [contributorAvator, setContributorAvator] = useState('')

  return (
    <div>
      <Stack spacing={2}>
        {episodeComments &&
          episodeComments.slice(-5).map((data: EpisodeCommentData) => {
            const { id, content, contributorName, contributorImage, createdAt, userId } = data
            const date = createdAt
              .toString()
              .replace('T', ' ')
              .split('.')
              .shift()
              ?.replace(/-/g, '/')

            const storageRef = ref(storage, contributorImage)

            getDownloadURL(storageRef)
              .then((url) => {
                setContributorAvator(url)
              })
              .catch(() => {
                // Handle any errors
              })
            return (
              <div key={id}>
                <div>
                  <ContributorInfo>
                    <Avatar src={contributorAvator} alt="コメント投稿者のアバター" />
                    <CommentContributorInfoName>{contributorName}</CommentContributorInfoName>
                  </ContributorInfo>
                  <CommentContent>{content}</CommentContent>
                  <CommentContentDate>{date}</CommentContentDate>
                </div>
                {corderCurrentUser?.id === userId ? (
                  <IconButton
                    onClick={() => {
                      return handleEpisodeCommentDelete(data)
                    }}
                  >
                    <Delete />
                  </IconButton>
                ) : (
                  <IconButton disabled>
                    <Delete />
                  </IconButton>
                )}
              </div>
            )
          })}
      </Stack>
    </div>
  )
}

export default EpisodeComments
