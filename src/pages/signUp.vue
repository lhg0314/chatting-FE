<template>
  <SignUpForm />
</template>

<script lang="ts" setup>
import SignUpForm from "@/components/sign/SignUpForm.vue"
import { useRoute, useRouter } from "vue-router"

const router = useRouter()
const route = useRoute()
</script>
