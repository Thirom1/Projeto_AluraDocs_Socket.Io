import { colection } from "../conectDataBase.js";

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
}



export default dataBaseController


