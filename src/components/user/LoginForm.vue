<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <v-card class="ma-14" title="LOGIN">
        <v-card-item>
          <v-form ref="form">
            <v-text-field v-model="id" :counter="10" label="ID"></v-text-field>
            <v-text-field v-model="pw" :counter="10" label="PASSWORD"></v-text-field>
            <v-text-field v-model="name" :counter="10" label="NAME"></v-text-field>

            <div class="d-flex flex-column">
              <v-btn color="success" class="mt-4" block @click="onClickLogin"> 로그인 </v-btn>
            </div>
            <div class="d-flex flex-column">
              <v-btn color="error" class="mt-4" block @click="onClickLogin"> 회원가입 </v-btn>
            </div>
          </v-form>
        </v-card-item>
      </v-card>
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
const id = ref("")
const pw = ref("")
const name = ref("")

const onClickLogin = () => {
  console.log("id", id.value)
  console.log("pw", pw.value)
  console.log("name", name.value)
}

onMounted(() => {
  console.log("init")
})
</script>
