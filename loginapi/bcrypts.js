const express =require('express')
const app =express();
const client=require('./db');
const fs=require('fs');
const  jwt  =  require("jsonwebtoken");
const cert = fs.readFileSync('./keys/private.pem', 'utf8');
const pr = fs.readFileSync('./keys/public.pem', 'utf8');
app.post('/register',(req,res)=>
{
    console.log('start the begin')
    const user =req.body
    console.log('after the start')
    try {
        console.log('in try block')
    const  data  =  client.query(`SELECT * FROM login WHERE email= $1;`, [email]); //Checking if user already exists
    const  arr  =  data.rows;
    console.log(arr);
    if (arr.length  !=  0) {
    console.log('enter in the if block')
    return  res.status(400).json({
    error: "Email already there, No need to register again.",
    });
    }
    else {
    console.log('in else block')
    bcrypt.hash(password, 10, (err, hash) => {
    if (err)
    console.log('enter in bcrypt login err')
    res.status(err).json({
    error: "Server error",
    });
    console.log('enter in user block')
    const  user  = {
    email,
    password: hash,
    };
    var  flag  =  1; //Declaring a flag
    
    //Inserting data into the database
    
    client
    .query(`INSERT INTO login (email,password) VALUES ($1,$2);`, [user.name, user.email, user.phonenumber, user.password], (err) => {
    
    if (err) {
    flag  =  0; //If user is not inserted is not inserted to database assigning flag as 0/false.
    console.error(err);
    return  res.status(500).json({
    error: "Database error"
    })
    }
    else {
    flag  =  1;
    res.status(200).send({ message: 'User added to database, not verified' });
    }
    })
    if (flag) {
    const  token  = jwt.sign( //Signing a jwt token
    {
    email: user.email
    },
    cert
    );
    };
    });
    }
    }
    catch (err) {
    console.log(err);
    res.status(500).json({
    error: "Database error while registring user!", //Database connection error
    });
    client.end;
    };
})

app.post('./loged',(req,res,next)=>
{
        console.log(req.body);
             bcrypt.hash(req.body.password, 11, (err, encrypted) => {
            console.log("encrypting password!!");
            user.set(req.body.username, encrypted);
            console.log(user);
            if(!err)
            {
                const data = client.query(`SELECT * FROM login WHERE email= $1;`, [email])
                if(password===req.body.password)
                {
                    console.log('log in')
                }
            }

        });
        res.json({message: "user created!!"});
    
})

app.listen(3000, () => {
	
	console.log('Server is now listening at port 3000');

})
