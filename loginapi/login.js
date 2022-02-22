const jwt = require('jsonwebtoken');
const Joi = require('joi');
//const client = require('./db.js');
//const acc =require('./access')
const{validates,userrole}=require('./access')

const {client,Role} = require('./db.js');
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const fs = require('fs');
const auths = require('./auth');
const {json} = require('body-parser');
//const{genSaltSync,hashSync,compareSync}=require("bcrypt");
const login = require('./loginss');
//const cert = fs.readFileSync('./keys/private.pem', 'utf8');
//const pr = fs.readFileSync('./keys/public.pem', 'utf8');
const register = require('./register');
const crypto =require('crypto');
const { request } = require('http');
const moment = require('moment');
const config =require('confiq');
const base64url =require('base64url');
const signaturefunction =crypto.createSign('RSA-SHA256');
const multer =require('multer')

//const ar=require('./a')

 



const verifyfunction =crypto.createVerify('RSA-SHA256');

//const {author,authrole}=require('./authenticate')

//const private_key =cert;
//const public_key =fs;
const jsonstringify=require('json-stringify');
const auth = require('./auth');
const req = require('express/lib/request');
const { user } = require('pg/lib/defaults');
client.connect();

const salt = 10;

const algorithm ='RS384'

const date=new Date();
const header={
    alg:'RS384',
    typ:"JWT"
}


const payload={
    nbf:moment(date).unix(),
    sub:"memorres digital pvt ltd",
    iss:"memorres digital pvt ltd",
    exp:moment().add(240,'minute').unix(),
    iat:moment(date).unix(),
  //role:client.role
   // role:["role:admin","role:superadmin"]
    
}		
	
	
   
    


const headerobj =jsonstringify(header)
const payloadobj =jsonstringify(payload)

const base64header =base64url(headerobj)
const base64payload =base64url(payloadobj)

signaturefunction.write(base64header+'.'+base64payload);
signaturefunction.end();

const prvt_key =fs.readFileSync('./keys/private.pem', 'utf8');
const pub_key =fs.readFileSync('./keys/public.pem','utf8');

const signatureBase64 =signaturefunction.sign(prvt_key,'base64');
const signature64url =base64url.fromBase64(signatureBase64);



console.log(signature64url);

console.log(header)
console.log(payload)






app.get('/users', (req, res) =>{
    

    client.query('Select * from login',(err, result) => {
        if (!err) {
            res.send(result.rows);
        } else {
            console.log(err.message);
        }
    });
    client.end;
})

app.post('/api/register', async(req, res) => {
    const user = req.body;
    console.log(user);
   // const bcrypt = require('bcrypt');
   const hashed= bcrypt.hash(user.password, 11)
   //if (user.password) {
  const salt = await bcrypt.genSaltSync(11, 'a');
  user.password = bcrypt.hashSync(user.password, salt);
   const userpassword =user.password
   console.log(userpassword)

    let insertQuery = `insert into login(email,password,role) 
                       values('${user.email}', '${user.password}','${user.role}')`

    console.log('in insertion block') 
    client.query(insertQuery, (err, result)=>{
        if(!err){
           // res.send('Insertion was successful')

         jwt.sign({user},prvt_key,(err,token)=>{
        res.json({

            token
        });
    });
        }
        else{ console.log(err.message) }
    })


        console.log(user);
    
        
    
    client.end;
    
})//end register

app.post('/api/login',async (req, res, result) => {
    const {email,password,role} = req.body;
    //const user=req.body
    console.log('enter in try block')
    try {
        console.log('checking the query')
        const data = await client.query(`SELECT * FROM login WHERE email= $1;`, [email])
         //Verifying if the user exists in the database
         console.log(email)
         console.log(password)
		 console.log(role)
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
                        let tokenpayload={
                            nbf:moment(date).unix(),
                            sub:"memorres digital pvt ltd",
                            iss:"memorres digital pvt ltd",
                            exp:moment().add(240,'minute').unix(),
                            iat:moment(date).unix()

                        }
                        tokenpayload.role=user[0].role;
                        tokenpayload.email=user[0].email;


                       // payload.email=user[0].email;
						
                        const token = jwt.sign(
                            //payload,cert, header:{"alg": "RS256"}
                            
							
                            tokenpayload,prvt_key,
                                { algorithm: 'RS384',header}
                              
                    );
                    
                            //,JWT.verify(pub_key, {algorithms: ['RSA-SHA256']})

                            
                            //{   
                                    //console.log(err.message)   
                                    
                                    //const signatureBase64 =signaturefunction.sign(prvt_key,'base64');
                              // console.log(signature);    
                            //}),
                        
                            
                            
                            
                
                            
                            
                    //  const signature = token.toString('base64'); 
                    


                        res.status(200).json({
                            message: "User signed in!",
                            token: token
                        });

                        
                         
                          
                           
                           //console.log(json.toString(verifyed))
                        
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

app.post('/loged',auth,(err,res)=>
{
        if(err)
        {
            console.log(err.message)
        }
        else
        {
            json.res({
                message:res.data
            })
        }
})

/*app.get('/api/customer',authoriz("role:admin"),(req,res)=>
{
    console.log("all done")

})/** */
/*app.get('/api/logs',auth,(err,res)=>
{
	if(err)
	{
		console.log(err.message)
	}
	else
	{
		console.log(res.result)
	}

})
//-------------------------------------------------------------------------
//---------------------------------------------------------------------

/*app.get('/api/admin',userrole(Role.Admin),userrole(Role.User),(req,res,err)=>
{
    res.send(err.message)
})

app.get('/api/superadmin',userrole(Role.Admin)||userrole(Role.User)||userrole(Role.SuperAdmin),(req,res)=>
{
    res.send("superadmin")
})

app.get('/api/user',validates,(req,res)=>
{
    res.send("user")
})/** */

app.listen(3000, () => {
    
    console.log('Server is now listening at port 3000');

})
