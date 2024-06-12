import express from 'express';
import url from 'url';
import path from 'path';
import http from 'http'
import { Server } from 'socket.io'
import './database/conectDataBase.js';


const app = express();
const PORT = 3000;
const caminhoAtual = url.fileURLToPath(import.meta.url);
const diretorioPublico = path.join(caminhoAtual, '../..', 'public');
app.use(express.static(diretorioPublico));

const servidorHTTP = http.createServer(app)

servidorHTTP.listen(PORT, () => console.log(`Servidor Ouvindo na porta ${PORT}`))

const io = new Server(servidorHTTP);

export default io;