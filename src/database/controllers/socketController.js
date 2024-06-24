import Utils from "../../utils/Utils.js";
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
        
            
    }

    eventosDocumento(io) {

      this.socket.on("selecionar_documento", async ({nomeDocumento , usuario}, devolverTexto) => {
        
        this.socket.join(nomeDocumento)
        
        const documento = await this.encontrarDocumento(nomeDocumento);
  
        
          
          if (documento) {

            Utils.addConexaoALista({nomeDocumento, usuario})

            const usuariosNoDocumento = Utils.obterUsuariosDocumento(nomeDocumento)

            io.to(nomeDocumento).emit('usuarios_no_documento', usuariosNoDocumento)

            devolverTexto(documento.texto)
            
          }
          
      })

        
        this.socket.on('texto_editor', async ({ nomeDocumento, texto }) => {
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

    eventosLogin(io) {
      this.socket.on('autenticar_usuario', async ({usuario, senha}) => {
        const nome = await this.encontrarUsuario(usuario)

        if (nome) {
          

          const autenticado =  Utils.autenticarUsuario(senha, nome)
          
          if (autenticado) {
            const tokenJWT = Utils.gerarJWT({ nomeUsuario: usuario })

            
            this.socket.emit('autenticado_sucesso', tokenJWT)
          }else {
            this.socket.emit('autenticado_erro')
          }   
        
        } else {
          this.socket.emit('usuario_inexistente')
        }
          
          
        }
      )
        
    }
}




export default SocketController