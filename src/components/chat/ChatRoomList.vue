<template>
  <v-card color="grey-lighten-4" class="mx-auto" max-width="800">
    <v-toolbar color="#42b983" dark>
      <v-toolbar-title>채팅방 목록</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn icon @click="createChatRoom">
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
    </v-toolbar>

    <v-list lines="two">
      <v-list-item v-for="item in roomList" :key="item.roomName" :prepend-avatar="item.avatar" ripple @click="joinChatRoom(item)">
        <template v-slot:title>
          <div v-html="item.roomName"></div>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup lang="ts">
import { useChatStore } from "@/store/chat/chat"
import { storeToRefs } from "pinia"
import { computed, onMounted, ref } from "vue"
import { IChatRoom } from "@/types/chat"

const emit = defineEmits(["click:room"])

const store = useChatStore()
const { getChatRoomList } = storeToRefs(store)
const roomName = ref("")
const userId: string = "id3"

const initailize = async () => {
  await store.requestChatRoom(userId) // 채팅방 목록
}

const roomList = computed(() => getChatRoomList.value)

// 채팅방으로 이동
const joinChatRoom = (item: IChatRoom) => {
  emit("click:room", item.roomId)
  console.log(item.roomId)
}

// 채팅방 생성
const createChatRoom = () => {
  console.log("채팅방 생성")
}

onMounted(() => initailize())

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
