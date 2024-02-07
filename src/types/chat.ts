export interface IChatRoom {
  roomId: number
  roomName: string
}

export interface ResponseChatRoom {
  roomList: IChatRoom[]
}

export interface RequestMessageList {
  roomId: number
  chatId: number // 채팅메세지 번호
  cnt: number // 조회 개수
}

export interface IMessage {
  chatId: number
  roomId: number
  userId: string
  message: string
  messageType: string
  createAt: string
  readCnt: number
}

export interface ResponseMessageList {
  nextYn: string
  msgList: IMessage[]
}
