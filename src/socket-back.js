import 'dotenv/config'
import io from "./server.js";
import SocketController from './database/controllers/socketController.js';



io.on('connection', (socket) => {
  const socketController = new SocketController(socket)
    
    socketController.eventosInicio(io)
    socketController.eventosDocumento(io)
    socketController.eventosCadastro(io)

})

