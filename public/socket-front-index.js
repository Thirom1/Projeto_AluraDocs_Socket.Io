import { adicionaDocumento } from "./index.js"
const socket = io()

socket.emit('obter_documentos', (documentos) => {
    documentos.forEach((documento) => {
        adicionaDocumento(documento.nome)
    })
})

function emitirAdicaoDocumento(nome) {
    socket.emit('adicionar_documento', nome)
}

socket.on('adicionar_documento_interface', (nome) => {
    adicionaDocumento(nome)
})

socket.on('documento_existe', (nome) => {
    alert(`o documento ${nome} já existe`)
})
export { emitirAdicaoDocumento }