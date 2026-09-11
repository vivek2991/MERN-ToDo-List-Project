import express from 'express';
import { collectionName, connection } from './dbconfig.js';
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(cors());

// POST - http://localhost:3200/add-task
// Add task api - Body - JSON
// {
//   "title": "Test 4",
//   "description": "Description of Test 4"
// }
app.post("/add-task", async (req, resp) => {
    const db = await connection();
    const collection = await db.collection(collectionName);
    const result = await collection.insertOne(req.body);
    if(result){
        resp.send({
            message: 'New Task Added',
            success: true,
            result: result
        })
    } else{
        resp.send({
            message: 'Task Not Added',
            success: false,
            result: result
        })
    }
})

app.listen(3200);