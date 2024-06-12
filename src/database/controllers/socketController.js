import dataBaseController from "./dataBaseController.js";


class SocketController extends dataBaseController {
    constructor(socket) {
        super()
        this.socket = socket
    }



    eventosInicio(io) {

        this.socket.on('obter_documentos', async (devolverDocumentos) => {
            const documentos = await this.obterDocumentos() 
            devolverDocumentos(documentos)
             })
        
             this.socket.on('adicionar_documento', async (nome) => {
              const documentoExiste = (await this.encontrarDocumento(nome)) !== null
        
              if (documentoExiste) {
                this.socket.emit('documento_existe', nome) 
              } else {
                const resultado = await this.adicionaDocumento(nome)
                if (resultado.acknowledged) {
                  io.emit("adicionar_documento_interface", nome);
                }
              }
             })
        
            this.socket.on("selecionar-documento", async (nomeDocumento) => {
              this.socket.join(nomeDocumento)
              
              const documento = await this.encontrarDocumento(nomeDocumento);
        
              
                
                if (documento) {
                  this.socket.emit('texto_documento', documento.texto)
                }
                
            })

    }

    eventosDocumento(io) {
        
        this.socket.on('texto_editor', async ({nomeDocumento, texto}) => {
            const atualiza = await this.atualizaDocumento(nomeDocumento, texto)
           
            if (atualiza.modifiedCount){
              this.socket.to(nomeDocumento).emit('texto_editor_clientes', texto)
            } 
         })
      
          this.socket.on("excluir_documento", async (nome) => {
          const resultado = await this.excluirDocumento(nome);
      
          if (resultado.deletedCount) {
            io.emit("excluir_documento_sucesso", nome);
          }
        });
    }

    eventosCadastro(io) {
      this.socket.on('cadastrar_usuario', async (dados) => {
        const usuario = await this.encontrarUsuario(dados.usuario)

      if (usuario === null) {
        const resultado = await this.cadastrarUsuario(dados)
  
        if (resultado.acknowledged) {
          this.socket.emit('cadastro_sucesso')
        } else {
          this.socket.emit('cadastro_erro')
        }
      } else {
        this.socket.emit('usuario_existente')
      }
        
        })
    }
}




export default SocketController