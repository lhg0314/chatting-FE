import Axios from "axios"

export default (baseURL: string, timeout: number = 5000) => {
  return Axios.create({
    baseURL,
    timeout
  })
}
