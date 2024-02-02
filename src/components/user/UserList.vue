<template>
  <v-card color="grey-lighten-4" class="mx-auto" max-width="800">
    <v-toolbar color="#42b983" dark>
      <v-toolbar-title>사용자 목록</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn icon @click="createGroupChatRoom">
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
    </v-toolbar>

    <v-list lines="two">
      <template v-for="(item, index) in items" :key="item.userId">
        <v-list-item>
          <template v-slot:title>
            <div v-html="item.userName"></div>
          </template>
          <template v-slot:append>
            <v-btn color="grey-lighten-1" variant="outlined" @click="createChatRoom(item)">1:1대화하기</v-btn>
          </template>
        </v-list-item>

        <v-divider v-if="index + 1 < items.length" :key="index"></v-divider>
      </template>
    </v-list>
  </v-card>
</template>

<script setup lang="ts">
import { useUserStore } from "@/store/user/user"
import { User } from "@/types/user"
import { onMounted, Ref, ref } from "vue"

interface ChatItem {
  id: string
  roomName: string
}

const emit = defineEmits(["click:room"])

const store = useUserStore()

const items: Ref<User[]> = ref([])

// 채팅방으로 이동
const createChatRoom = (item: User) => {
  console.log(item.userId)
  emit("click:room", item.userId)
}

// 채팅방 생성
const createGroupChatRoom = () => {
  console.log("사용자 선택 채팅방 생성")
}

const initApi = async () => {
  await store.requestUserList()
}

onMounted(async () => {
  await initApi()
  items.value = store.getUsers().value
})
</script>
