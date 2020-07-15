import socketIOClient from "socket.io-client";
const endpoint = 'http://:8080/';
const socket = socketIOClient(endpoint);
export default socket;