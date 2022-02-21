//const crypto = require('crypto'); 
const jwt=require('jsonwebtoken')
const moment=require('moment')
const client=require('./db')
const fs=require('fs');
const cert = fs.readFileSync('./keys/private.pem', 'utf8');
const pr = fs.readFileSync('./keys/public.pem', 'utf8');
const crypto = require('crypto'); //npm install crypto --save
const key=crypto.randomBytes(32);
const iv=crypto.randomBytes(16);
const algo = "RSA";
const date = new Date();
      
     

      function encrypt(data, key) {
        
        if (data === null)
        //console.log('you are in if block')
            return null
        else if (typeof data === 'undefined')
            return undefined;
        else if (data === '')
            return '';
    
        var iv = crypto.randomBytes(16);
    
        var cipher = crypto.createCipheriv('RSA', key, iv);
        var encrypted = [cipher.update(data)];
        encrypted.push(cipher.final());
    
        return Buffer.concat([iv, Buffer.concat(encrypted)]).toString('base64');
    }
    console.log('you are in console')
    
      
      
    // return jwt.sign(payload, cert, {algorithm: algo})