import { alertarERedirecionar, atualizaTextoEditor, atualizarInterfaceUsuarios, trataAutorizaçaoSucesso } from "./documento.js";
import UtilsFront from '../utils/UtilsFront.js'

const socket = io('/usuarios', {
  auth: {
    token: UtilsFront.obterCookie('tokenJWT')
  }
});

socket.on('autorização_sucesso', trataAutorizaçaoSucesso)


socket.on("connect_error", (erro) => {
  alert(erro);
  window.location.href = "/login/index.html";
  })

function selecionarDocumento(dadosEntrada) {
  socket.emit("selecionar_documento", dadosEntrada, (texto) => {
    atualizaTextoEditor(texto);
  });
}

socket.on('usuarios_no_documento', atualizarInterfaceUsuarios)

function emitirTextoEditor(dados) {
  
  socket.emit("texto_editor", dados);
}

socket.on("texto_editor_clientes", (texto) => {
  atualizaTextoEditor(texto);
});

function emitirExcluirDocumento(nome) {
  socket.emit("excluir_documento", nome);
}

socket.on("excluir_documento_sucesso", (nome) => {
  alertarERedirecionar(nome);
});

export { emitirTextoEditor, selecionarDocumento, emitirExcluirDocumento };
