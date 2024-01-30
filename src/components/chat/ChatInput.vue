<template>
  <div class="chat-text-input">
    <input v-model="message" placeholder="메세지를 입력해주세요." @keyup.enter="send" />
    <v-icon class="icon-send" @click="send">mdi-send</v-icon>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"

const message = ref("") // 입력 메세지

const send = () => {
  if (message.value === "") {
    return
  }
  message.value = ""
}
</script>

<style lang="scss" scoped>
.chat-text-input {
  position: relative;

  input {
    width: 100%;
    height: 100%;
    border: 2px solid rgba(0, 0, 0, 0.54);
    border-radius: 5px;
    padding: 0.8rem 0.5rem;
    padding-right: calc(0.8rem * 3);

    &.focus {
      outline: none;
    }
  }

  .icon-send {
    position: absolute;
    right: 0;
    padding: 1.5rem 0.5rem;
    color: rgba(0, 0, 0, 0.54);
  }
}
</style>
