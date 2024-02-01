import { defineStore } from "pinia"
import { computed, Ref, ref } from "vue"

export const useAppStore = defineStore("app", () => {
  const isLoading: Ref<boolean> = ref(false)

  const getIsLoading = () => computed(() => isLoading.value)

  const setIsLoading = (value: boolean) => {
    isLoading.value = value
  }

  return {
    getIsLoading,
    setIsLoading
  }
})
