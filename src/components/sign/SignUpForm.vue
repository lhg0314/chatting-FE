<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <v-card class="pa-4 ma-14" title="Sign up">
        <v-card-item>
          <v-form ref="form">
            <v-text-field ref="idInput" v-model="id" :counter="10" label="ID"></v-text-field>
            <v-text-field
              v-model="pw"
              :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
              :type="visible ? 'text' : 'password'"
              label="PASSWORD"
              @click:append-inner="visible = !visible"
            ></v-text-field>
            <v-text-field v-model="name" :counter="10" label="NAME"></v-text-field>

            <div class="d-flex flex-column">
              <v-btn color="success" class="mt-4" block @click="onClickLogin"> Sign up </v-btn>
            </div>
            <div class="mt-3 d-flex flex-column">
              <v-btn variant="text" @click="onChangeSignIn"> Sign in <v-icon icon="mdi mdi-chevron-right"></v-icon></v-btn>
            </div>
          </v-form>
        </v-card-item>
      </v-card>
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
import { useSignStore } from "@/store/sign/sign"
import { mixedTypeAnnotation } from "@babel/types"
import { onMounted, Ref, ref } from "vue"
import { useRouter } from "vue-router"
import { VTextField } from "vuetify/lib/components/index.mjs"

const emit = defineEmits(["changeStatus"])

const store = useSignStore()
const router = useRouter()

const idInput: Ref<VTextField | null> = ref(null)

const id = ref("")
const pw = ref("")
const name = ref("")

const visible = ref(false)

const onClickLogin = async () => {
  console.log("id", id.value)
  console.log("pw", pw.value)
  console.log("name", name.value)
  try {
    await store.requestJoin({ userId: id.value, userPw: pw.value, name: name.value })
    alert("회원가입이 완료되었습니다. 로그인해주세요")
    onChangeSignIn()
  } catch (error: any) {
    if (error.code === "C007") {
      idInput.value?.focus()
    }
  }
}

const onChangeSignIn = () => {
  router.back()
}

onMounted(() => {
  idInput.value?.focus()
})
</script>
