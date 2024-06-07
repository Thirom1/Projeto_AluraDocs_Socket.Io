import { colection } from "../conectDataBase.js";

class dataBaseController {
    constructor() {}

    static encontrarDocumento(nome) {
        const documento = colection.findOne({
          nome
        })
         return documento;
      }

    static atualizaDocumento(nome, texto) {
        const atualizaçao = colection.updateOne(
            { nome: nome },
            { $set: { texto: texto } }
        )
        
        return atualizaçao
    }

    static obterDocumentos() {
        const documentos = colection.find().toArray()
        return documentos
    }

    static adicionaDocumento(nome) {
        const novoDocumento = colection.insertOne( {
            nome: `${nome}`,
            texto: `texto de ${nome} do mongoDB`
        })
         return novoDocumento

    }
}



export default dataBaseController


