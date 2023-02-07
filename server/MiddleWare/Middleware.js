const express = require("express");
const app  = express()
const jwt = require("jsonwebtoken");
const LoginModel = require("../Models/LoginModel");
const authenticate = async (req,res,next) =>{
     try{ const token = req.headers?.cookie;
          const token1 = token.split("=");
          for (var i=0;i<token1.length;i++)
             {
               if(token1[i]==="bansal")
               {
                    break;
               }
             }
          const token2= token1[i+1];
          const verify = await jwt.verify(token2,process.env.SECRET_KEY)
          const rootuser = await LoginModel.findOne({_id:verify._id,"tokens.token":token2})
          if(!rootuser)
          {
            throw new Error("user not found")
          }
          req.token = token;
          req.rootuser=rootuser;
          req.userID=rootuser._id;
          next();
     }catch(err){
        res.status(400).send("unauthenticate")
     }
}
module.exports = authenticate;