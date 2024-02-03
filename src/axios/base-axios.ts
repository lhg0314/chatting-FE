import { useAppStore } from "@/store/comm"
import Axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios"
import { clearTokenInfo, getAccessToken, setNewAccessToken } from "./apiUtil"

const defaultOption = {
  error: true,
  loading: true,
  useToken: true
}

export default (
  options: AxiosOption = defaultOption,
  requestInterceptor: ((value: InternalAxiosRequestConfig) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>) | null = null,
  responseInterceptor: ((value: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>) | null = null,
  baseURL = "http://localhost:8085",
  timeout = 5000
) => {
  const instance = Axios.create({
    baseURL,
    timeout
  })
  const _options = { ...defaultOption, ...options }
  const store = useAppStore()

  // 토큰 사용 요청 인터셉터
  const useTokenRequestInterceptor = (config: InternalAxiosRequestConfig) => {
    console.log("요청실행")
    if (_options.loading) {
      store.setIsLoading(true)
    }
    if (!_options.useToken) return config
    const accessToken = getAccessToken()

    if (!accessToken) {
      window.location.href = "/signin"
      return config
    }

    config.headers["Content-Type"] = "application/json"
    config.headers["Authorization"] = `Bearer ${accessToken}`

    return config
  }

  // 토큰 사용 응답 인터셉터
  const useTokenResponseInterceptor = (response: AxiosResponse) => {
    if (_options.loading) {
      store.setIsLoading(false)
    }
    if (!_options.useToken) return response

    const token = response.headers["authorization"]

    console.log("Api Response : " + token)
    if (token !== undefined && token !== null) {
      setNewAccessToken(token.split(" ")[1])
    }

    if (response.data.code === "C008") {
      clearTokenInfo()
      alert("토큰 만료! 로그인 페이지로 이동합니다 !")
      window.location.href = "/signin"
    }

    return response
  }

  instance.interceptors.request.use(requestInterceptor || useTokenRequestInterceptor, (error) => {
    store.setIsLoading(false)
  })
  instance.interceptors.response.use(responseInterceptor || useTokenResponseInterceptor, ({ response }) => {
    console.log("interceptor option > ", _options)

    if (_options.error) alert(response.data.message)
    store.setIsLoading(false)
    return Promise.reject(response.data)
  })

  return instance
}
