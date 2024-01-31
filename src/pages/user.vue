<template>
  <SignInForm v-if="status === 'signIn'" />
  <SignUpForm v-else />
</template>

<script lang="ts" setup>
import SignInForm from "@/components/user/SignInForm.vue"
import SignUpForm from "@/components/user/SignUpForm.vue"
import { onMounted, onUnmounted, Ref, ref } from "vue"
import { useRoute, useRouter } from "vue-router"

const router = useRouter()
const route = useRoute()

const status: Ref<string> = ref("signIn")

const changeStatus = (value: string) => {
  status.value = value
}

onMounted(() => {
  console.log("query.name>>>>", route.query.name)
  console.log("query.name", route.query.testKey)
})
</script>
