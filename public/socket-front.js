import { atualizaTextoEditor, alertarERedirecionar } from "./documento.js"

const socket = io()

function selecionarDocumento(nome) {
    socket.emit("selecionar-documento", nome)
}

function emitirTexto(nomeDocumento, texto) {
    socket.emit('texto_editor', nomeDocumento, texto) 
}

function emitirExcluirDocumento(nome) {
    socket.emit("excluir_documento", nome);
  }

socket.on('texto_documento', (texto) => {
    atualizaTextoEditor(texto)
})

socket.on("excluir_documento_sucesso", (nome) => {
    alertarERedirecionar(nome);
  });


socket.on('texto_editor_clientes', (texto) => {
    atualizaTextoEditor(texto)
 })

export { emitirTexto, selecionarDocumento, emitirExcluirDocumento}