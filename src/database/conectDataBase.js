import { MongoClient } from "mongodb"
 
                                                                                                                                      
const url = process.env.STRINGCONEXAO;

const client = new MongoClient(url);

let colection

async function run() {
    try {
        await client.connect();

        const db = client.db('ChatsSocketIO')
         colection = db.collection('chats')
        console.log("Successfully connected to Atlas");
    } catch (err) {
        console.log(err.stack);
    }
   }

    run().catch(console.dir);

    export { colection }