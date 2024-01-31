import SockJS from "sockjs-client"
import Stomp from "webstomp-client"

const serverURL = "http://localhost:8085/ws"
let socket = new SockJS(serverURL)
const stompClient = Stomp.over(socket)
let connected = false
console.log(`소켓 연결을 시도합니다. 서버 주소: ${serverURL}`)

// eslint-disable-next-line import/prefer-default-export
export { stompClient }
