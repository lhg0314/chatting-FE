<template>
  <SignInForm />
</template>

<script lang="ts" setup>
import SignInForm from "@/components/sign/SignInForm.vue"
import { useRoute, useRouter } from "vue-router"

const router = useRouter()
const route = useRoute()
</script>
