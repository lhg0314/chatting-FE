import _userService from "./base-axios"
import Axios, { AxiosResponse } from "axios"
import { ResponseUserList } from "@/types/user"
//토큰 필요없는 axios instance 사용
const userService = _userService()

const getUserList = async (): Promise<BaseRes<ResponseUserList>> => {
  const { data } = await userService.get("/user/list")
  return data
}

export { getUserList }
