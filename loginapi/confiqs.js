const jwt=require('jsonwebtoken')
const moment=require('moment')
const client=require('./db')
const fs=require('fs');
const cert = fs.readFileSync('./keys/private.pem', 'utf8');
const pr = fs.readFileSync('./keys/public.pem', 'utf8');
const crypto = require('crypto'); //npm install crypto --save
const config =require('config')
const date = new Date();

const payload={
    nbf:date,
    exp:{expireIn:'30m'},
    //sub:encrypt(email)

}
 console.log('The payload is: ', payload);
 return jwt.sign(payload, config.authTokens.cert,
    { algorithm: config.authTokens.algorithm });

jwt.verify(token, config.authTokens.pr,
    {
      algorithms: config.authTokens.algorithm,
      issuer: config.authTokens.issuer,
      audience: [config.authTokens.audience.web, config.authTokens.audience.app],
    },
    async (err, payload) => {
    });