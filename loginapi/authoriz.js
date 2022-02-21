
const fs=require('fs')
const jwt = require("jsonwebtoken");
const { user } = require('pg/lib/defaults');
const cert=fs.readFileSync('./keys/private.pem','utf8');
const pr=fs.readFileSync('./keys/public.pem','utf8');
const client = require('./db.js');


module.exports = (credentials = []) => {
  return (req, res, next) => {
    console.log("Authorization middleware");
    // Allow for a string OR array
    if (typeof credentials === "string") {
      credentials = [credentials];
    }

    // Find JWT in Headers
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(401).send("access denied");
    } else {
      // Validate JWT
      // Bearer yndujsoIn...
      const tokenBody = token.slice(7);

      jwt.verify(tokenBody, pr, (err, decoded) => {
        if (err) {
          console.log(`JWT Error: ${err}`);
          return res.status(401).send("Error: Access Denied");
        }
        // No Error, JWT is good!

        // Check for credentials being passed in
        if (credentials.length > 0) {
          if (decoded.scopes && decoded.scopes.length &&credentials.some(cred => decoded.scopes.indexOf(cred) >= 0)) 
          {
            res.json({
              message:"valid",
              decoded
            })
            //next();
          } else {
            return res.status(401).send("Error: Access Denied");
          }
        } else {
          // No credentials required, user is authorized
          next();
        }
      });
    }
  };
};
