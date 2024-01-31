<template>
  <div class="chat-room-page">
    <div class="chat-messages-container">
      <ChatToolbar :title="title"> </ChatToolbar>
      <ChatMessage :messages="messages" />
    </div>

    <div class="chat-message-input">
      <ChatInput @send:message="sendMessage" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import ChatToolbar from "@/components/chat/ChatToolbar.vue"
import ChatMessage from "@/components/chat/ChatMessage.vue"
import ChatInput from "@/components/chat/ChatInput.vue"
import { requestSendMessage } from "@/axios/chat-service-axios"
import { computed, onMounted, Ref, ref } from "vue"
import { useRoute } from "vue-router"
import SockJS from "sockjs-client"
import { stompClient } from "@/socket/socket-service"
import { getAccessToken } from "@/axios/apiUtil"

const route = useRoute()
const emits = defineEmits(["send:message"])

const title = "채팅방1"
const roomId = ref()

interface IMessage {
  createAt?: string
  msg?: string
  msgType?: string
  readYn?: string
  roomId?: number
  userId?: string
}
const messages: Ref<IMessage[]> = ref([])

const initailize = () => {
  console.log("query.roomId >>> ", route.query.roomId)
  roomId.value = route.query.roomId // 방번호

  const accessToken = getAccessToken()
  const headers: any = { Authorization: accessToken }
  stompClient.connect(
    headers,
    (frame) => {
      // 소켓 연결 성공
      let connected = true
      console.log("소켓 연결 성공", frame)
      // 서버의 메시지 전송 endpoint를 구독합니다.
      // 이런형태를 pub sub 구조라고 합니다.
      stompClient.subscribe("/sub/room/" + roomId.value, (res) => {
        // 새로운 메시지 도착 시 실행되는 콜백 함수
        console.log("구독으로 받은 메시지 입니다.", JSON.parse(res.body).data)

        let response = JSON.parse(res.body).data
        messages.value.push(response)
        console.log("messages >> ", messages)
      })
    },
    (error) => {
      // 소켓 연결 실패
      console.log("소켓 연결 실패", error)
      //connected = false
    }
  )
}

const sendMessage = (msg: String) => {
  // 메세지 전송
  const body = {
    roomId: roomId.value,
    userId: "id3",
    msg: msg,
    msgType: typeof msg == "string" ? "TALK" : "FILE"
  }
  stompClient.send("/pub/chat/" + roomId.value, JSON.stringify(body))
  msg = ""
}

// interface messageItem {
//   isOwn: boolean
//   type: string
//   message: string
//   username: string
// }

// let messages: messageItem[] = [
//   {
//     isOwn: false,
//     username: "",
//     type: "system",
//     message: "혜정 joined"
//   },
//   {
//     isOwn: true,
//     type: "message",
//     message: "안녕 지원",
//     username: "혜정"
//   },
//   {
//     isOwn: false,
//     type: "message",
//     message: "안녕 혜정",
//     username: "지원"
//   }
// ]

onMounted(() => initailize())
</script>

<style lang="scss" scoped>
.chat-room-page {
  .chat-messages-container {
    background: #eeeeee;
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    bottom: 75px;
  }
  .chat-message-input {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0px;
    margin: 10px 0;
    margin-right: 15px;

    .chat-text-input {
      height: 45px;
    }
  }
}
</style>
