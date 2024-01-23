import axios from "./base-axios"

const exService = axios("https://api.hnpwa.com/v0", 5000) // 테스트 openApi

const requestTestApi = () => {
  return exService.get("news/1.json")
}

export { requestTestApi }
