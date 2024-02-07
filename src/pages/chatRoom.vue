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
import { computed, onMounted, onUpdated, Ref, ref } from "vue"
import { useRoute } from "vue-router"
import SockJS from "sockjs-client"
import { stompClient } from "@/socket/socket-service"
import { getAccessToken, getUserId } from "@/axios/apiUtil"
import { useChatStore } from "@/store/chat/chat"
import { storeToRefs } from "pinia"

const route = useRoute()
const store = useChatStore()
const { getMessageList } = storeToRefs(store)
const emits = defineEmits(["send:message"])

const roomId = ref() // 채팅방 번호
const roomName = ref(route.query.roomName) // 채팅방 이름
const test = ref()

interface IMessage {
  createAt?: string
  msg?: string
  msgType?: string
  readYn?: string
  roomId?: number
  userId?: string
}
const message: Ref<IMessage[]> = ref([])
const messages = computed(() => [...message.value])

const initailize = async () => {
  console.log("query >>> ", route.query)
  roomId.value = route.query.roomId
  //roomName.value = route.query.roomName

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
      // 소켓 연결 실패
      console.log("소켓 연결 실패", error)
      //connected = false
    }
  )

  await initApi()
  message.value = getMessageList.value
}

const initApi = async () => {
  // 채팅메세지 조회
  const body = {
    roomId: roomId.value,
    chatId: 0,
    cnt: 7
  }
  await store.requestMessage(body)
}

const sendMessage = (msg: String) => {
  // 메세지 전송
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

const scrolling = (event: any) => {
  const scrollHeight = event.target.scrollHeight
  const scrollTop = event.target.scrollTop
  const clientHeight = event.target.clientHeight

  console.log("aaascrollHeight ", scrollHeight)
  console.log("aaascrollTop ", scrollTop)
  console.log("aaaclientHeight ", clientHeight)

  const isAtTheBottom = scrollTop === 0

  if (isAtTheBottom) {
    // setTimeout(() => chatMessage(), 1000)
    // 최상단으로 이동했을때
  }
}

onMounted(() => {
  //test.value.addEventListener("scroll", doScroll)
  initailize()
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
