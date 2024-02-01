<template>
  <v-app>
    <DefaultBar />
    <DefaultView />
    <LoadingBar v-if="store.getIsLoading().value" />
  </v-app>
</template>

<script lang="ts" setup>
import LoadingBar from "@/components/app/LoadingBar.vue"
import DefaultBar from "./default/AppBar.vue"
import DefaultView from "./default/View.vue"

import { useAppStore } from "@/store/comm"
const store = useAppStore()
</script>
