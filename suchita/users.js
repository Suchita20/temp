const express =require('express');
const router =express.Router();
const Joi =require('joi');
//const { validate } = require('../../user');
const bcrypt =require('bcrypt');
router.post("/save",createUserSchema,createUser);

module.exports=router;

function createUserSchema(req,res,next)
{
    const schema=Joi.object({
        username:Joi.string().required(),
        password:Joi.string().min(5).required()
        
    });
    validateRequest(req,next,schema);
}
function createUser(req,res,next)
{
    console.log(req.body);
    res.json({message:"user created"});
}

function validateRequest(req,next,schema)
{
    const options={
        abortEarly:false,
        allowUnknown:true,
        stripUnknown:true
    };
    const{error,value}=schema.validate(req.body,options);
    if(error)
    {
        next(`validation error:${error.details.map(x =>x.message).join(',')}`);
    }
    else{
        req.body=value;
        next();
    }
}