import express from 'express';
import { collectionName, connection } from './dbconfig.js';
import cors from 'cors'
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(cookieParser());

// signup API using jsonwebtoke - jwt
// POST - http://localhost:3200/signup
// {
//   "email": "vk@google.com",
//   "password": "123456"
// }
app.post("/signup", async (req, resp) => {
    const userData = req.body;
    if (userData.email && userData.password) {
        const db = await connection();
        const collection = await db.collection('users');
        const result = await collection.insertOne(userData);
        if (result) {
            jwt.sign(userData, 'Google', { expiresIn: '5d' }, (error, token) => {
                resp.send({
                    success: true,
                    message: 'Signup Done',
                    token
                })
            })
        } else {
            resp.send({
                success: false,
                message: 'Error in sign up. Try again later'
            })
        }
    }
})

// Login API using jsonwebtoke - jwt
// POST - http://localhost:3200/login
// {
//   "email": "vk@google.com",
//   "password": "123456"
// }
app.post("/login", async (req, resp) => {
    const userData = req.body;
    if (userData.email && userData.password) {
        const db = await connection();
        const collection = await db.collection('users');
        const result = await collection.findOne({ email: userData.email, password: userData.password });
        if (result) {
            jwt.sign(userData, 'Google', { expiresIn: '5d' }, (error, token) => {
                resp.send({
                    success: true,
                    message: 'Login Done',
                    token
                })
            })
        } else {
            resp.send({
                success: false,
                message: 'Error in login. Try again later'
            })
        }
    }
})

// POST - http://localhost:3200/add-task
// Add task api - Body - JSON
// {
//   "title": "Test 4",
//   "description": "Description of Test 4"
// }
app.post("/add-task", verifyJWTToken, async (req, resp) => {
    const db = await connection();
    const collection = await db.collection(collectionName);
    const result = await collection.insertOne(req.body);
    if (result) {
        resp.send({
            message: 'New Task Added',
            success: true,
            result: result
        })
    } else {
        resp.send({
            message: 'Task Not Added',
            success: false,
            result: result
        })
    }
})

// API for list all the tasks
// GET - http://localhost:3200/tasks
app.get("/tasks", verifyJWTToken, async (req, resp) => {
    const db = await connection();
    const collection = await db.collection(collectionName);
    const result = await collection.find().toArray();

    if (result) {
        resp.send({
            message: 'Task List fetched',
            success: true,
            result: result
        })
    } else {
        resp.send({
            message: 'Error! Try after some time.',
            success: false
        })
    }
})

// API for auto populate when click on update button of any task
// GET - http://localhost:3200/task/6aa4f0a15b600b013edf12b1
app.get("/task/:id", verifyJWTToken, async (req, resp) => {
    const db = await connection();
    const id = req.params.id;
    const collection = await db.collection(collectionName);
    const result = await collection.findOne({ _id: new ObjectId(id) });

    if (result) {
        resp.send({
            message: 'Task fetched',
            success: true,
            result: result
        })
    } else {
        resp.send({
            message: 'Error! Try after some time.',
            success: false
        })
    }
})

// API for update single task
// GET - http://localhost:3200/update-task
app.put("/update-task", verifyJWTToken, async (req, resp) => {
    const db = await connection();
    const { _id, ...fields } = req.body;
    const collection = await db.collection(collectionName);

    const update = { $set: fields }
    const result = await collection.updateOne({ _id: new ObjectId(_id) }, update)

    if (result) {
        resp.send({
            message: 'Task Updated',
            success: true,
            result: result
        })
    } else {
        resp.send({
            message: 'Error! Try after some time.',
            success: false
        })
    }
})

// API for delete single task
// delete - http://localhost:3200/delete/id
app.delete("/delete/:id", verifyJWTToken, async (req, resp) => {
    const id = req.params.id;
    const db = await connection();
    const collection = await db.collection(collectionName);
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result) {
        resp.send({
            message: 'Task Deleted',
            success: true,
            result: result
        })
    } else {
        resp.send({
            message: 'Error! Try after some time.',
            success: false
        })
    }
})

// API for multiple task delete
// delete - http://localhost:3200/delete/id
app.delete("/delete-multiple", verifyJWTToken, async (req, resp) => {
    const ids = req.body;
    const deleteTaskIds = ids.map((item) => new ObjectId(item))
    const db = await connection();
    const collection = await db.collection(collectionName);
    const result = await collection.deleteMany({ _id: { $in: deleteTaskIds } });

    if (result) {
        resp.send({
            message: 'Task Deleted',
            success: result
        })
    } else {
        resp.send({
            message: 'Error! Try after some time.',
            success: false
        })
    }
})

function verifyJWTToken(req, resp, next) {
    //console.log("verifyJWTToken", req.cookies['token']);
    const token = req.cookies['token'];
    jwt.verify(token, 'Google', (error, decoded) => {
        if(error){
            return resp.send({
                msg: 'Invalid Toke',
                success: false
            });
        }
        next();
        //console.log(decoded);
    })
}

app.listen(3200);