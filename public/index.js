import './socket-front-index.js'
import { emitirAdicaoDocumento } from './socket-front-index.js'



const listaDocumentos = document.getElementById('lista-documentos')
const campoAddDocumento = document.getElementById('form-adiciona-documento')
const imputDocumento = document.getElementById('input-documento')

campoAddDocumento.addEventListener('submit', (evento) => {
      evento.preventDefault()
      emitirAdicaoDocumento(imputDocumento.value)
      imputDocumento.value = "";
      
})


function adicionaDocumento(nomeDocumento) {
    listaDocumentos.innerHTML += `<a href="documento.html?nome=${nomeDocumento}" class="list-group-item list-group-item-action">
    ${nomeDocumento}
  </a>`
}


export { adicionaDocumento }