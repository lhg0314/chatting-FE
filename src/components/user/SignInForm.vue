<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <v-card class="pa-4 ma-14" title="Sign in">
        <v-card-item>
          <v-form ref="form">
            <v-text-field v-model="id" :counter="10" label="ID"></v-text-field>
            <v-text-field v-model="pw" :counter="12" label="PASSWORD"></v-text-field>
            <!-- <v-text-field v-model="name" :counter="10" label="NAME"></v-text-field> -->

            <div class="d-flex flex-column">
              <v-btn color="success" class="mt-4" block @click="onClickLogin"> Sign in </v-btn>
            </div>
            <div class="mt-3 d-flex flex-column">
              <a href="#" class="text-body-2 font-weight-regular">Sign up ></a>
            </div>
          </v-form>
        </v-card-item>
      </v-card>
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
import { useUserStore } from "@/store/user/login"
import { onMounted, ref } from "vue"
import { useRouter } from "vue-router"
const id = ref("")
const pw = ref("")

const store = useUserStore()
const router = useRouter()

const onClickLogin = async () => {
  await store.apiSignInFn({ userId: id.value, userPw: pw.value })
  router.push({
    name: "/chatHome"
  })
}

onMounted(() => {
  console.log("init")
})
</script>
