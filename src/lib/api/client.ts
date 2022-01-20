import applyCaseMiddleware from 'axios-case-converter'
import axios from 'axios'

// ヘッダーは無視するオプションを追加
const options = {
  ignoreHeaders: true
}

const client = applyCaseMiddleware(
  axios.create({
    baseURL: 'http://localhost:8080/api/v1'
  }),
  options
)

export default client
