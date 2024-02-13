import axios from "./base-axios"
import { RequestMessageList, ResponseChatRoom, ResponseMessageList } from "@/types/chat"

const chatService = axios()
const chatListService = axios({ loading: false })

const requestChatRoomList = async (userId: string): Promise<BaseRes<ResponseChatRoom>> => {
  const { data } = await chatListService.get("/chat/roomList", { params: { userId: userId } })
  return data
}

const requestMessageList = async (body: RequestMessageList): Promise<BaseRes<ResponseMessageList>> => {
  const { data } = await chatService.post("/chat/messageList", body)
  return data
}

export { requestChatRoomList, requestMessageList }
