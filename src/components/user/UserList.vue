<template>
  <v-card color="grey-lighten-4" class="mx-auto" max-width="800">
    <v-toolbar color="#42b983" dark>
      <v-toolbar-title>사용자 목록</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn variant="outlined" @click="createGroupChatRoom" v-if="!creatingChat"> 채팅방생성 </v-btn>
      <v-btn class="mr-3" variant="outlined" @click="createGroupChatRoom" v-else> 취소 </v-btn>
      <v-btn variant="outlined" @click="confirmCreateChat" v-if="creatingChat"> 완료 </v-btn>
    </v-toolbar>

    <v-list lines="two">
      <template v-for="(item, index) in items" :key="item.userId">
        <v-list-item>
          <template v-slot:prepend="{ isActive }" v-if="creatingChat">
            <v-list-item-action start>
              <v-checkbox-btn @update:model-value="checkedItem(item)" :model-value="item.isChecked"></v-checkbox-btn>
            </v-list-item-action>
          </template>
          <template v-slot:title>
            <div>{{ item.userName }}({{ item.userId }})</div>
          </template>
          <template v-slot:append>
            <v-btn color="grey-lighten-1" variant="outlined" @click="createChatRoom(item)" v-if="!creatingChat">1:1대화하기</v-btn>
          </template>
        </v-list-item>

        <v-divider v-if="index + 1 < items.length" :key="index"></v-divider>
      </template>
    </v-list>
  </v-card>
</template>

<script setup lang="ts">
import { getUserId } from "@/axios/apiUtil"
import { useUserStore } from "@/store/user/user"
import { User } from "@/types/user"
import { onMounted, Ref, ref } from "vue"
import { useRouter } from "vue-router"

interface UserItem extends User {
  isChecked: boolean
}

const emit = defineEmits(["click:room", "createRoom"])
const router = useRouter()
const store = useUserStore()

const items: Ref<UserItem[]> = ref([])

const creatingChat: Ref<boolean> = ref(false)

// 채팅방으로 이동
const createChatRoom = (item: User) => {
  console.log(item.userId)
  emit("click:room", item)
}

// 채팅방 생성
const createGroupChatRoom = () => {
  items.value.forEach((item) => {
    item.isChecked = false
  })
  creatingChat.value = !creatingChat.value
}

const checkedItem = (user: UserItem) => {
  user.isChecked = !user.isChecked
}

const confirmCreateChat = async () => {
  const selectedUsers = [...items.value.filter(({ isChecked }) => isChecked)]
  if (!selectedUsers.length) {
    alert("사용자를 1명 이상 선택해주세요.")
    return
  }

  emit("createRoom", selectedUsers)
}

const initApi = async () => {
  await store.requestUserList()
}

onMounted(async () => {
  await initApi()
  //자신 제외 후 체크 옵션 추가
  items.value = store
    .getUsers()
    .value.filter(({ userId }) => userId !== getUserId())
    .map((item: User) => ({ ...item, ...{ isChecked: false } }))
})
</script>
