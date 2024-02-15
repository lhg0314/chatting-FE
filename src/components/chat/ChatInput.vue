<template>
  <div class="chat-text-input">
    <template v-if="toggle === 'text'">
      <v-icon class="icon-camera" @click="updateToggle">mdi-camera</v-icon>
      <input v-model="message" placeholder="메세지를 입력해주세요." @keyup.enter="send" />
      <v-icon class="icon-send" @click="send">mdi-send</v-icon>
    </template>
    <template v-if="toggle === 'file'">
      <v-file-input
        class="camera-input"
        label="File input"
        variant="filled"
        prepend-icon="mdi-camera"
        id="selectFile"
        v-model="chosenFile"
      ></v-file-input>
      <v-icon class="icon-send-camera" @click="submit">mdi-send</v-icon>
      <v-icon class="icon-reset" @click="updateToggle">mdi-refresh</v-icon>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { Ref, ref } from "vue"
import { useChatStore } from "@/store/chat/chat"
import { Ifile } from "@/types/chat"

const store = useChatStore()

const emit = defineEmits(["send:message"])
const props = defineProps(["roomId"])

const message = ref("") // 입력 메세지
const toggle = ref("text")
const chosenFile: Ref<File[] | undefined> = ref() // 이미지 파일정보

// 메세지 전송
const send = () => {
  if (message.value === "") {
    return
  }
  emit("send:message", message.value)
  message.value = ""
}

// 이미지 파일 전송
const submit = async () => {
  const formData = new FormData()
  if (chosenFile.value !== undefined) {
    console.log("파일정보", chosenFile.value[0])

    //Array.from(chosenFile.value).forEach((f) => formData.append("file", f))
    formData.append("file", chosenFile.value[0])
    formData.append("roomId", props.roomId)

    await store.requestImage({ FormData: formData })

    //2. response 세팅해서 emit으로 전달

    toggle.value = "text"
    chosenFile.value = undefined // reset
  }
}

const updateToggle = () => {
  toggle.value = toggle.value === "file" ? "text" : "file"
  chosenFile.value = undefined
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
    padding: 0.8rem 2.5rem;
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

  .icon-camera {
    position: absolute;
    padding: 1.5rem 1.5rem;
    color: rgba(0, 0, 0, 0.54);
  }

  .camera-input {
    position: absolute;
    float: left;
    width: 80%;
    margin: 0 20px;
  }

  .icon-reset {
    position: absolute;
    float: left;
    right: 0;
    padding: 0.5rem 0.5rem;
    top: 15px;
    color: rgba(0, 0, 0, 0.54);
  }
  .icon-send-camera {
    position: absolute;
    float: left;
    right: 3rem;
    top: 15px;
    padding: 0.5rem 0.5rem;
    color: rgba(0, 0, 0, 0.54);
  }
}
</style>
