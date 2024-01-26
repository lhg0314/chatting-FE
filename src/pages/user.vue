<template>
  <LoginForm />
</template>

<script lang="ts" setup>
import LoginForm from "@/components/user/LoginForm.vue"
import { onMounted, onUnmounted } from "vue"
import { useRoute, useRouter } from "vue-router"

const router = useRouter()
const route = useRoute()

onMounted(() => {
  console.log("query.name>>>>", route.query.name)
  console.log("query.name", route.query.testKey)
})
</script>
