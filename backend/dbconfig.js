import { MongoClient } from "mongodb";

const url = "mongodb+srv://nicolepink235_db_user:0CWSuRxNlsFH8AqV@cluster0.syhtl7a.mongodb.net/?appName=Cluster0";
const client = new MongoClient(url);

export const collectionName = "todo";

export const connection = async () => {
    const connect = await client.connect();
    return connect.db("node-project");
};