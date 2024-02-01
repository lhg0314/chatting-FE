export const setNewAccessToken = (accessToken: string): void => {
  console.log(`새로 발급 받은 토큰 : ${accessToken}`)
  localStorage.setItem("accessToken", accessToken)
}

export const getRefreshToken = () => {
  return localStorage.getItem("reToken")
}

export const getAccessToken = () => {
  return localStorage.getItem("accessToken")
}

export const getUserId = () => {
  return localStorage.getItem("userId") || ""
}
