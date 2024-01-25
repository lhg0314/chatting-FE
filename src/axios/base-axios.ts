import Axios from "axios"
import { getAccessToken, tokenRefresh } from "./apiUtil"

const instance = Axios.create({
  withCredentials: true,
  baseURL: "http://localhost:3000/api",
  timeout: 5000
})

instance.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken()

    if (!accessToken) {
      window.location.href = "/"
      return config
    }

    config.headers["Content-Type"] = "application/json"
    config.headers["Authorization"] = `Bearer ${accessToken}`

    return config
  },
  (error: any) => {
    console.log(error)
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    console.log(error.response)
    console.log(Number(error.response?.status) / 100)
    if (error.response?.status < 500 && error.response?.status >= 400) {
      alert(`${error.response.data.code} == ${error.response.data.message}`)
    }
    if (error.response?.status === 401) {
      window.location.href = "/unauthorized"
    } else if (error.response?.status === 404) {
      window.location.href = "/notFound"
    } else if (error.response && error.response?.status === 500) {
      const errorCode = error.response.data.code
      if (errorCode === 7001) {
        await tokenRefresh(instance)
        const accessToken = getAccessToken()
        error.config.headers.Authorization = `Bearer ${accessToken}`
        // 중단된 요청을(에러난 요청)을 토큰 갱신 후 재요청
        return instance(error.config)
      }
    }
  }
)

export default instance
