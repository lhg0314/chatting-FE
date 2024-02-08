<template>
  <div class="chat-room-page">
    <div v-auto-scroll-bottom="messages" class="chat-messages-container" ref="test" @scroll="scrolling">
      <ChatToolbar :roomName="roomName"> </ChatToolbar>
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
import { computed, onMounted, onUnmounted, onUpdated, Ref, ref } from "vue"
import { useRoute } from "vue-router"
//import SockJS from "sockjs-client"
//import { stompClient } from "@/socket/socket-service"
import { getAccessToken, getUserId } from "@/axios/apiUtil"
import { useChatStore } from "@/store/chat/chat"
import { storeToRefs } from "pinia"
import SockJS from "sockjs-client"
import Stomp, { Client } from "webstomp-client"
import { IMessage } from "@/types/chat"

const route = useRoute()
const store = useChatStore()
const { getMessageList } = storeToRefs(store)
const emits = defineEmits(["send:message"])

const test = ref()
const roomId = ref() // 채팅방 번호
const roomName = ref(route.query.roomName) // 채팅방 이름
let stompClient: Client | null = null
const message: Ref<IMessage[]> = ref([]) // 보낸 채팅
const messages = computed(() => [...message.value])

const initailize = async () => {
  console.log("query >>> ", route.query.roomId)
  roomId.value = route.query.roomId

  const accessToken = getAccessToken()
  const headers: any = { Authorization: accessToken }
  const serverURL = "http://localhost:8085/ws"
  let socket = new SockJS(serverURL)
  stompClient = Stomp.over(socket)

  await stompClient.connect(
    headers,
    (frame) => {
      console.log("소켓 연결 성공", frame)
      // 서버의 메시지 전송 endpoint를 구독합니다.
      stompClient.subscribe(
        "/sub/room/" + roomId.value,
        (res) => {
          // 새로운 메시지 도착 시 실행되는 콜백 함수
          console.log("구독으로 받은 메시지 입니다.", JSON.parse(res.body).data)
          message.value.push(JSON.parse(res.body).data)
          console.log("messages >> ", message.value)
        },
        headers
      )
    },
    (error) => {
      console.log("소켓 연결 실패", error)
    }
  )

  await requestMessageList()
  message.value = getMessageList.value
}

// 메세지 조회
const requestMessageList = async () => {
  const body = {
    roomId: roomId.value,
    chatId: 0,
    cnt: 7
  }
  await store.requestMessage(body)
}

// 메세지 전송
const sendMessage = (msg: String) => {
  const userId = getUserId()
  const body = {
    roomId: roomId.value,
    userId: userId,
    message: msg,
    messageType: typeof msg == "string" ? "TALK" : "FILE"
  }
  stompClient.send("/pub/chat/" + roomId.value, JSON.stringify(body))
  msg = ""
}

const scrolling = (event: any) => {
  const scrollHeight = event.target.scrollHeight
  const scrollTop = event.target.scrollTop
  const clientHeight = event.target.clientHeight

  //console.log("aaascrollHeight ", scrollHeight)
  //console.log("aaascrollTop ", scrollTop)
  //console.log("aaaclientHeight ", clientHeight)

  const isAtTheBottom = scrollTop === 0

  if (isAtTheBottom) {
    // setTimeout(() => chatMessage(), 1000)
    // 최상단으로 이동했을때getMessageList
  }
}

onMounted(() => {
  //test.value.addEventListener("scroll", doScroll)
  initailize()
})

onUnmounted(() => {
  console.log("소켓 연결 해제")
  stompClient.disconnect()
})

onUpdated(() => {
  // const div = test.value as HTMLDivElement
  // div.scrollTop = div.scrollHeight
  console.log("onUpdated")
})
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
    overflow-x: scroll;
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
