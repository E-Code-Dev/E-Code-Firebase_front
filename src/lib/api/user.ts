import client from './client'

const getUser = (id: number) => {
  return client.get(`/users/${id}`)
}

export default getUser
