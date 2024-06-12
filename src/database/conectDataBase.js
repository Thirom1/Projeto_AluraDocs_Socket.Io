import { MongoClient } from "mongodb"
 
                                                                                                                                      
const url = process.env.STRINGCONEXAO;

const client = new MongoClient(url);

let colection, usuarioColection

async function run() {
    try {
        await client.connect();

        const db = client.db('ChatsSocketIO')
        colection = db.collection('chats')
        usuarioColection = db.collection('usuarios')
        console.log("Conectado Ao Banco De Dados Com Sucesso");
    } catch (err) {
        console.log(err.stack);
    }
   }

    run().catch(console.dir);

    export { colection, usuarioColection }