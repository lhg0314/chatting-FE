import { defineStore } from "pinia"
import { requestChatRoomList } from "@/axios/chat-service-axios"
import { Ref, computed, ref } from "vue"
import { cloneDeep } from "@babel/types"
import { i } from "unplugin-vue-router/dist/options-8dbadba3"

interface IChatRoom {
  roomId?: number
  roomName?: string
}

export const useChatStore = defineStore("chatStore", () => {
  //const chatRoomList = ref(cloneDeep(initChatRoomList))
  const chatRoomList: Ref<IChatRoom[]> = ref([])

  const getChatRoomList = computed(() => chatRoomList.value)

  const requestChatRoom = async (userId: string) => {
    const { data } = await requestChatRoomList(userId)
    console.log("data > ", data)
    chatRoomList.value = data.roomList
    console.log("chatRoomList > ", chatRoomList.value)
  }

  return {
    requestChatRoom,
    getChatRoomList
  }
})
