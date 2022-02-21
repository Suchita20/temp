
const fs=require('fs')
const jwt = require("jsonwebtoken");
const { user } = require('pg/lib/defaults');
const cert=fs.readFileSync('./keys/private.pem','utf8');
const pr=fs.readFileSync('./keys/public.pem','utf8');
const client = require('./db.js');

exports.loggedIn = function (req, res, next) {
    let token = req.header('Authorization');
    if (!token) return res.status(401).send("Access Denied");

    try {
        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length).trimLeft();
        }
        const verified = jwt.verify(token, pr); 
        if( verified.email === "siddy@gmail" ){ // Check authorization, 2 = Customer, 1 = Admin
            let req_url = req.baseUrl+req.route.path;
            if(req_url.includes("users/siddy@gmail") && parseInt(req.params.id) !== verified.id){
                return res.status(401).send("Unauthorized!");
            }
        }
        req.user = verified;
        next();
    }
    catch (err) {
        res.status(400).send("Invalid Token");
    }
}

exports.adminOnly = async function (req, res, next) {
    if( req.user.user_type_id === 2 ){
        return res.status(401).send("Access Denied");
    }  
    next();
}