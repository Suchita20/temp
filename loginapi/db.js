const {Client}=require('pg');

const Role={
    Admin:'admin',
    SuperAdmin:'superadmin',
    User:'user'
}

const client =new Client({
    host:"localhost",
    user:"users",
    port:5432,
    password:"root",
    database:"users"
})
module.exports={
    client,
    Role
}

