import { colection } from "../conectDataBase.js";
import { usuarioColection } from "../conectDataBase.js";
import Utils from "../../utils/Utils.js";

class dataBaseController {
    constructor() {}

     encontrarDocumento(nome) {
        const documento = colection.findOne({
          nome
        })
         return documento;
      }

     atualizaDocumento(nome, texto) {
        const atualizaçao = colection.updateOne(
            { nome: nome },
            { $set: { texto: texto } }
        )
        
        return atualizaçao
    }

     obterDocumentos() {
        const documentos = colection.find().toArray()
        return documentos
    }

     adicionaDocumento(nome) {
        const novoDocumento = colection.insertOne( {
            nome: `${nome}`,
            texto: `texto de ${nome} do mongoDB`
        })
         return novoDocumento

    }

     excluirDocumento(nome) {
        const resultado = colection.deleteOne({
          nome,
        });
      
        return resultado;
      }
    
    cadastrarUsuario({ usuario, senha }){
      const { hashSenha, salSenha } = Utils.criaHashESalSenha(senha);
      
      return usuarioColection.insertOne({ usuario, hashSenha, salSenha })
    }

    encontrarUsuario(usuario) {
      return usuarioColection.findOne({ usuario })
    }
}



export default dataBaseController


