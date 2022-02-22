const Jwt =require('jsonwebtoken');
const fs=require('fs');
const crypto =require('crypto')
const base64url =require('base64url');
const cert=fs.readFileSync('./keys/private.pem','utf8');
const pr=fs.readFileSync('./keys/public.pem','utf8');
const client = require('./db.js');
//const {client,Role} = require('./db.js');
const signaturefunction =crypto.createSign('RSA-SHA256');

const moment =require('moment')
const multer =require('multer')
const jsonstringify=require('json-stringify');
const { default: jwtDecode } = require('jwt-decode');
const date=new Date();
const jwtdecode =require('jwt-decode');
const { invalid } = require('joi');
const { Console } = require('console');
const { decode } = require('punycode');
const signatureBase64 =signaturefunction.sign(pr,'base64');
const signature64url =base64url.fromBase64(signatureBase64);
const acesscontrol =require('accesscontrol');
const { user } = require('pg/lib/defaults');


function author(req,res,next)
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
        const decode =jwtdecode(req.token)
        console.log(decode)
       res.json({
           message:"decode",
           decode
       })
       
       next()

}
//console.log("authordecode" + author.decode)
console.log("outside token block")

/*function authrole(role)
{
    console.log("in role block")

    return(req,res,next)=>
    {
        const roles=decode.role
        if( role!== roles)
        {
            
            res.status(401)
            return res.send('not allowed')   
        }
        else
        {
            res.send("valid user")
        }
        next();
    }
    
}/** */

/*function authrole(roles) {
    // roles param can be a single role string (e.g. Role.User or 'User') 
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['SuperAdmin','Admin', 'User'])
    if(roles !==user.role)
    {
        res.send(401);
    }
    else
    {
        res.send("valid user")
    }

    
}/** */
     

module.exports={
    author,
    authrole

}