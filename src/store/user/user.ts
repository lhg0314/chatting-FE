import { defineStore } from "pinia"
import { requestSignIn, requestSignUp } from "@/axios/user-service-axios"
import { RequestSignIn, RequestSignUp } from "@/types/user"

export const useUserStore = defineStore("userStore", () => {
  const requestLogin = async (value: RequestSignIn) => {
    const { data } = await requestSignIn(value)

    localStorage.setItem("accessToken", data.accessToken)
    localStorage.setItem("name", data.name)
    localStorage.setItem("userId", data.id)
  }

  const requestJoin = async (body: RequestSignUp) => {
    const { data } = await requestSignUp(body)
  }

  return {
    requestLogin,
    requestJoin
  }
})
