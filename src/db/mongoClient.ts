import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/Personas';
const dbName = process.env.MONGO_DB_NAME || 'Personas';

let client: MongoClient;
let db: Db;

export const connectToMongo = async (): Promise<Db> => {
  if (!db) {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db(dbName);
    console.log('✅ Conectado a MongoDB');
  }
  return db;
};

export const disconnectMongo = async () => {
  if (client) {
    await client.close();
    console.log('🛑 Desconectado de MongoDB');
  }
};