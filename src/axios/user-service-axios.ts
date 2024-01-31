import _userService from "./base-axios"
import Axios, { AxiosResponse } from "axios"
import { RequestSignIn, RequestSignUp, ResponseSignIn, ResponseSignUp } from "@/types/user"
//토큰 필요없는 axios instance 사용
const userService = _userService(null, null)

const requestSignUp = async (body: RequestSignUp): Promise<BaseRes<ResponseSignUp>> => {
  const { data } = await userService.post("/user/auth/signup", body)
  return data
}

const requestSignIn = async (body: RequestSignIn): Promise<BaseRes<ResponseSignIn>> => {
  const { data } = await userService.post("/user/auth/signin", body) //로그인
  return data
}

export { requestSignIn, requestSignUp }
