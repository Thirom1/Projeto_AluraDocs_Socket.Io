import 'dotenv/config'
import dataBaseController from "./database/controllers/dataBaseController.js";
import io from "./server.js";

io.on('connection', (socket) => {

   
    

    socket.on('obter_documentos', async (devolverDocumentos) => {
    const documentos = await dataBaseController.obterDocumentos() 
    devolverDocumentos(documentos)
     })

     socket.on('adicionar_documento', async (nome) => {
      const documentoExiste = (await dataBaseController.encontrarDocumento(nome)) !== null

      if (documentoExiste) {
        socket.emit('documento_existe', nome) 
      } else {
        const resultado = await dataBaseController.adicionaDocumento(nome)
        if (resultado.acknowledged) {
          io.emit("adicionar_documento_interface", nome);
        }
      }
     })

    socket.on("selecionar-documento", async (nomeDocumento) => {
      socket.join(nomeDocumento)
      
      const documento = await dataBaseController.encontrarDocumento(nomeDocumento);

      
        
        if (documento) {
          socket.emit('texto_documento', documento.texto)
        }
        
    })

    socket.on('texto_editor', async ({nomeDocumento, texto}) => {
      const atualiza = await dataBaseController.atualizaDocumento(nomeDocumento, texto)
     
      if (atualiza.modifiedCount){
        socket.to(nomeDocumento).emit('texto_editor_clientes', texto)
      } else {
        console.error('Algo Deu Errado')
      }
   })


})

