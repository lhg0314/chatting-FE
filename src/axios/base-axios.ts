import Axios from "axios"
import { getAccessToken, setNewAccessToken } from "./apiUtil"

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

instance.interceptors.response.use((response) => {
  console.log("Api Response : " + response.headers["authorization"])
  if ((response.headers["authorization"] !== undefined, null)) {
    setNewAccessToken(response.headers["authorization"].split(" ")[1])
  }

  console.log(response.data)

  if (response.data.code === "C008") {
    alert("토큰 만료! 로그인 페이지로 이동합니다 !")
  }
  return response
})

export default instance
