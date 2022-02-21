
const user=require('./db.js');
const {create}=require("./user.service");
module.exports={
    getuserbyemail:(email,callback)=>
{
user.query
{
    `select * from login where email = $1`,(error,callback)=>{


        if(error)
        {
           return callback(error);
        }
        return callback(null,result)
    }
} 
    
e        
    
}
}