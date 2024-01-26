<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <v-tooltip text="Tooltip">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" @click="testFn">임시로그인</v-btn>
            </template>
          </v-tooltip>
        </v-col>
        <v-col cols="auto">
          <v-btn href="" min-width="164" rel="noopener noreferrer" target="_blank" variant="text" @click="testFn3">
            <v-icon icon="mdi-view-dashboard" size="large" start />
            로컬스토리지비우기
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <v-btn href="" min-width="164" rel="noopener noreferrer" target="_blank" variant="text" @click="testFn2">
            <v-icon icon="mdi-view-dashboard" size="large" start />

            signup
          </v-btn>
        </v-col>

        <v-col cols="auto">
          <v-btn href="" min-width="164" rel="noopener noreferrer" target="_blank" variant="text" @click="onClickRoomList">
            <v-icon icon="mdi-view-dashboard" size="large" start />
            ChatRoom
          </v-btn>
        </v-col>

        <v-col cols="auto">
          <v-btn href="" min-width="164" rel="noopener noreferrer" target="_blank" variant="text" @click="testFn4">
            <v-icon icon="mdi-view-dashboard" size="large" start />
            user(로그인/회원가입)
          </v-btn>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
import { useAppStore } from "@/store/docs"
import { useRoute, useRouter } from "vue-router"

const router = useRouter()
const route = useRoute()

const store = useAppStore()

const testFn = () => {
  store.requestLoginFunction()
}
const testFn2 = () => {
  store.requestJoinFunction()
}
const testFn3 = () => {
  localStorage.clear()
}
const testFn4 = () => {
  router.push({
    name: "/user",
    query: { name: "Query방식", testKey: "testValue" }
  })
}

const onClickRoomList = () => {
  router.push({
    name: "/chatHome"
  })
}
</script>
