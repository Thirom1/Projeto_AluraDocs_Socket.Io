import { emitirTexto, selecionarDocumento } from "./socket-front.js"

const parametros = new URLSearchParams(window.location.search);
const nomeDocumento = parametros.get("nome");
const tituloDocumento = document.getElementById('titulo-documento')
tituloDocumento.textContent = nomeDocumento

selecionarDocumento(nomeDocumento)

const campoTexto = document.getElementById('editor-texto')

function atualizaTextoEditor(texto) {
   campoTexto.value = texto
}



campoTexto.addEventListener('keyup', () => {
   emitirTexto({
      texto: campoTexto.value,
      nomeDocumento,
    })
})

export { atualizaTextoEditor }