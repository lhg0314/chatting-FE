<template>
  <v-app-bar flat>
    <v-app-bar-title>
      <v-icon icon="mdi mdi-chat" />
      Chatting
    </v-app-bar-title>
    <template v-slot:append>
      <v-btn v-if="store.getIsMember().value" variant="outlined" @click="logout">로그아웃</v-btn>
    </template>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { clearTokenInfo } from "@/axios/apiUtil"
import { useAppStore } from "@/store/comm"
import { useRouter } from "vue-router"
const store = useAppStore()
const router = useRouter()

const logout = () => {
  clearTokenInfo()
  router.push({
    name: "/signIn"
  })
}
</script>
