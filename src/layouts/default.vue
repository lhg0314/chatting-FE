<template>
  <v-app>
    <DefaultBar />
    <DefaultView />
    <BottomNav />
  </v-app>
</template>

<script lang="ts" setup>
import DefaultBar from "./default/AppBar.vue"
import DefaultView from "./default/View.vue"
import BottomNav from "./default/BottomNav.vue"
</script>
