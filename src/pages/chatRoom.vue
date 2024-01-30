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

const route = useRoute()
const title = "채팅방1"

const initailize = () => {
  console.log("query.roomId >>> ", route.query.roomId)
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
