const {Client}=require('pg');
const client =new Client({
    host:"localhost",
    user:"users",
    port:5432,
    password:"root",
    database:"users"
})
module.exports=client
