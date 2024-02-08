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
    messageList.value = messageList.value.concat(data.msgList)
    console.log("messageList.value", messageList.value)

    const requestBody = {
      // chatId: 이전 목록 리스트에서 마지막 chatId
      roomId: data.msgList[data.msgList.length - 1].roomId,
      chatId: data.msgList[data.msgList.length - 1].chatId,
      cnt: 7
    }
    if (data.nextYn == "Y") {
      await requestMessage(requestBody)
    }
  }

  return {
    requestChatRoom,
    requestMessage,
    getChatRoomList,
    getMessageList
  }
})
