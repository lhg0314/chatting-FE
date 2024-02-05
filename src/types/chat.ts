export interface IChatRoom {
  roomId: number
  roomName: string
}

export interface ResponseChatRoom {
  roomList: IChatRoom[]
}

export interface RequestMessageList {
  roomId: number
  pageNum: number // 조회 페이지
  cnt: number // 조회 개수
}

export interface IMessage {
  chatId: number
  roomId: number
  userId: string
  message: string
  message_type: string
  createAt: string
  readCnt: number
}

export interface ResponseMessageList {
  msgList: IMessage[]
}
