import { emitirTexto, selecionarDocumento, emitirExcluirDocumento } from "./socket-front.js"

const parametros = new URLSearchParams(window.location.search);
const nomeDocumento = parametros.get("nome");
const tituloDocumento = document.getElementById('titulo-documento')
const botaoExcluir = document.getElementById("excluir-documento");
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

botaoExcluir.addEventListener("click", () => {
   emitirExcluirDocumento(nomeDocumento);
 });

function alertarERedirecionar(nome) {
   if (nome === nomeDocumento) {
     alert(`Documento ${nome} excluído!`);
     window.location.href = "/";
   }
 }


export { atualizaTextoEditor, alertarERedirecionar }