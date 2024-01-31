import _userService from "./base-axios"
import Axios, { AxiosResponse } from "axios"
import { RequestSignIn, ResponseSignIn } from "@/types/user"
//토큰 필요없는 axios instance 사용
const userService = _userService(null, null)

const requestTestApi = async () => {
  // jwt 필요한 api는 exService 사용
  return userService.post("/user/auth/signup", {
    userId: "id333",
    userPw: "1234",
    name: "wldnjs"
  })
}

const requestSignIn = async (body: RequestSignIn): Promise<BaseRes<ResponseSignIn>> => {
  const { data } = await userService.post("/user/auth/signin", body) //로그인
  return data
}

export { requestTestApi, requestSignIn }
