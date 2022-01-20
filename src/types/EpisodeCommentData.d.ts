export type EpisodeCommentData = {
  id: number
  content: string
  contributorName: string
  contributorImage: string

  userId: number
  episodeId: number

  createdAt: Date
  updatedAt: Date
}
