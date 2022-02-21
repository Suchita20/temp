const express =require('express');
const Joi =require('joi');
const jwt =require('jsonwebtoken');
const bodyParser = require("body-parser");
const client=require('./db.js');
const app =express();
app.use(bodyParser.json());

app.listen(3000,()=>{
    console.log('Server is now listening at port 3000');
})
client.connect();


app.post('/register', (req, res)=> {
    const user = req.body;
    

    let insertQuery = `insert into register(Name,FatherName,emailid,password,rollno) 
                       values('${user.Name}', '${user.FatherName}','${user.emailid}', '${user.password}','${user.rollno}')`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
           // console.log(err.message)
        }
        else{ console.log(err.message) }
    });
  
    client.end;
});