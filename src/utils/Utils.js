import { randomBytes, scryptSync, timingSafeEqual } from "crypto";
import  jwt  from "jsonwebtoken";

let conexoesDocumentos = [];


class Utils {
    constructor(){}

   
   
static criaHashESalSenha(senhaDigitada) {
  const salSenha = randomBytes(16).toString("hex");

  const hashSenha = scryptSync(senhaDigitada, salSenha, 64).toString("hex");

  return { salSenha, hashSenha };
}

static autenticarUsuario(senhaDigitada, usuario) {
  const hashTeste = scryptSync(senhaDigitada, usuario.salSenha, 64)

  const hashReal = Buffer.from(usuario.hashSenha, 'hex')

  const isAutenticado = timingSafeEqual(hashTeste, hashReal)

  return isAutenticado
}

static gerarJWT(payload) {
  const tokenjwt = jwt.sign(payload, process.env.SEGREDO_JWT, {
    expiresIn: '1h'
  })
  return tokenjwt
}

static autorizarUsuario(socket, next) {
  const tokenJwt = socket.handshake.auth.token;
  
  try {
    const payloadToken = jwt.verify(tokenJwt, process.env.SEGREDO_JWT);

    socket.emit('autorização_sucesso', payloadToken)
    next()

  } catch(erro) {
    next(erro)
  }
}

static addConexaoALista(conexao) {
  conexoesDocumentos.push(conexao)
  
}

static obterUsuariosDocumento(nomeDocumento) {
  return conexoesDocumentos
    .filter((conexao) => conexao.nomeDocumento === nomeDocumento)
    .map((conexao) => conexao.usuario); }

}
 

 

export default Utils
