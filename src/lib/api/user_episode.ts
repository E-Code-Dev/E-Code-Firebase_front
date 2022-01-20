import { AxiosResponse } from 'axios'
import Cookies from 'js-cookie'
import { EpisodeData } from 'src/types/EpisodeData'

import client from './client'

type getEpisodeListData = EpisodeData[]

const getUserEpisodes = (id: number): Promise<AxiosResponse<getEpisodeListData>> => {
  return client.get(`/user_episodes/${id}`, {
    headers: {
      'access-token': Cookies.get('_access_token') ?? '',
      client: Cookies.get('_client') ?? '',
      uid: Cookies.get('_uid') ?? ''
    }
  })
}

export default getUserEpisodes
