const jwt=require('jsonwebtoken');
const Joi=require('joi');
const client=require('./db.js');
const express=require('express');
const app= express();
const bodyParser = require("body-parser");
const confiq=require('confiq');
app.use(bodyParser.json());

app.listen(3000,()=>{
    console.log('Server is now listening at port 3000');
})
client.connect();


app.get('/login', (req, res)=>{
    client.query('Select * from login', (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
        else{
            console.log(err.message);
        }
    });
    client.end;
})

app.post('/login', (req, res)=> {
    const user = req.body;
    let insertQuery = `insert into login(email,password) 
                       values('${user.email}', '${user.password}')`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }
        else{ console.log(err.message) }
    })
    
    client.end;
})

function verifys( req,res,next)
    {
        if(req.body.email!=req.body.password)
        {
            res.status(401).send('not a valid user');
        }
        else
        {
            res.status(200).send('login done');
        }
    }  

  app.post('/login',async(req,res)=>
  {
      const email=req.body.email;
      const password=req.body.password;
        
	if (email && password) 
    let test='SELECT * FROM login WHERE email = $1 AND password = $2', [email, password]
    client.query(test, (err, result)=>{
        if(!err){
            res.send(200).json(result.row)
        }
        else{ console.log(err.message) }
    })
    
    client.end;
})
    
    
app.get('/login', verifys , (req, res)=>
{
    jwt.verify(req.token,'jwtprivatekey',(err,authData)=>
    {
        if(err)
        
        res.sendstatus(403);
        else
        {
            res.json({
                message:"post created",
                autData
            });
        }
    });
});

