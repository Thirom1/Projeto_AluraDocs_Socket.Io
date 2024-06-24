import 'dotenv/config'
import io from "./server.js";
import SocketController from './database/controllers/socketController.js';
import Utils from './utils/Utils.js';

const nspUsuarios = io.of('/usuarios')

nspUsuarios.use( 
  Utils.autorizarUsuario
)   

nspUsuarios.on('connection', (socket) => {
  const socketController = new SocketController(socket)
  
  socketController.eventosInicio(nspUsuarios)
  socketController.eventosDocumento(nspUsuarios)
})


io.of('/').on('connection', (socket) => {
  const socketController = new SocketController(socket)
    
 
    socketController.eventosCadastro(io)
    socketController.eventosLogin(io)

})

