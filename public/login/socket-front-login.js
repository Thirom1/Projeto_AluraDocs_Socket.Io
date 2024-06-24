import UtilsFront from "../utils/UtilsFront.js"

const socket = io()

function emitirAutenticarUsuario(dados) {
    socket.emit('autenticar_usuario', dados)
}

socket.on('autenticado_sucesso', (tokenJWT) => {
   UtilsFront.definirCooklie('tokenJWT', tokenJWT)

   alert('Usuario autenticado com sucesso')
   window.location.href = '/'
})

socket.on('autenticado_erro', () => {
    alert('Usuario ou senha incorretos')
 })

 socket.on('usuario_inexistente', () => {
    alert('usuario não cadastrado')
 })
 

export { emitirAutenticarUsuario }