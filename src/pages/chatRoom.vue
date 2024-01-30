<template>
  <div class="chat-room-page">
    <div class="chat-messages-container">
      <ChatToolbar :title="title"> </ChatToolbar>
      <ChatMessage :messages="messages" />
    </div>

    <div class="chat-message-input">
      <ChatInput />
    </div>
  </div>
</template>

<script lang="ts" setup>
import ChatToolbar from "@/components/chat/ChatToolbar.vue"
import ChatMessage from "@/components/chat/ChatMessage.vue"
import ChatInput from "@/components/chat/ChatInput.vue"
import { computed, onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import Stomp from "webstomp-client"
import SockJS from "sockjs-client"

const route = useRoute()
const title = "채팅방1"

const initailize = () => {
  console.log("query.roomId >>> ", route.query.roomId)
  const roomId = ref(route.query.roomId) // 방번호

  const serverURL = "http://localhost:8085/ws"
  let socket = new SockJS(serverURL)
  const stompClient = Stomp.over(socket)
  let connected = false
  console.log(`소켓 연결을 시도합니다. 서버 주소: ${serverURL}`)
  stompClient.connect(
    {},
    (frame) => {
      // 소켓 연결 성공
      const connected = true
      console.log("소켓 연결 성공", frame)
      // 서버의 메시지 전송 endpoint를 구독합니다.
      // 이런형태를 pub sub 구조라고 합니다.
      stompClient.subscribe("/sub/room/" + roomId.value, (res) => {
        console.log("구독으로 받은 메시지 입니다.", res.body)

        // 받은 데이터를 json으로 파싱하고 리스트에 넣어줍니다.
        // recvList.push(JSON.parse(res.body))
      })
    },
    (error) => {
      // 소켓 연결 실패
      console.log("소켓 연결 실패", error)
      connected = false
    }
  )
}

interface messageItem {
  isOwn: boolean
  type: string
  message: string
  username: string
}

let messages: messageItem[] = [
  {
    isOwn: false,
    username: "",
    type: "system",
    message: "혜정 joined"
  },
  {
    isOwn: true,
    type: "message",
    message: "안녕 지원",
    username: "혜정"
  },
  {
    isOwn: false,
    type: "message",
    message: "안녕 혜정",
    username: "지원"
  }
]

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
