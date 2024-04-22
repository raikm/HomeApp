import { io } from 'socket.io-client'
import { App } from 'vue'

export default {
  install: (app: App, options: any) => {
    const socket = io(options.connection, { transports: ['websocket'] })

    app.config.globalProperties.$socket = socket

    app.provide('socket', socket)
  }
}
