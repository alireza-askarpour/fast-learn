import { Server } from 'socket.io'

export const socketConfig = httpServer => {
  return new Server(httpServer, {
    cors: {
      origin: '*',
    },
    maxHttpBufferSize: 1e8,
  })
}
