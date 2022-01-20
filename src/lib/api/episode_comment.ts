// Axios
import type { AxiosResponse } from 'axios'

// Cookies
import Cookies from 'js-cookie'

import { EpisodeCommentData } from 'src/types/EpisodeCommentData'

import client from './client'

type getEpisodeCommentListData = EpisodeCommentData[]

// エピソード一覧
export const getEpisodeCommentList = (): Promise<AxiosResponse<getEpisodeCommentListData>> => {
  return client.get('/episode_comments')
}

// エピソードコメント新規作成
export const createEpisodeComment = (params: {
  content: string
  episodeId: number
  contributorName: string
  contributorImage: string
}) => {
  return client.post('/episode_comments', params, {
    headers: {
      'access-token': Cookies.get('_access_token') ?? '',
      client: Cookies.get('_client') ?? '',
      uid: Cookies.get('_uid') ?? ''
    }
  })
}

// エピソード削除
export const deleteEpisodeComment = (id: number) => {
  return client.delete(`/episode_comments/${id}`, {
    headers: {
      'access-token': Cookies.get('_access_token') ?? '',
      client: Cookies.get('_client') ?? '',
      uid: Cookies.get('_uid') ?? ''
    }
  })
}
