import { defineStore } from "pinia"
import { ref } from "vue"
import { requestTestApi } from "@/axios/docs-service-axios"

export const useAppStore = defineStore("app", () => {
  const testRef: any = ref({})

  const requestFunction = async () => {
    const res = await requestTestApi()
    console.log("res >> ", res)
  }

  const setTestRef = (value: any) => {
    testRef.value = value
  }

  return {
    requestFunction
  }
})
