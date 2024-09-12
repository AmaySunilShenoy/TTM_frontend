"use client";

import { io } from "socket.io-client";

export const socket = io('http://localhost:3001/chat', {
  reconnectionDelay: 1000,
  reconnection: true,
  reconnectionAttemps: 10,
  transports: ['websocket'],
  agent: false,
  upgrade: false,
  rejectUnauthorized: false
});