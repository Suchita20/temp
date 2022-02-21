const jwt=require('jsonwebtoken');
const Joi=require('joi');
const client=require('./db.js');
const express=require('express');
const app= express();
const bodyParser = require("body-parser");
const { response } = require('express');
const bcrypt =require('bcrypt')
//const JsonWebTokenError = require('jsonwebtoken/lib/JsonWebTokenError');
const JWT =require('jsonwebtoken');
//const { Pool } = require('pg/lib');
//const { user } = require('pg/lib/defaults');
app.use(bodyParser.json());
const verifys =require('./verifys')




app.listen(3000,()=>{
    console.log('Server is now listening at port 3000');
})
client.connect();

const salt=10;


app.get('/users', (req, res)=>{
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

app.post('/login', async(req, res)=> {
    const user = req.body;


    const bcrypt = require('bcrypt');

   const hashed= bcrypt.hash(user.password, 11)

    let insertQuery = `insert into login(email,password) 
                       values('${user.email}', '${user.password}')`

            if (user.password) {
                const salt = await bcrypt.genSaltSync(11, 'a');
                user.password = bcrypt.hashSync(user.password, salt);
               

               


  

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }
        else{ console.log(err.message) }
    })


    jwt.sign({user},'jwtprivatekey',{expiresIn: '30m'},(err,token)=>
    {
        res.json({

                token
            });
        });
        console.log(user);
    
        
    
    client.end;
    }  
})


app.post('/login', function(req, res) {
	var email = req.body.email;
	var password = req.body.password;
	if (email && password) 
	client.query('SELECT * FROM login WHERE email = $1 AND password = $2', [email, password] ,async(error, result)=>
    {
            console.log('checking error');
        if(error)
        {
           throw error
           console.log('in error block')
    
        }
        console.log('in catch block');

        res.status(200).json(result.rows)
        //res.status(200).send('login succesful')    
     });
     client.end;
       
});





