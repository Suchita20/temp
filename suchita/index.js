const express =require('express');
const app =express();
const bodyParser =require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use("/users",require('./users'));
app.listen(4000,()=>console.log("application start....."));