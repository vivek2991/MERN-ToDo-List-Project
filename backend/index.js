import express from 'express';
const app = express();

app.get('/', (req, resp)=>{
    resp.send({
        message: "Basic API Done",
        success: true
    });
})

app.listen(3200);