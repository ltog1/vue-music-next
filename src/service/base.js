import axios from 'axios'
import axiosRetry from 'axios-retry' // 失败重新请求插件

axiosRetry(axios, { retries: 5 })

const ERR_OK = 0
const baseURL = process.env.NODE_ENV === 'production' ? 'http://ltog1.com/vue-music-next/' : '/'

axios.defaults.baseURL = baseURL

export function get(url, params) {
  return axios.get(url, {
    params
  }).then((res) => {
    const { data } = res;
    if (data.code === ERR_OK) {
      return data.result
    }
  }).catch((e) => {
    console.log(e)
  })
}
