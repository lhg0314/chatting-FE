import { defineStore } from "pinia"
import { ResponseUserList, User } from "@/types/user"
import { getUserList } from "@/axios/user-service-axios"
import { computed, ref, Ref } from "vue"

export const useUserStore = defineStore("userStore", () => {
  const users: Ref<User[]> = ref([])

  const requestUserList = async () => {
    const { data } = await getUserList()

    users.value = data.list
  }

  const getUsers = () => computed(() => users.value)

  //   const requestLogin = async (value: RequestSignIn) => {
  return {
    requestUserList,
    getUsers
  }
})
