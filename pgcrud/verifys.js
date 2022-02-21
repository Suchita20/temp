const Jwt =require('jsonwebtoken');
const fs=require('fs');

const private=fs.readFileSync('./keys/private.pem','utf8');
const pr=fs.readFileSync('./keys/public.pem','utf8');

module.exports=(req,res,next)=>{
    try
    {
        console.log('in try block')
        const bearerHeader=req.headers["authorization"];
        console.log('auth');
        const bearer =bearerHeader.split(' ');
        console.log('split');
            const bearerToken =bearer[1];
            console.log('array');
            req.token=bearerToken;
            var decoded=Jwt.verify(req.token,private,(err,autdata)=>
            {
                console.log('in verify block')
                if(err)
                {
                    console.log('error')
                    res.send(403);
                }
                else
                {
                    console.log('data')
                   // req.userData=decoded;
                   console.log(autdata);
                     next();
                }
            })
        }
        catch
        {
            res.send('invalid');
        }     
}        

    
    

    