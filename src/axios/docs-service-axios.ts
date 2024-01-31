import _useTokenService from "./base-axios"
import _nonTokenService from "./base-axios"
import Axios from "axios"

//기본 request interceptor 사용 O
// 기본 response interceptor 사용 O
const tokenService = _useTokenService()
// request interceptor 사용 X
// response interceptor 사용 X
const nonTokenService = _nonTokenService(null, null)

const requestTestApi = async () => {
  // jwt 필요한 api는 exService 사용
  return tokenService.post("/user/auth/signup", {
    userId: "id4333",
    userPw: "41234",
    name: "test"
  })
}

const requestLogin = () => {
  return nonTokenService.post("/user/auth/signin", {
    //로그인등 토큰이 필요없는 요청에서는 공통 사용 X
    userId: "id3",
    userPw: "1234"
  }) //로그인
}

const requestUserList = () => {
  return tokenService.get("/user/list")
}

export { requestTestApi, requestLogin, requestUserList }
