import Axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios"
import { getAccessToken, setNewAccessToken } from "./apiUtil"

// 토큰 사용 요청 인터셉터
const useTokenRequestInterceptor = (config: InternalAxiosRequestConfig) => {
  console.log("요청실행")
  const accessToken = getAccessToken()

  if (!accessToken) {
    alert("로그인이 필요한 서비스입니다.")
    window.location.href = "/"
    return config
  }

  config.headers["Content-Type"] = "application/json"
  config.headers["Authorization"] = `Bearer ${accessToken}`

  return config
}

// 토큰 사용 응답 인터셉터
const useTokenResponseInterceptor = (response: AxiosResponse) => {
  console.log("Api Response : " + response.headers["authorization"])
  if ((response.headers["authorization"] !== undefined, null)) {
    setNewAccessToken(response.headers["authorization"].split(" ")[1])
  }

  console.log(response.data)

  if (response.data.code === "C008") {
    alert("토큰 만료! 로그인 페이지로 이동합니다 !")
    window.location.href = "/"
  }
  return response
}

const defaultOption = {
  error: true
}

export default (
  requestInterceptor:
    | ((value: InternalAxiosRequestConfig) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>)
    | null = useTokenRequestInterceptor,
  responseInterceptor: ((value: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>) | null = useTokenResponseInterceptor,
  options: AxiosOption = defaultOption,
  baseURL = "http://localhost:8085",
  timeout = 5000
) => {
  const instance = Axios.create({
    baseURL,
    timeout
  })

  const _options = { ...defaultOption, ...options }

  instance.interceptors.request.use(requestInterceptor)
  instance.interceptors.response.use(responseInterceptor, ({ response }) => {
    console.log("interceptor option > ", _options)

    if (_options.error) alert(response.data.message)
    return Promise.reject(response.data)
  })

  return instance
}
