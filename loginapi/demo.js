app.post('/logining',(req,res)=>
{
    
    const user=req.user;
    getuserbyemail(user.email,(err,results)=>{
        if(err)
        {
            console.log(console.err);
        }
        if(!results)
        {
            return res.json({
                success:0,
                data:"invalid id or password"
            });
        }
        const result=compareSync(user.password,results.password);
        if(result)
        {
           results.password=undefined;
            const jsonwebtoken=sign({result:results},cert,{
                expiresIn:'1h'
            });
            return res.json({
                success:1,
                message:"login successfully",
                token:jsontoken
            });

        }
        else
        {
            return res.json({
            success:0,
            message:"login fail"
            })
        }
        
    });


})


app.listen(3000,()=>{
    console.log('Server is now listening at port 3000');
})


    //Schema.methods.comparepassword=function(password,cb){
        bcrypt.compare(user.password,this.password,function(err,isMatch,next){
            if(err)
            {
                console.log("password not matched");
            }
            else
            {
                console.log("both are matched")
                next();
            }
           });



           const key=cert;

//const algo="RSA"
const payload={
	//exp:{expiresIn:'30 s'},
	iat:dc,
	nbf:dc,
	//sub:encrypt(email),
	}
//return jwt.sign(payload,cert,{algorithm:algo})
//return jwt.sign(payload,cert)

function encrypt(text) {
	let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
	let encrypted = cipher.update(text);
	encrypted = Buffer.concat([encrypted, cipher.final()]);
	return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}
  
 return jwt.sign(payload, cert)
 

 const signed =jwt.sign(payload,private_key,{
    algorithm:'RS384',
     //expiresIn:'1h'
 })
 var verifyoptions={
     nbf:moment(date).unix(),
     sub:"memorres digital pvt ltd",
     iss:"memorres digital pvt ltd",
     exp:moment(30,'minute').unix(),
     iat:moment(date).unix(),
     algorithm:"RS384"
 
 }



 const tp=token.split('.');
									const headerpart =tp[0],
									const payloadpart =tp[1],
									const signaturepart=tp[2]
									console.log(tp);
						
									verifyfunction.write(headerpart + '.' + payloadpart)
									verifyfunction.end();
									const jwtSignatureBase64 = base64url.toBase64(signaturepart);
									//const pub_keys =fs.readFileSync('./keys/public.pem','utf8');

									const signatureisvalid =verifyfunction.verify(pub_key,jwtSignatureBase64,'base64')
									console.log(signatureisvalid)
