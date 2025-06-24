import { io } from "socket.io-client";

const ENDPOINT = "http://localhost:5000";

// const socket = io(ENDPOINT);
const socket = io(window.location.origin)

export default socket;


