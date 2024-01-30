import exService from "./base-axios"
import Axios from "axios"

const requestTestApi = async () => {
  // jwt 필요한 api는 exService 사용
  return exService.post("/user/auth/signup", {
    userId: "id333",
    userPw: "1234",
    name: "wldnjs"
  })
}

const requestLogin = () => {
  return Axios.post("/api/user/auth/signin", {
    //로그인등 토큰이 필요없는 요청에서는 공통 사용 X
    userId: "id3",
    userPw: "1234"
  }) //로그인
}

export { requestTestApi, requestLogin }
