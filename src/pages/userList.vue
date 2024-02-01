<template>
  <UserList @click:room="joinChatRoom" />
</template>

<script lang="ts" setup>
import UserList from "@/components/user/UserList.vue"
import { useRouter } from "vue-router"

const emits = defineEmits(["click:room"])
const router = useRouter()

const joinChatRoom = (roomId: number) => {
  // 채팅룸으로 이동
  console.log("채팅방 id : ", roomId)
  router.push({ name: "/chatRoom", query: { roomId: roomId } })
}
</script>
