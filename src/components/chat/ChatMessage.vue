<template>
  <v-layout class="chat-messages" row wrap>
    <v-flex v-for="(item, index) in messages" :key="index" xs12>
      <v-card v-if="item.msgType === 'system'" class="chat-system-message" color="grey-lighten-2" flat>
        <v-card-text class="text-grey-darken-1">
          {{ item.msg }}
        </v-card-text>
      </v-card>

      <v-card v-else class="chat-message-box" :class="item.userId ? 'chat-right' : 'chat-left'" flat>
        <v-card-title class="chat-username" style="font-size: 1em">
          <div class="text-grey-darken-1">{{ !item.userId ? item.userId : "" }}</div>
        </v-card-title>

        <!-- <v-img v-if="item.type === 'image'" :src="item.imageUrl" class="chat-image" max-width="400px" contain></v-img> -->

        <v-card-text class="chat-message">
          {{ item.msg }}
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue"

const props = defineProps(["messages"])
const messages = props.messages

console.log("props.messages >>> ", props.messages)
</script>

<style lang="scss" scoped>
.chat-messages {
  flex-direction: column;
  .chat-username {
    padding-bottom: 0;
  }

  .chat-message {
    padding-top: 0;
    word-wrap: break-word;
  }

  .chat-image {
    margin: 0 16px;
  }

  .chat-message-box {
    border-color: #e0e0e0 !important;
    border-radius: 1rem;
    min-width: 40%;
    max-width: 60%;
    margin: 5px;
  }

  .chat-right {
    background-color: #81d4fa !important;
    float: right;
  }

  .chat-left {
    background-color: #c5e1a5 !important;
    float: left;
  }
}
</style>
