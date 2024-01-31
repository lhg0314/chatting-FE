import { defineStore } from "pinia"
import { requestSignIn } from "@/axios/user-service-axios"
import { RequestSignIn } from "@/types/user"

export const useUserStore = defineStore("userStore", () => {
  const apiSignInFn = async (value: RequestSignIn) => {
    const { data } = await requestSignIn(value)

    localStorage.setItem("accessToken", data.accessToken)
  }

  return {
    apiSignInFn
  }
})
