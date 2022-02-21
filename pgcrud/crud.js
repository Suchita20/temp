const client=require('./db.js');
const express=require('express');
const app= express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.listen(3000,()=>{
    console.log('Server is now listening at port 3000');
})
client.connect();
app.get('/userss', (req, res)=>{
    client.query('Select * from users', (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
        else{
            console.log(err.message);
        }
    });
    client.end;
})
app.get('/userss/:id', (req, res)=>{
    client.query(`Select * from users where id=${req.params.id}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
        else{
            console.log(err.message);
        }
    });
    client.end;
})

app.post('/userss', (req, res)=> {
    const user = req.body;
    let insertQuery = `insert into users(id,fname,lname,pno,address,mailid) 
                       values('${user.id}', '${user.fname}', '${user.lname}', '${user.pno}','${user.address}','${user.mailid}')`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})

app.put('/userss/:id', (req, res)=> {
    let user = req.body;
    let updateQuery = `update users
                       set fname = '${user.fname}',
                       lname = '${user.lname}',
                       pno = '${user.pno}',
                       address='${user.address}',
                       mailid='${user.mailid}',
                       where id = ${user.id}`

    client.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Update was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})

app.delete('/userss/:id', (req, res)=> {
    let insertQuery = `delete from users where id=${req.params.id}`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Deletion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})