<template>
  <v-card color="grey-lighten-4" class="mx-auto" max-width="800">
    <v-toolbar color="#42b983" dark>
      <v-toolbar-title>채팅방 목록</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn variant="outlined" @click="modifyList"> {{ modifyMode ? "취소" : "편집" }} </v-btn>
    </v-toolbar>

    <v-list lines="two">
      <v-hover></v-hover>
      <v-list-item v-for="item in roomList" :key="item.roomName" @click="joinChatRoom(item)">
        <template v-slot:prepend v-if="modifyMode">
          <v-list-item-action start>
            <!-- <v-btn :model-value="isActive"></v-btn> -->
            <v-btn @click="deleteChatting(item)" color="red" icon="mdi mdi-trash-can-outline" size="small"></v-btn>
          </v-list-item-action>
        </template>
        <template v-slot:title>
          <div v-html="item.roomName"></div>
        </template>
        <template v-slot:subtitle>
          <div v-html="item.lastMessage"></div>
        </template>
        <template v-slot:append>
          <v-chip v-if="item.unreadMessages" variant="flat" color="red" size="x-small"> {{ item.unreadMessages }} </v-chip>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup lang="ts">
import { useChatStore } from "@/store/chat/chat"
import { storeToRefs } from "pinia"
import { computed, onMounted, onUnmounted, Ref, ref } from "vue"
import { IChatRoom } from "@/types/chat"
import { useRouter } from "vue-router"
import { getAccessToken, getUserId } from "@/axios/apiUtil"
import { requestDeleteChatting } from "@/axios/chat-service-axios"
import Stomp, { Client } from "webstomp-client"
import SockJS from "sockjs-client"

const emit = defineEmits(["click:room"])

const router = useRouter()
const store = useChatStore()
const { getChatRoomList } = storeToRefs(store)
const roomName = ref("")

let requestInterv: null | NodeJS.Timeout = null

const initailize = async () => {
  const userId: string = getUserId()
  await store.requestChatRoom(userId)
  requestInterv = setInterval(async () => {
    await store.requestChatRoom(userId) // 채팅방 목록
  }, 3000)
}

const roomList = computed(() => getChatRoomList.value)

const modifyMode: Ref<boolean> = ref(false)

let stompClient: Client | null = null

// 채팅방으로 이동
const joinChatRoom = (item: IChatRoom) => {
  if (!modifyMode.value) emit("click:room", item.roomId, item.roomName)
  console.log(item.roomId, item.roomName)
}

const deleteChatting = async (item: IChatRoom) => {
  if (confirm(`"${item.roomName}" 채팅을 삭제하시겠습니까?`)) {
    console.log("소켓연결")
    await requestDeleteChatting({ userId: getUserId(), roomId: item.roomId, roomState: "N" })
    await connSocket(item.roomId)
    console.log("소켓 연결 해제")
    stompClient?.disconnect()
  }
}

const connSocket = (roomId: number) => {
  const accessToken = getAccessToken()
  const headers: any = { Authorization: accessToken }
  const serverURL = "http://localhost:8085/ws"
  let socket = new SockJS(serverURL)
  stompClient = Stomp.over(socket)

  return new Promise((resolve, reject) => {
    stompClient?.connect(
      headers,
      (frame) => {
        console.log("소켓 연결 성공", frame)
        // 퇴장(삭제)메세지
        const body = {
          roomId: roomId,
          userId: getUserId(),
          message: "",
          messageType: "EXIT"
        }
        stompClient?.send("/pub/chat/" + roomId, JSON.stringify(body))
      },
      async (error: any) => {
        if (error.body !== undefined) {
          console.log("소켓 연결 실패", JSON.parse(error.body))
          const resErr = JSON.parse(error.body)
          if (resErr?.code === "C008") {
            await store.requestChatRoom(getUserId()) // access 토큰 만료되면  API조회 (accessToken 재발급)
            await connSocket(roomId)
          }
        }
      }
    )
  }).then(async () => {
    alert("연결실패 다시 시도해주세요.")
  })
}

const modifyList = () => {
  modifyMode.value = !modifyMode.value
}

onMounted(() => initailize())

onUnmounted(() => {
  if (requestInterv) clearInterval(requestInterv)
})

// interface ChatItem {
//   id: string
//   avatar: string
//   roomName: string
// }

// let items: ChatItem[] = [
//   {
//     id: "1",
//     avatar: "https://picsum.photos/250/300?image=660",
//     roomName: "채팅방1"
//   },
//   {
//     id: "2",
//     avatar: "https://picsum.photos/250/300?image=821",
//     roomName: "채팅방2"
//   },
//   {
//     id: "3",
//     avatar: "https://picsum.photos/250/300?image=783",
//     roomName: "채팅방3"
//   },
//   {
//     id: "4",
//     avatar: "https://picsum.photos/250/300?image=1006",
//     roomName: "채팅방4"
//   }
// ]
</script>
