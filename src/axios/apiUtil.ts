import { AxiosInstance } from "axios"

export const tokenRefresh = async (instance: AxiosInstance) => {
  const refreshToken = getRefreshToken() // 리프레시 토큰을 가져오기

  const { data } = await instance.post("/auth/refresh", {
    headers: { "Content-Type": "application/json", refreshToken: `Bearer ${refreshToken}` }
  })

  const newAccessToken = data.accessToken
  //리프레시토큰도 저장 해야함
  localStorage.setItem("jwtToken", newAccessToken) // 세션 스토리지에 액세스 토큰 저장
}

export const getRefreshToken = () => {
  return localStorage.getItem("reToken")
}

export const getAccessToken = () => {
  return localStorage.getItem("jwtToken")
}
