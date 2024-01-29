<template>
  <v-card color="grey-lighten-4" class="mx-auto" max-width="800">
    <v-toolbar color="#42b983" dark>
      <v-toolbar-title>채팅방 목록</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
    </v-toolbar>

    <v-list lines="two">
      <v-list-item v-for="item in items" :key="item.roomName" :prepend-avatar="item.avatar" ripple @click="joinChatRoom(item)">
        <template v-slot:title>
          <div v-html="item.roomName"></div>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup lang="ts">
const emit = defineEmits(["click:room"])

interface ChatItem {
  id: string
  avatar: string
  roomName: string
}

let items: ChatItem[] = [
  {
    id: "1",
    avatar: "https://picsum.photos/250/300?image=660",
    roomName: "채팅방1"
  },
  {
    id: "2",
    avatar: "https://picsum.photos/250/300?image=821",
    roomName: "채팅방2"
  },
  {
    id: "3",
    avatar: "https://picsum.photos/250/300?image=783",
    roomName: "채팅방3"
  },
  {
    id: "4",
    avatar: "https://picsum.photos/250/300?image=1006",
    roomName: "채팅방4"
  }
]

// 채팅방으로 이동
const joinChatRoom = (item: ChatItem) => {
  emit("click:room", item.id)
  console.log(item.id)
}
</script>
