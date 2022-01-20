// Axios
import type { AxiosResponse } from 'axios'

// Cookies
import Cookies from 'js-cookie'

import client from './client'

// Types
import type { EpisodeData } from '../../types/EpisodeData'

type getEpisodeListData = EpisodeData[]

// エピソード一覧
export const getEpisodeList = (): Promise<AxiosResponse<getEpisodeListData>> => {
  return client.get('/episodes')
}

// エピソード詳細
export const getEpisodeDetail = (id: string): Promise<AxiosResponse<EpisodeData>> => {
  return client.get(`/episodes/${id}`)
}

// エピソード新規作成
export const createEpisode = (params: {
  content: string
  contributorName: string
  contributorImage: string
}) => {
  return client.post('/episodes', params, {
    headers: {
      'access-token': Cookies.get('_access_token') ?? '',
      client: Cookies.get('_client') ?? '',
      uid: Cookies.get('_uid') ?? ''
    }
  })
}

// エピソード更新
export const updateEpisode = ({ id, params }: { id: string; params: { content: string } }) => {
  return client.patch(`/episodes/${id}`, params, {
    headers: {
      'access-token': Cookies.get('_access_token') ?? '',
      client: Cookies.get('_client') ?? '',
      uid: Cookies.get('_uid') ?? ''
    }
  })
}

// エピソード削除
export const deleteEpisode = (id: number) => {
  return client.delete(`/episodes/${id}`, {
    headers: {
      'access-token': Cookies.get('_access_token') ?? '',
      client: Cookies.get('_client') ?? '',
      uid: Cookies.get('_uid') ?? ''
    }
  })
}
