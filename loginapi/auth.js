const Jwt =require('jsonwebtoken');
const fs=require('fs');
const crypto =require('crypto')
const base64url =require('base64url');
const cert=fs.readFileSync('./keys/private.pem','utf8');
const pr=fs.readFileSync('./keys/public.pem','utf8');
const client = require('./db.js');
const signaturefunction =crypto.createSign('RSA-SHA256');
const signatureBase64 =signaturefunction.sign(cert,'base64');
const signature64url =base64url.fromBase64(signatureBase64);
const moment =require('moment')
const multer =require('multer')
const jsonstringify=require('json-stringify');
const { default: jwtDecode } = require('jwt-decode');
const date=new Date();

module.exports=(req,res,next)=>{
    
    try
    {
            console.log('in try block of verify token')
            const bearerHeader=req.headers["authorization"];
            console.log('auth of');
            const bearer =bearerHeader.split(' ');
            console.log('split the token');
            console.log(bearer)
            const bearerToken = bearer[1];
            console.log("_________________________________")
            console.log(bearerToken); 
            console.log('array');
            req.token=bearerToken;
            console.log('___________________________________________')
            console.log(req.token)
        
            console.log("verifying the token ")

          // const key =jsonstringify(pr)
          const decode=  Jwt.verify(req.token,pr,{algorithms:['RS384']},(err,autdata)=>
            {
                if(err)
                {
                   
                  
                    console.log(err.message)
                    res.sendstatus(401);
                   
                   
                
                }
                else
                console.log('in else of jwt verifying')
                {
                    res.json({
                        message:"post created",
                        autdata

                    })
                   
                  next();
                    

                }
            
            })
            
        }
        catch
        {
            res.send('invalid');
         
        }  
        
    }        


    