import axios from "./base-axios"
import { ResponseChatRoom } from "@/types/chat"

const chatService = axios()

const requestChatRoomList = async (userId: string): Promise<BaseRes<ResponseChatRoom>> => {
  const { data } = await chatService.get("/chat/roomList", { params: { userId: userId } })
  return data
}

export { requestChatRoomList }
