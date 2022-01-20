import { EpisodeCommentData } from './EpisodeCommentData'

export type EpisodeData = {
  id: number
  content: string
  contributorName: string
  contributorImage: string
  episodeComments: Array<EpisodeCommentData> | null
  userId: number

  createdAt: Date
  updatedAt: Date
}
