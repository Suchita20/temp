const jwt = require('jsonwebtoken');
const Joi = require('joi');
const client = require('./db.js');
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken');
app.use(bodyParser.json());
const fs = require('fs');
const auths = require('./auth');
const {json} = require('body-parser');
//const{genSaltSync,hashSync,compareSync}=require("bcrypt");
const login = require('./loginss');
const cert = fs.readFileSync('./keys/private.pem', 'utf8');
const pr = fs.readFileSync('./keys/public.pem', 'utf8');
const register = require('./register');
const crypto =require('crypto');
const { request } = require('http');
const moment = require('moment');
const config =require('confiq');
client.connect();

const salt = 10;



const date=new Date();
const header={
    alg:"RS384",
    typ:"JWT"
}

const payload={
    nbf:moment(date).unix(),
    sub:"memorres digital pvt ltd",
    iss:"memorres digital pvt ltd",
    exp:moment(30,'minute').unix(),
    iat:moment(date).unix(),
    
}
//return jwt.sign(payload,cert)

console.log(header)
console.log(payload)



app.get('/users', (req, res) => {
    client.query('Select * from login', (err, result) => {
        if (!err) {
            res.send(result.rows);
        } else {
            console.log(err.message);
        }
    });
    client.end;
})

app.post('/register', async(req, res)=> {
    const user = req.body;
   // const bcrypt = require('bcrypt');
   const hashed= bcrypt.hash(user.password, 11)
   //if (user.password) {
  const salt = await bcrypt.genSaltSync(11, 'a');
  user.password = bcrypt.hashSync(user.password, salt);
   const userpassword =user.password
   console.log(userpassword)

    let insertQuery = `insert into login(email,password) 
                       values('${user.email}', '${user.password}')`

    console.log('in insertion block') 
    client.query(insertQuery, (err, result)=>{
        if(!err){
           // res.send('Insertion was successful')

        // jwt.sign({user},cert,{expiresIn: '30m'},{notBefore:'30m'},(err,token)=>{
        //res.json({

        //  token
    //  });
    //});
        }
        else{ console.log(err.message) }
    })


        console.log(user);
    
        
    
    client.end;
    
})
app.post('/api/login', async (req, res, result) => {
    const {email,password} = req.body;
    //const user=req.body
    console.log('enter in try block')
    try {
        console.log('checking the query')
        const data = await client.query(`SELECT * FROM login WHERE email= $1;`, [email])
         //Verifying if the user exists in the database
         console.log(email)
         console.log(password)
         console.log(req.body.password)
        const user = data.rows;
        //console.log(user.password)
        
        console.log(data)
        console.log(user)
        
        //console.log(password);
        
    
        if (user.length === 0) {
            res.status(400).json({
                error: "User is not registered, Sign Up first"
            });
        } else {
            console.log('in else block')
            passwordmatch=bcrypt.compare(password, user[0].password, (err, result) => {
                console.log('invalid')
                if (err) {
                    console.log('in err block')
                    console.log(password)
                    console.log(req.body.password)
                    res.status(500).json({
                        error:err.message,
                        //error:'server error'
                        
                    });
                    console.log(password)
                } else {
                    console.log('in err else')
                    console.log(password)
                    console.log(password)
                    console.log(result);
                    if (result === true) {
                        const token = jwt.sign(
                                //payload,cert, header:{"alg": "RS256"}
                                payload, cert,
                                    { algorithm: 'RS384',header}
                        );
                        
                        res.status(200).json({
                            message: "User signed in!",
                            token: token,
                        });
                    }       
                    else {
                        
                        if (result != true)
                        res.status(400).json({
                            error: "invalid creditional",
                        }); 
                            
                    }


                }

            })
    }



    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Database error occurred while signing in!", 
        });
    }
})


app.listen(7000, () => {
    
    console.log('Server is now listening at port 3000');

})