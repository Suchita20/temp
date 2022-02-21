const jwt =require('jsonwebtoken')
const cert=fs.readFileSync('./keys/private.pem','utf8');
const pr=fs.readFileSync('./keys/public.pem','utf8');
const client = require('./db.js');
module.exports =(req,res)=>{
    const {email,password,role} = req.body;
    
}