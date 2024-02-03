import { defineStore } from "pinia"
import { requestChatRoomList, requestMessageList } from "@/axios/chat-service-axios"
import { Ref, computed, ref } from "vue"
import { IChatRoom, IMessage, RequestMessageList } from "@/types/chat"

export const useChatStore = defineStore("chatStore", () => {
  const chatRoomList: Ref<IChatRoom[]> = ref([])
  const messageList: Ref<IMessage[]> = ref([])

  const getChatRoomList = computed(() => chatRoomList.value)
  const getMessageList = computed(() => messageList.value)

  // 채팅방 목록 조회
  const requestChatRoom = async (userId: string) => {
    const { data } = await requestChatRoomList(userId)
    console.log("data > ", data)
    chatRoomList.value = data.roomList
    console.log("chatRoomList > ", chatRoomList.value)
  }

  // 채팅메세지 조회
  const requestMessage = async (body: RequestMessageList) => {
    const { data } = await requestMessageList(body)
    console.log("data > ", data)
    messageList.value = data.msgList
  }

  return {
    requestChatRoom,
    requestMessage,
    getChatRoomList,
    getMessageList
  }
})
