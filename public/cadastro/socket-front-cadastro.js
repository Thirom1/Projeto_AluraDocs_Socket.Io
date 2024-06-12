const socket = io()

function emitirCadastrarUsuario(dados) {
    socket.emit('cadastrar_usuario', dados)
}

socket.on('cadastro_sucesso', () => alert('Cadastro realizado com sucesso'))
socket.on('cadastro_erro', () => alert('Algo deu errado'))
socket.on('usuario_existente', () => alert('usuario já existe'))






export { emitirCadastrarUsuario }